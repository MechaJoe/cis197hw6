const express = require('express')

const router = express.Router()

const User = require('../model/user')
const isAuthenticated = require('../middlewares/isAuthenticated')

// signup
router.post('/signup', async (req, res, next) => {
  const { username, password } = req.body
  if (!(username && password) || username === '' || password === '') {
    res.send('illegal username or password')
  } else {
    try {
      await User.create({ username, password })
      res.send('user created')
    } catch (err) {
      next(err)
    }
  }
})

// login
router.post('/login', async (req, res, next) => {
  const { username, password } = req.body

  try {
    const user = await User.findOne({ username })
    if (!user) {
      res.send('username not found')
    } else {
      const { password: passDB } = user

      if (password === passDB) {
        req.session.username = username
        req.session.password = password
        res.send('user logged in successfully')
      } else {
        res.send('user credentials are wrong')
      }
    }
  } catch (err) {
    next(err)
  }
})

// logout
router.post('/logout', isAuthenticated, (req, res) => {
  req.session.username = null
  req.session.password = null
  res.send('user is logged out')
})

// check if user is authenticated
router.get('/session', (req, res) => {
  if (req.session.username) {
    res.send(req.session.username)
  } else {
    res.send('user is not logged in')
  }
})

module.exports = router
