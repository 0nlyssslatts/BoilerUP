const form1 = document.getElementById("contactForm1");
const form2 = document.getElementById("contactForm2");
const menuToggle = document.getElementById("menu-toggle");
const navMobile = document.getElementById("mobile-nav");
let navMobileState = false;
const main = document.getElementById("main");
const buttons = document.querySelectorAll("#list-button");
const bmks = document.querySelectorAll(".bmk-card-list");
const service = document.querySelectorAll("#service");
const serviceText = document.querySelectorAll("#service-text");
const sign = document.querySelectorAll("#sign");
const aboutText = document.getElementById("about-text");
const aboutButton = document.getElementById("about-button");
const carousels = document.querySelectorAll("#carousel");
const topArrow = document.getElementById("top-arrow");
const closeMobileMenuBtn = document.getElementById("close-mobile-menu");

closeMobileMenuBtn.onclick = () => closeMenu();

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
        const responseMessage = document.getElementById(
            `responseMessage${num}`
        );

        formData.forEach((value, key) => {
            data[key] = value;
        });

        console.log(data);
        fetch("/submit", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })
            .then((response) => response.json())
            .then((data) => {
                responseMessage.innerText = data.message;
                responseMessage.classList.add("show");
                this.reset();

                setTimeout(() => {
                    responseMessage.classList.remove("show");
                }, 10000);
            })
            .catch((error) => {
                console.error(error);
                responseMessage.innerText = error.message;
                responseMessage.classList.add("show");

                setTimeout(() => {
                    responseMessage.classList.remove("show");
                }, 10000);
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

function checkScrollPosition() {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const triggerPoint = documentHeight - windowHeight - 1000;

    if (scrollTop >= triggerPoint) {
        topArrow.classList.add("show");
    } else {
        topArrow.classList.remove("show");
    }
}
window.addEventListener("resize", function () {
    if (navMobileState && window.innerWidth >= 840) {
        closeMenu();
    }
});
window.addEventListener("scroll", () => {
    checkScrollPosition();
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
function scrollHandler(event, carousel) {
    if (event.deltaY > 0 || event.deltaX > 0) {
        event.preventDefault();
        carousel.scrollLeft += 200;
    } else {
        event.preventDefault();
        carousel.scrollLeft -= 200;
    }
}
carousels.forEach((carousel) => {
    carousel.addEventListener("wheel", function (e) {
        if (
            main.offsetWidth < 1220 &&
            (carousel === carousels[0] || carousel === carousels[3])
        ) {
            scrollHandler(e, carousel);
        }
        if (main.offsetWidth < 992 && carousel === carousels[1]) {
            scrollHandler(e, carousel);
        }
        if (main.offsetWidth < 768 && carousel === carousels[2]) {
            scrollHandler(e, carousel);
        }
        if (carousel === carousels[4]) {
            scrollHandler(e, carousel);
        }
    });
});
