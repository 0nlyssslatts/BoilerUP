const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(express.static("public"));

app.post("/submit", (req, res) => {
    const { name, email, message } = req.body;

    console.log(name, email, message);

    // Здесь можно выполнить другие действия, например, сохранять данные в БД.

    res.json({ message: "Сообщение успешно отправлено!" });
});

app.listen(PORT, () => {
    console.log(`Сервер запущен на http://localhost:${PORT}`);
});
