const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const mailer = require("./nodemailer.js");

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(bodyParser.json());
app.use(express.static("./public"));

app.post("/submit", async (req, res) => {
    try {
        const { name, tel, email, question } = req.body;

        await mailer(name, tel, email, question);

        res.json({
            success: true,
            message:
                "Ваша заявка принята, мы свяжемся с вами в течение одного часа!",
        });
    } catch (error) {
        console.error("Ошибка отправки сообщения:", error);

        res.status(500).json({
            success: false,
            message: "Ошибка отправки сообщения. Попробуйте позже.",
        });
    }
});

app.listen(PORT, () => {
    console.log(`Сервер запущен на http://localhost:${PORT}`);
});
