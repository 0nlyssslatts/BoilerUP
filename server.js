const express = require("express");
const bodyParser = require("body-parser");
const mailer = require("./nodemailer.js");

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(express.static("public"));

app.post("/submit", (req, res) => {
    const { name, num, email } = req.body;

    mailer(name, num, email);
    // Здесь можно выполнить другие действия, например, сохранять данные в БД.

    res.json({ message: "Сообщение успешно отправлено!" });
});

app.listen(PORT, () => {
    console.log(`Сервер запущен на http://localhost:${PORT}`);
});
