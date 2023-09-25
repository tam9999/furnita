'use strict'

const nodemailer = require('nodemailer')

// create reusable transporter object using the default SMTP transport
const transporter = nodemailer.createTransport({
  port: 465, // true for 465, false for other ports
  host: 'smtp.gmail.com',
  auth: {
    user: process.env.USERNAME_EMAIL_SENDER,
    pass: process.env.SECRET_PASS_MAIL_SENDER,
  },
  secure: true,
})

const SendMailController = {
  sendMail: async (req, res) => {
    console.log('===== SendMailController.sendMail =====')

    try {
      const mailData = {
        from: process.env.USERNAME_EMAIL_SENDER,
        to: process.env.USERNAME_EMAIL_RECEIVER,
        subject: req.body.subject,
        text: req.body.text,
        html: `
          <b>Hey there! </b><br>
          My name is ${req.body.name}<br>
          Email: ${req.body.email}<br>
          Phone number: ${req.body.phone}<br>
          ${req.body.text}
        `,
      }

      transporter.sendMail(mailData, (error, info) => {
        if (error) {
          return res.status(500).send({ message: 'Failed to send email' })
        }

        return res.status(200).send({ message: 'Mail sent', message_id: info.messageId })
      })

      return res.redirect('/contact')
    } catch (error) {
      return res.status(500).send({ message: 'Server error' })
    }
  },
}

module.exports = SendMailController

module.exports = SendMailController
