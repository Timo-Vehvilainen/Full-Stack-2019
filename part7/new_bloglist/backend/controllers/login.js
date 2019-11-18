const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const User = require('../models/user')

loginRouter.post('/', async (request, response) => {
  const body = request.body

  const foundUser = await User.findOne({ username: body.username })
  const passwordCorrect =
    foundUser === null
      ? false
      : await bcrypt.compare(body.password, foundUser.passwordHash)

  console.log('found user:',foundUser)

  if (!(foundUser && passwordCorrect)) {
    console.log('hey')
    return response.status(401).json({
      error: 'invalid username or password'
    })
  }
  const userForToken = {
    username: foundUser.username,
    id: foundUser._id,
  }

  const token = jwt.sign(userForToken, process.env.SECRET)

  response
    .status(200)
    .send({ token, user: {...foundUser.toJSON()} })
})

module.exports = loginRouter