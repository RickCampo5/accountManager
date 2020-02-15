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

console.log(process.env)

mongoose.connect(process.env.PRODDB, {useNewUrlParser: true})
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
const user = require('./routes/user')
const debitCard = require('./routes/debitCard')
const creditCard = require('./routes/creditCard')
const expenses = require('./routes/expenses')
const savings = require('./routes/savings')
app.use('/', auth)
app.use('/', index)
app.use('/user', user)
app.use('/debit_cards', debitCard)
app.use('/credit_cards', creditCard)
app.use('/expenses', expenses)
app.use('/savings', savings)

//Use with Angular
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, 'public/index.html'));
// })

module.exports = app
