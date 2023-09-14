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
const session = require('express-session')
const routes = require('./routes')
const config = require('./config/config')
const morgan = require('./config/morgan')
const { jwtStrategy } = require('./config/passport')

const app = express()

// parse json request body
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// Set the view engine to ejs
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, './views'))

// Routes
routes(app)

if (config.env !== 'test') {
  app.use(morgan.successHandler)
  app.use(morgan.errorHandler)
}

// set security HTTP headers
app.use(helmet())

// sanitize request data
app.use(xss())
app.use(mongoSanitize())

// gzip compression
app.use(compression())

// Middle basic
app.use(express.urlencoded({ extended: false }))
app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: 'secret robin furnita',
  })
)

// enable cors
app.use(cors())
app.options('*', cors())

// jwt authentication
app.use(passport.initialize())
passport.use('jwt', jwtStrategy)

app.use(express.static(path.join(__dirname, './public')))
// app.use(favicon(path.join(__dirname, './favicon.ico')))

module.exports = app
