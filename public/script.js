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
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <=
            (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <=
            (window.innerWidth || document.documentElement.clientWidth)
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
    element.addEventListener("click", function () {
        let dataNum = element.getAttribute("data-num");
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
                sign[3].children[0].classList.toggle("rotate");
                break;
        }
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
