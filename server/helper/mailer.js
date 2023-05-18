const nodemailer = require('nodemailer')
const ejs = require("ejs")

let transporter = nodemailer.createTransport({
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
    },
    host: "smtp.gmail.com",
    port: 587
});

exports.sendMailOnSignup = (to) => {
    const mailOption = {
        from: process.env.EMAIL,
        to: to,
        subject: "Account Created Successfully.",
        html: ejs.render(`  <div style="max-width: 600px; margin: 0 auto; padding: 20px; background-color: #ffffff; border: 1px solid #dddddd;">
    <h1 style="font-size: 24px; color: #333333; margin-top: 0; margin-bottom: 20px;">Welcome to RFTES</h1>
    <p style="margin-top: 0; margin-bottom: 20px;">Dear <%= name %>,</p>
    <p style="margin-top: 0; margin-bottom: 20px;">Thank you for subscribing to our website. We have exciting articles and news to share with you.</p>
    <p style="margin-top: 0; margin-bottom: 20px;">Click the button below to visit our website:</p>
    <a target="_blank" href="http://localhost:3000" style="display: inline-block; padding: 10px 20px; background-color: #007bff; color: #ffffff; text-decoration: none; border-radius: 3px;">Visit Website</a>
    <br />
    <p style="margin-top: 0;">Best regards,</p>
    <p style="margin-top: 0;">The Newsletter Team</p>
    <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #dddddd; font-size: 12px; color: #777777; text-align: center;">
      <p style="margin: 0;">RFTES Team</p>
    </div>
  </div>`, { name: "Test User" })
    }

    transporter.sendMail(mailOption, (err, info) => {
        if (err) {
            return err
        } else {
            return "Mail send successfully."
        }
    })
}

exports.sendMailOnForgetPassword = (to, url) => {
    const mailOption = {
        from: process.env.EMAIL,
        to: to,
        subject: "Forget Password Link.",
        html: `<button><a href=${url}>Reset Password</a></button>`
    }

    transporter.sendMail(mailOption, (err, info) => {
        if (err) {
            return err
        } else {
            return "Mail send successfully."
        }
    })
}


