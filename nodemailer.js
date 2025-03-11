const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
dotenv.config();

let transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    secure: true,
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
    },
});

async function mailer(name, tel, email) {
    const info = await transporter.sendMail({
        from: `Сайт <${process.env.MAIL_USER}>`,
        to: `${process.env.MAIL_USER}`,
        subject: "Новый клиент",
        text: `Имя: ${name}\nТелефон: ${tel}\nEmail: ${email}`,
    });
    console.log("Message sent: ", info.messageId);
}

module.exports = mailer;
