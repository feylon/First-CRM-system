import nodemailer from "nodemailer";
// const HTML = `Salom hammaga`;
// async function main(){
//     nodemailer.createTransport(
//         {

//         }
//     )
// }

// const nodemailer = require('nodemailer');

let testEmailAccount = await nodemailer.createTestAccount();

let transporter = nodemailer.createTransport({
    host: "live.smtp.mailtrap.io",
    port: 587,
    auth: {
      user: "api",
      pass: "a12fdfa013b3140c49c91cf20fa31ad5"
    }
  });
let result = await transporter.sendMail({
    from: '"Node js" <nodejs@example.com>',
    to: 'jamshid14092002@gmail.com',
    subject: 'Message from Node js',
    text: 'This message was sent from Node js server.',
    html:
       'Salom Jamshid',
});

console.log(result);