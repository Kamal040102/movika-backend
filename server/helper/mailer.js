const nodemailer=require('nodemailer')

let transporter = nodemailer.createTransport({
    auth:{
        user:process.env.EMAIL,
        pass:process.env.PASSWORD
    },
    host:"smtp.gmail.com",
    port:587
});

exports.sendMailOnSignup = (to) => {
    const mailOption = {
        from:process.env.EMAIL,
        to:to,
        subject:"Account Created Successfully.",
        html:"<h1>Account Created Successfully.</h1>"
    }

    transporter.sendMail(mailOption, (err, info) => {
        if(err){
            return err
        }else{
            return "Mail send successfully."
        }
    })
}


