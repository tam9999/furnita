'use strict'

const nodemailer = require('nodemailer')

// Create reusable email transporter using the default SMTP transport
const emailTransporter = nodemailer.createTransport({
  port: 465, // true for 465, false for other ports
  host: 'smtp.gmail.com',
  auth: {
    user: process.env.EMAIL_SENDER_USERNAME,
    pass: process.env.EMAIL_SENDER_PASSWORD,
  },
  secure: true,
})

const EmailController = {
  sendEmail: async (req, res) => {
    console.log('===== EmailController.sendEmail =====')

    try {
      const emailContent = {
        from: process.env.EMAIL_SENDER_USERNAME,
        to: process.env.EMAIL_RECEIVER_USERNAME,
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

      emailTransporter.sendMail(emailContent, (error, info) => {
        if (error) {
          return res.status(500).send({ message: 'Email sending failed' })
        }

        return res.status(200).send({ message: 'Email sent', messageId: info.messageId })
      })

      return res.redirect('/contact')
    } catch (error) {
      return res.status(500).send({ message: 'Server error' })
    }
  },
}

module.exports = EmailController
