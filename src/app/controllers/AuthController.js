'use strict'

const { validationResult } = require('express-validator')
const User = require('../models/User')
const jwToken = require('../../utils/jwToken')

const AuthController = {
  login: async (req, res) => {
    console.log('===== AuthController.login => START =====')

    await jwToken.verify(req.session.accessUser, (err, payload) => {
      if (payload) {
        return res.redirect('product/create')
      }
    })

    res.render('index', { view_content: 'auth/login', title: 'Login' })
  },

  handleLogin: async (req, res) => {
    console.log('===== AuthController.handleLogin => START =====')
    try {
      const { errors } = validationResult(req)

      if (errors.length > 0) {
        console.log(errors)
        return res.status(400).send({
          title: 'Notice',
          messages: errors,
        })
      }

      const user = await User.findOne({ email: req.body.email })

      const accessToken = jwToken.sign(
        {
          id: user.id,
          name: user.name,
          email: user.email,
        },
        1000 * 60 * 60 * 12
      )

      req.session.accessUser = accessToken

      return res.status(200).send({
        title: 'Notice',
        message: 'Login successful',
        status: true,
      })
    } catch (error) {
      console.error(error)
      return res.status(500).send({ title: 'Notice', message: error.message })
    }
  },

  logout: (req, res) => {
    console.log('===== AuthController.logout => START =====')

    req.session.destroy()

    return res.redirect('/')
  },

  // Product
  getProductsList: (req, res) => {
    console.log('===== AuthController.getProductsList => START =====')

    res.render('index', {
      view_content: 'products/admin/table',
      title: 'Products List',
    })
  },
}

module.exports = AuthController
