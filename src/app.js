'use strict'

const express = require('express')
const helmet = require('helmet')
const xss = require('xss-clean')
const mongoSanitize = require('express-mongo-sanitize')
const compression = require('compression')
const cors = require('cors')
const passport = require('passport')
const path = require('path')
const bodyParser = require('body-parser')
const sessions = require('express-session')
const routes = require('./routes')
const config = require('./config/config')
const morgan = require('./config/morgan')
const { jwtStrategy } = require('./config/passport')

const app = express()

// Middle basic
app.use(
  sessions({
    secret: 'Robin Furnita secret',
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * 60 * 24 },
    resave: false,
  })
)

// jwt authentication
app.use(passport.initialize())
passport.use('jwt', jwtStrategy)

// Middle basic
app.use(express.urlencoded({ extended: false }))
app.use(
  sessions({
    secret: 'Robin Furnita secret',
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * 60 * 24 },
    resave: false,
  })
)

// jwt authentication
app.use(passport.initialize())
passport.use('jwt', jwtStrategy)

// Set the view engine to ejs
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, './views'))

if (config.env !== 'test') {
  app.use(morgan.successHandler)
  app.use(morgan.errorHandler)
}

app.use(express.static(path.join(__dirname, './public')))
// app.use(favicon(path.join(__dirname, './favicon.ico')))

// Routes
routes(app)

// set security HTTP headers
app.use(helmet())

// sanitize request data
app.use(xss())
app.use(mongoSanitize())

// gzip compression
app.use(compression())

// enable cors
app.use(cors())
app.options('*', cors())

app.use(express.static(path.join(__dirname, './public')))
// app.use(favicon(path.join(__dirname, './favicon.ico')))

// Routes
routes(app)

module.exports = app
