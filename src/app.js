'use strict'

const express = require('express')
const helmet = require('helmet')
const xss = require('xss-clean')
const mongoSanitize = require('express-mongo-sanitize')
const compression = require('compression')
const cors = require('cors')
const passport = require('passport')
const httpStatus = require('http-status')
const path = require('path')
const routes = require('./routes')
const config = require('./config/config')
const morgan = require('./config/morgan')
const { jwtStrategy } = require('./config/passport')

const app = express()

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

// parse json request body
app.use(express.json())

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }))

// sanitize request data
app.use(xss())
app.use(mongoSanitize())

// gzip compression
app.use(compression())

// enable cors
app.use(cors())
app.options('*', cors())

// jwt authentication
app.use(passport.initialize())
passport.use('jwt', jwtStrategy)

app.use(express.static(path.join(__dirname, './public')))
// app.use(favicon(path.join(__dirname, './favicon.ico')))

module.exports = app
