'use strict'

const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config()

module.exports = {
  // Generates a token from supplied payload
  sign(payload, expires) {
    return jwt.sign(
      payload,
      process.env.JWT_SECRET, // Token Secret that we sign it with
      { expiresIn: expires } // Token Expire time
    )
  },

  // Verifies token on a request
  verify(token, callback) {
    return jwt.verify(
      token, // The token to be verified
      process.env.JWT_SECRET, // Same token we used to sign
      {}, // No Option, for more see https://github.com/auth0/node-jsonwebtoken#jwtverifytoken-secretorpublickey-options-callback
      callback //Pass errors or decoded token to callback
    )
  },
}
