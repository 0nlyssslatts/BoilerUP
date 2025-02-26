const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const mailer = require("./nodemailer.js");

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(bodyParser.json());
app.use(express.static("./public"));

app.post("/submit", (req, res) => {
    const { name, tel, email } = req.body;
    console.log(name, tel, email);
    mailer(name, tel, email);

    res.json({ message: "Сообщение успешно отправлено!" });
});

app.listen(PORT, () => {
    console.log(`Сервер запущен на http://localhost:${PORT}`);
});
