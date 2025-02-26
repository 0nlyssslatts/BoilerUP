const form = document.getElementById("contactForm");

form.addEventListener("submit", function (event) {
    event.preventDefault();

    const formData = new FormData(this);
    const data = {};

    formData.forEach((value, key) => {
        data[key] = value;
    });

    fetch("/submit", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    })
        .then((response) => response.json())
        .then((data) => {
            document.getElementById("responseMessage").innerText = data.message;
        })
        .catch((error) => {
            document.getElementById("responseMessage").innerText =
                "Ошибка при отправке формы";
        });
});
