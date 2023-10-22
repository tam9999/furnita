'use strict'

const jwToken = require('../utils/jwToken')

module.exports = (req, res, next) => {
  const token = req.cookies['ACCESS_TOKEN']

  if (!token) {
    console.error('Access token not found')
    return res.redirect('/admin/login')
  }

  jwToken.verify(token, (err, decoded) => {
    const user = decoded

    if (err) {
      console.error('You do not have access to this feature')
      return res.redirect('/admin/login')
    }

    res.locals.auth = { user }
    req.auth = { user }
    next()
  })
}
