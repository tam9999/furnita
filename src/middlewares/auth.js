'use strict'

const jwToken = require('../utils/jwToken')

const auth = {
  admin: (req, res, next) => {
    const token = req.session.accessAdmin

    if (!token) {
      console.log('Access token not found')
      return res.redirect('/login')
    }

    jwToken.verify(token, (err, decoded) => {
      const user = decode

      // 1 is admin role
      if (err || user.role != 1) {
        console.log('You do not have access to this feature')
        return res.redirect('/login')
      }

      res.locals.auth = { user }
      next()
    })
  },

  user: (req, res, next) => {
    const token = req.session.accessUser

    if (!token) {
      console.log('Access token not found')
      return res.redirect('/admin/login')
    }

    jwToken.verify(token, (err, decoded) => {
      const user = decoded

      if (err) {
        console.log('You do not have access to this feature')
        return res.redirect('/admin/login')
      }

      res.locals.auth = { user }
      req.auth = { user }
      next()
    })
  },
}

module.exports = auth
