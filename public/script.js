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
//SERVICE
const service = document.querySelectorAll("#service");
const serviceText = document.querySelectorAll("#service-text");
const sign = document.querySelectorAll("#sign");

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
                bmks[0].classList.toggle("animate__animated");
                bmks[0].classList.toggle("animate__fadeIn");
                break;
            case "2":
                bmks[1].classList.toggle("bmk-card-list-active");
                bmks[1].classList.toggle("animate__animated");
                bmks[1].classList.toggle("animate__fadeIn");
                break;
            case "3":
                bmks[2].classList.toggle("bmk-card-list-active");
                bmks[2].classList.toggle("animate__animated");
                bmks[2].classList.toggle("animate__fadeIn");
                break;
        }

        event.target.innerText === "ПОДРОБНЕЕ"
            ? (event.target.innerText = "СКРЫТЬ")
            : (event.target.innerText = "ПОДРОБНЕЕ");
    });
});

service.forEach((element) => {
    element.addEventListener("click", function (event) {
        let dataNum = element.getAttribute("data-num");
        console.log();
        switch (dataNum) {
            case "1":
                serviceText[0].classList.toggle("service-text-active");
                serviceText[0].classList.toggle("animate__animated");
                serviceText[0].classList.toggle("animate__fadeIn");
                sign[0].classList.toggle("sign-wrapper-active");
                sign[0].children[0].classList.toggle("rotate");
                break;
            case "2":
                serviceText[1].classList.toggle("service-text-active");
                serviceText[1].classList.toggle("animate__animated");
                serviceText[1].classList.toggle("animate__fadeIn");
                sign[1].classList.toggle("sign-wrapper-active");
                sign[1].children[0].classList.toggle("rotate");
                break;
            case "3":
                serviceText[2].classList.toggle("service-text-active");
                serviceText[2].classList.toggle("animate__animated");
                serviceText[2].classList.toggle("animate__fadeIn");
                sign[2].classList.toggle("sign-wrapper-active");
                sign[2].children[0].classList.toggle("rotate");
                break;
            case "4":
                serviceText[3].classList.toggle("service-text-active");
                serviceText[3].classList.toggle("animate__animated");
                serviceText[3].classList.toggle("animate__fadeIn");
                sign[3].classList.toggle("sign-wrapper-active");
                sign[4].children[0].classList.toggle("rotate");
                break;
        }
    });
});
