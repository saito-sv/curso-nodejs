import nodemailer from 'nodemailer';
import {newToken, verify} from './token.js'

const transporter = nodemailer.createTransport({
    host:"<tu host>",
    port: 465,
    secure: true,
    auth: {
        user:"<tu correo>",
        pass:process.env.EMAIL_PASSWORD,
    }
});

export const sendVerificationEmail = (user) => { 
    const token  = newToken(user._id);
    const link = `localhost:8080/auth/verify/?token=${token}`
    sendEmail(user.email, "Email Verification", `{
        Muchas gracias por registrarte
        verifica tu email aqui ${link}
    }`);
}

const sendEmail = (toEmail, subject, body) => {
    const options = {
        from:"Marlon Monroy <tu correo>",
        to: toEmail,
        subject:subject,
        text:body
    }

    transporter.sendMail(options).then(res =>{
        console.log("Email sent");
    })
    .catch(err => {
        console.log(err)
    })
}
