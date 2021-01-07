import nodemailer from 'nodemailer';
import {newToken} from './token.js'
const host = "smtp.sendgrid.net"
const port = 465
const user = "apikey"

export const sendVerificationEmail = (user) => { 
    const token  = newToken(user._id);
    const link = `http://localhost:8080/auth/verify/?token=${token}`
    sendHTMLEmail(user.email, "Email Verification", `
        Muchas gracias por registrarte</br>
        verifica tu email <a href=${link}>aqui</a>
    `);
}

const sendHTMLEmail = (toEmail, subject, html) => {
const transporter = nodemailer.createTransport({
    host:host,
    port: port,
    secure: true,
    auth: {
        user:user,
        pass:process.env.SG_API_KEY,
    }
});
    const options = {
        from:"Monroy's Blog <marlon@monroy.io>",
        to: toEmail,
        subject:subject,
        html:html
    }

    transporter.sendMail(options).then(res =>{
        console.log("Email sent");
    })
    .catch(err => {
        console.log(err)
    })
}

const sendTextEmail = (toEmail, subject, body) => {
const transporter = nodemailer.createTransport({
    host:host,
    port: port,
    secure: true,
    auth: {
        user:user,
        pass:process.env.SG_API_KEY,
    }
});

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
