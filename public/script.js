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
//ABOUT
const aboutText = document.getElementById("about-text");
const aboutButton = document.getElementById("about-button");
//CAROUSEL
const carousels = document.querySelectorAll("#carousel");
const carouselBmk = document.getElementById("carousel-bmk");

function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top >= -100 &&
        rect.left >= -100 &&
        rect.bottom <=
            (window.innerHeight || document.documentElement.clientHeight) +
                100 &&
        rect.right <=
            (window.innerWidth || document.documentElement.clientWidth) + 100
    );
}

function animateScrollingElements() {
    const elements = document.querySelectorAll(
        ".element-to-animate-left, .element-to-animate-right, .element-to-animate"
    );
    elements.forEach((element) => {
        if (isElementInViewport(element)) {
            if (element.classList.contains("element-to-animate-left")) {
                element.classList.add(
                    "animate__animated",
                    "animate__fadeInLeft",
                    "animate__slow"
                );
            } else if (element.classList.contains("element-to-animate-right")) {
                element.classList.add(
                    "animate__animated",
                    "animate__fadeInRight",
                    "animate__slow"
                );
            } else {
                element.classList.add(
                    "animate__animated",
                    "animate__fadeInUp",
                    "animate__slow"
                );
            }
        }
    });
}

document.addEventListener("DOMContentLoaded", animateScrollingElements);
window.addEventListener("scroll", animateScrollingElements);

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
    navMobileState = true;
    menuToggle.classList.add("menu-icon-active");
    navMobile.classList.add("mobile-nav-active");
};

window.addEventListener("resize", function () {
    if (navMobileState && window.innerWidth >= 840) {
        closeMenu();
    }
});

window.addEventListener("scroll", () => {
    if (navMobileState) {
        closeMenu();
    }
});

main.addEventListener("click", function () {
    if (navMobileState) {
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

        bmks[dataId - 1].classList.toggle("bmk-card-list-active");
        bmks[dataId - 1].classList.toggle("animate__animated");
        bmks[dataId - 1].classList.toggle("animate__fadeIn");

        event.target.innerText === "ПОДРОБНЕЕ"
            ? (event.target.innerText = "СКРЫТЬ")
            : (event.target.innerText = "ПОДРОБНЕЕ");
    });
});

service.forEach((element) => {
    element.addEventListener("click", function () {
        let dataNum = element.getAttribute("data-num");

        serviceText[dataNum - 1].classList.toggle("service-text-active");
        serviceText[dataNum - 1].classList.toggle("animate__animated");
        serviceText[dataNum - 1].classList.toggle("animate__fadeIn");
        sign[dataNum - 1].classList.toggle("sign-wrapper-active");
        sign[dataNum - 1].children[0].classList.toggle("rotate");
    });
});

aboutButton.addEventListener("click", function (event) {
    aboutText.classList.toggle("about-active");
    aboutText.classList.toggle("animate__animated");
    aboutText.classList.toggle("animate__fadeIn");

    event.target.innerText === "ПОДРОБНЕЕ"
        ? (event.target.innerText = "СКРЫТЬ")
        : (event.target.innerText = "ПОДРОБНЕЕ");
});

carousels.forEach((carousel) => {
    carousel.addEventListener("wheel", function (e) {
        if (e.deltaY > 0 || e.deltaX > 0) {
            // ЧЕ ДЕЛАТЬ С Y
            carousel.scrollLeft += 200;
            e.preventDefault();
        } else {
            carousel.scrollLeft -= 200;
            e.preventDefault();
        }
    });
});

carouselBmk.addEventListener("wheel", function (e) {
    if (main.offsetWidth < 768) {
        if (e.deltaY > 0 || e.deltaX > 0) {
            carouselBmk.scrollLeft += 200;
            e.preventDefault();
        } else {
            carouselBmk.scrollLeft -= 200;
            e.preventDefault();
        }
    }
});
