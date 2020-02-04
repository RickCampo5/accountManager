require('dotenv').config()

const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const express = require('express')
const hbs = require('hbs')
const mongoose = require('mongoose')
const path = require('path')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)

mongoose.Promise = Promise

mongoose.connect(process.env.LOCALDB, {useNewUrlParser: true})
  .then (x => {
    console.log(`Connected to Mongo, DB name: ${x.connections[0].name}`)
  }).catch(error => {
    console.error('Error connecting to mongo', error)
  })


const app = express()
app.use(require('cors')({
  origin: true,
  credentials: true
}))

app.use(session({
  store: new MongoStore({
    mongooseConnection:mongoose.connection,
    ttl:24*60*60
  }),
  secret: 'Rick',
  saveUninitialized: true,
  resave: false,
  cookie : { httpOnly: true, maxAge: 2419200000 }
}))

// Middleware Setup
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())

//passport initilize
const passport = require('./helpers/passport')
app.use(passport.initialize())
app.use(passport.session())

//Set views
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'hbs')
app.use(express.static(path.join(__dirname, 'public')))


//Routes
const index = require('./routes/index')
const auth = require('./routes/auth')
app.use('/', auth)
app.use('/', index)

//Use with Angular
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, 'public/index.html'));
// })

module.exports = app
