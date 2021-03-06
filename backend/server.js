const express = require('express')
const mongoose = require('mongoose')
const session = require('cookie-session')
const bodyParser = require('body-parser')
const path = require('path')
const UserRouter = require('./routes/account')
const QuestionRouter = require('./routes/api')

const app = express()

const MONGO_URI = process.env.MONGODB_URI || 'mongodb+srv://MechaJoe:password1234@cluster0.eelcy.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

// handling POST --> req.body
app.use(express.json())

app.use(session({
  name: 'session',
  keys: ['username', 'password'],
}))

// can only access req.session within a POST request
app.post('/', (req, res) => {
  if (req.session.username && req.session.password) {
    res.send(`hello ${req.session.username}`)
  } else {
    res.send('please log in')
  }
})

app.use('/account', UserRouter)
app.use('/api', QuestionRouter)
app.use(bodyParser.json())

app.use(express.static('dist')) // set the static folder

app.use((err, req, res, next) => {
  res.status(500).send('Something broke!')
})

// set favicon
app.get('/favicon.ico', (req, res) => {
  res.status(404).send()
})

// set the initial entry point
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'))
})

app.listen(3000, () => {
  console.log('listening on port 3000')
})
