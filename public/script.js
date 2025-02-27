// FORMS
const form1 = document.getElementById("contactForm1");
const form2 = document.getElementById("contactForm2");
// MOBILE MENU
const menuToggle = document.getElementById("menu-toggle");
const navMobile = document.getElementById("mobile-nav");
let navMobileState = false;

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
