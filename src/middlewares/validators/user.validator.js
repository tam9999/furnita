'use strict'

const { body } = require('express-validator')
const bcrypt = require('bcrypt')
const User = require('../../app/models/User')

const comparePassword = async (email, password) => {
  const user = await User.findOne({ email })

  if (!user) {
    throw new Error('Email not found')
  }

  const isPwMatched = await bcrypt.compare(password, user.password)

  if (!isPwMatched) {
    throw new Error('Password does not match')
  }
}

const UserValidator = {
  login: [
    body('email')
      .notEmpty()
      .withMessage('Email should not be left empty')
      .bail()
      .isEmail()
      .withMessage('Email field must contain a valid email address'),
    body('password')
      .notEmpty()
      .withMessage('Password should not be left empty')
      .bail()
      .custom(async (password, { req }) => comparePassword(req.body.email, password)),
  ],
}

module.exports = UserValidator
