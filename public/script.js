// FORMS
const form1 = document.getElementById("contactForm1");
const form2 = document.getElementById("contactForm2");
// MOBILE MENU
const menuToggle = document.getElementById("menu-toggle");
const navMobile = document.getElementById("mobile-nav");
let navMobileState = false;
//MAIN
const main = document.getElementById("main");
//BMK
const buttons = document.querySelectorAll("#list-button");
const bmks = document.querySelectorAll(".bmk-card-list");

function formHandle(num) {
    return function (event) {
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
                document.getElementById(`responseMessage${num}`).innerText =
                    data.message;
                this.reset();
            });
    };
}
form1.addEventListener("submit", formHandle(1));
form2.addEventListener("submit", formHandle(2));

menuToggle.onclick = function () {
    navMobileState = !navMobileState;
    menuToggle.classList.toggle("menu-icon-active");
    navMobile.classList.toggle("mobile-nav-active");
    main.classList.toggle("blur");
};

window.addEventListener("resize", function () {
    if (navMobileState && window.innerWidth >= 840) {
        closeMenu();
    }
});

function closeMenu() {
    navMobileState = false;
    menuToggle.classList.remove("menu-icon-active");
    navMobile.classList.remove("mobile-nav-active");
}

buttons.forEach((button) => {
    button.addEventListener("click", function (event) {
        let dataId = event.target.getAttribute("data-id");
        switch (dataId) {
            case "1":
                bmks[0].classList.toggle("bmk-card-list-active");
                break;
            case "2":
                bmks[1].classList.toggle("bmk-card-list-active");
                break;
            case "3":
                bmks[2].classList.toggle("bmk-card-list-active");
                break;
        }

        event.target.innerText === "ПОДРОБНЕЕ"
            ? (event.target.innerText = "СКРЫТЬ")
            : (event.target.innerText = "ПОДРОБНЕЕ");
    });
});
