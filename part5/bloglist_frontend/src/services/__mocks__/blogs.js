const blogs = [
  {
    title: 'First Title',
    author: 'First Author',
    url: 'hyvasaittiseon.com',
    likes: 10,
    user: {
      _id: '5a437a9e514ab7f168ddf138',
      username: 'vehvilt1',
      name: 'Timo Vehvilainen'
    },
    id:'834573490gj03403823'
  },
  {
    title: 'Second Title',
    author: 'Second Author',
    url: 'hyvasaittiseon2.com',
    likes: 11,
    user: {
      _id: '5a437a9e514ab7f168ddf138',
      username: 'vehvilt1',
      name: 'Timo Vehvilainen'
    },
    id:'jidfo82hfhakfh19rjng29'
  },
  {
    title: 'Third Title',
    author: 'Third Author',
    url: 'hyvasaittiseon3.com',
    likes: 12,
    user: {
      _id: '5a437a9e514ab7f168ddf138',
      username: 'vehvilt1',
      name: 'Timo Vehvilainen'
    },
    id:'98438729480tuigj22+'
  }
]

const getAll = () => {
  return Promise.resolve(blogs)
}

const setToken = (newToken) => {
  let token = `bearer ${newToken}`
}

const create = (newObject) => {
  return Promise.resolve(newObject)
}

const update = (newObject) => {
  return Promise.resolve(newObject)
}

const remove = (id) => {
  Promise.resolve(id)
}

export default { getAll, setToken, create, update, remove }