'use strict'

const express = require('express')
const router = express.Router()
const EmailController = require('../app/controllers/EmailController')

router.route('/contact').post(EmailController.sendEmail)

module.exports = router
