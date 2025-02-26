const nodemailer = require("nodemailer");

let transporter = nodemailer.createTransport({
    host: "smtp.mail.ru",
    port: 465,
    secure: true,
    auth: {
        user: "assassin20_05@mail.ru", // Ваш полный адрес электронной почты на Mail.ru
        pass: "yusCybpKpGDmTA2G8Z45", // Пароль от вашего почтового ящика
    },
});

async function mailer() {
    const info = await transporter.sendMail({
        from: "Иван <assassin20_05@mail.ru>", // sender address
        to: "sid36205@gmail.com", // list of receivers
        subject: "Hello", // Subject line
        text: "Hello world!", // plain text body
        html: "<b>Hello world!!!</b>", // html body
    });

    console.log("Message sent: ", info.messageId);
}

module.exports = mailer;
