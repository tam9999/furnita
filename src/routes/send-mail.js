'use strict'

const express = require('express')
const router = express.Router()
const SendMailController = require('../app/controllers/SendMailController')

router.route('/contact').post(SendMailController.sendMail)

module.exports = router
