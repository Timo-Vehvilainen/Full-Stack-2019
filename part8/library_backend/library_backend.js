const { ApolloServer, gql, UserInputError, PubSub } = require('apollo-server')
const uuid = require('uuid')
const Book = require('./models/book')
const Author = require('./models/author')
const User = require('./models/user')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const pubsub = new PubSub()
const JWT_SECRET = 'kurikankukkajakirikankuu'

mongoose.set('useFindAndModify', false)

const MONGODB_URI = 'mongodb+srv://fullstack:f6BGHTGiNLt5pFJu@cluster0-wq1t4.mongodb.net/library?retryWrites=true&w=majority'

console.log('connecting to', MONGODB_URI)

const db  = mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })

const typeDefs = gql`
  type Author {
    name: String!
    id: ID!
    born: Int
    bookCount: Int
  }

  type Book {
    title: String!
    published: Int!
    author: Author
    genres: [String!]!
    id: ID!
  }

  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }
  
  type Token {
    value: String!
  }

  type Query {
    hello: String!
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
    me: User
  }

  type Mutation {
    addBook(
      title: String!
      published: Int!
      author: String!
      genres: [String!]!
    ): Book
    editAuthor(name: String!, setBornTo: Int!): Author
    createUser(
      username: String!
      favoriteGenre: String!
    ): User
    login(
      username: String!
      password: String!
    ): Token
  }

  type Subscription {
    bookAdded: Book!
  }
`

const resolvers = {
  Query: {
    hello: () => { return "world" },
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      try{
        console.log(args)
        if (!args.author || args.author === 'all_authors') {
          if (!args.genre || args.genre === 'all_genres') {
            const books = await Book.find({}).populate('author')
            return books
          }
          const books = await Book.find({genres : { $in : [args.genre] }})
            .populate('author')
          console.log('matchedBooksByGenre:', books)
          return books
        }

        const matchedAuthor = await Author.findOne({name: args.author})
        const matchedBooks = await Book.find({author: matchedAuthor }).populate('author')
        if (!args.genre || args.genre === 'all_genres') {
          return matchedBooks
        }

        const books = matchedBooks.filter(b => b.genres.includes(args.genre))
        console.log('matchedBooksByGenre:', books)
        return books
      
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        }) 
      }
    },
    allAuthors: async () => {
      const authors = await Author.find({})
      return authors
    },
    me: (root, args, context) => {
      console.log('context:',context)
      return context.currentUser
    }
      
  },
  Mutation: {
    addBook: async (root, args, context) => {
      try {
        if (!context.currentUser) {
          throw new UserInputError("wrong credentials")
        }
        const matchedAuthor = await Author.findOne({ name:args.author })

        if (matchedAuthor) {
          const book = new Book({ ...args, author: matchedAuthor })
          await book.save()
          authorIncreasedBookCount = {
            ...matchedAuthor, 
            bookCount: matchedAuthor.bookCount + 1
            }
            await authorIncreasedBookCount.save()
          pubsub.publish('BOOK_ADDED', {bookAdded: book})
          return book
        } else {
          const newAuthor = new Author({ name: args.author, born: null, bookCount: 1 })
          const book = new Book({ ...args, author: newAuthor })
          await newAuthor.save()
          await book.save()
          pubsub.publish('BOOK_ADDED', {bookAdded: book})
          return book
        }
      } catch (error) {
        console.log(error.message)
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
    },
    editAuthor: async (root, args, context) => {
      try {
        if (!context.currentUser) {
          throw new UserInputError("wrong credentials")
        }
      
        const author = await Author.findOne({name: args.name})
        author.born = args.setBornTo
        await author.save() 
        return author
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
    },
    createUser: (root, args) => {
      const user = new User({ 
        username: args.username, 
        favoriteGenre: args.favoriteGenre
      })
      
      return user.save()
        .catch(error => {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          })
        })
    },
    login: async (root, args, context) => {
      const user = await User.findOne({ username: args.username })

      if ( !user || args.password !== 'secred' ) {
        throw new UserInputError("wrong credentials")
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      }

      console.log('userForToken:', userForToken)

      return { value: jwt.sign(userForToken, JWT_SECRET) }
    }
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator(['BOOK_ADDED'])
    },
  },
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
/*     console.log('req:', req.headers) */    
    const auth = req ? req.headers.authorization : null
/*     console.log('auth:',auth) */
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(
        auth.substring(7), JWT_SECRET
      )
 //     console.log('decodedToken:',decodedToken)
      const currentUser = await User.findById(decodedToken.id)
   //   console.log('currentUser:', currentUser)
      return { currentUser }
    }
  }
})

server.listen().then(({ url, subscriptionsUrl }) => {
  console.log(`Server ready at ${url}`)
  console.log(`Subscriptions ready at ${subscriptionsUrl}`)
})