/* =====================================================
   AKIRA JAPANESE KITCHEN
   JAVASCRIPT
===================================================== */


/* =====================================================
   LOADING SCREEN
===================================================== */

window.addEventListener("load", function () {

    const loader = document.getElementById("loader");

    setTimeout(function () {

        loader.classList.add("hidden");

    }, 900);

});


/* =====================================================
   MOBILE NAVIGATION
===================================================== */

const menuToggle = document.getElementById("menuToggle");

const navMenu = document.getElementById("navMenu");


menuToggle.addEventListener("click", function () {

    navMenu.classList.toggle("open");

});


/* Close mobile menu after clicking */

const navLinks = document.querySelectorAll("#navMenu a");


navLinks.forEach(function (link) {

    link.addEventListener("click", function () {

        navMenu.classList.remove("open");

    });

});


/* =====================================================
   MENU FILTER
===================================================== */

const filterButtons =
    document.querySelectorAll(".filter-btn");

const foodCards =
    document.querySelectorAll(".food-card");


filterButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        /* Remove active from every button */

        filterButtons.forEach(function (btn) {

            btn.classList.remove("active");

        });


        /* Add active to clicked button */

        button.classList.add("active");


        const filter =
            button.getAttribute("data-filter");


        foodCards.forEach(function (card) {

            const category =
                card.getAttribute("data-category");


            if (
                filter === "all" ||
                category === filter
            ) {

                card.style.display = "block";

                setTimeout(function () {

                    card.style.opacity = "1";

                    card.style.transform =
                        "translateY(0)";

                }, 50);

            } else {

                card.style.opacity = "0";

                card.style.transform =
                    "scale(.9)";

                setTimeout(function () {

                    card.style.display = "none";

                }, 250);

            }

        });

    });

});


/* =====================================================
   ORDER CALCULATOR
===================================================== */

let order = [];


const orderButtons =
    document.querySelectorAll(".order-food");


const orderList =
    document.getElementById("orderList");


const orderTotal =
    document.getElementById("orderTotal");


const clearOrder =
    document.getElementById("clearOrder");


/* Add food */

orderButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        const name =
            button.getAttribute("data-name");

        const price =
            Number(button.getAttribute("data-price"));


        order.push({
            name: name,
            price: price
        });


        updateOrder();


        /* Button feedback */

        const originalText =
            button.innerHTML;

        button.innerHTML =
            "ADDED ✓";

        button.style.background =
            "#17202a";

        button.style.color =
            "#f2a43a";


        setTimeout(function () {

            button.innerHTML =
                originalText;

            button.style.background =
                "";

            button.style.color =
                "";

        }, 1000);

    });

});


/* Update order */

function updateOrder() {

    orderList.innerHTML = "";


    if (order.length === 0) {

        orderList.innerHTML =
            '<p class="empty-order">Your order is empty.</p>';

        orderTotal.textContent =
            "BND 0.00";

        return;

    }


    let total = 0;


    order.forEach(function (item) {

        total += item.price;


        const orderItem =
            document.createElement("div");


        orderItem.className =
            "order-item";


        orderItem.innerHTML = `
            <span>${item.name}</span>
            <strong>BND ${item.price.toFixed(2)}</strong>
        `;


        orderList.appendChild(orderItem);

    });


    orderTotal.textContent =
        "BND " + total.toFixed(2);

}


/* Clear order */

clearOrder.addEventListener("click", function () {

    order = [];

    updateOrder();

});


/* =====================================================
   FORM VALIDATION
===================================================== */

const contactForm =
    document.getElementById("contactForm");


contactForm.addEventListener("submit", function (event) {

    event.preventDefault();


    /* Get values */

    const name =
        document.getElementById("name").value.trim();

    const email =
        document.getElementById("email").value.trim();

    const message =
        document.getElementById("message").value.trim();


    /* Error elements */

    const nameError =
        document.getElementById("nameError");

    const emailError =
        document.getElementById("emailError");

    const messageError =
        document.getElementById("messageError");


    /* Reset */

    nameError.textContent = "";

    emailError.textContent = "";

    messageError.textContent = "";


    let valid = true;


    /* Name */

    if (name === "") {

        nameError.textContent =
            "Please enter your name.";

        valid = false;

    }


    /* Email */

    if (email === "") {

        emailError.textContent =
            "Please enter your email.";

        valid = false;

    } else if (!email.includes("@")) {

        emailError.textContent =
            "Please enter a valid email.";

        valid = false;

    }


    /* Message */

    if (message === "") {

        messageError.textContent =
            "Please enter a message.";

        valid = false;

    }


    /* Success */

    if (valid) {

        const success =
            document.getElementById("formSuccess");


        success.textContent =
            "ありがとうございます! Thank you — your message has been received.";


        success.classList.add("show");


        contactForm.reset();

    }

});


/* =====================================================
   SCROLL REVEAL
===================================================== */

const revealElements =
    document.querySelectorAll(
        ".food-card, .story-content, .story-image, .contact-card, .contact-form"
    );


const revealObserver =
    new IntersectionObserver(

        function (entries) {

            entries.forEach(function (entry) {

                if (entry.isIntersecting) {

                    entry.target.classList.add("reveal");

                    revealObserver.unobserve(
                        entry.target
                    );

                }

            });

        },

        {
            threshold: 0.15
        }

    );


revealElements.forEach(function (element) {

    revealObserver.observe(element);

});


/* =====================================================
   ACTIVE NAVIGATION
===================================================== */

const sections =
    document.querySelectorAll("section[id]");


window.addEventListener("scroll", function () {

    let current = "";


    sections.forEach(function (section) {

        const sectionTop =
            section.offsetTop - 150;

        const sectionHeight =
            section.offsetHeight;


        if (
            window.scrollY >= sectionTop &&
            window.scrollY < sectionTop + sectionHeight
        ) {

            current =
                section.getAttribute("id");

        }

    });


    navLinks.forEach(function (link) {

        link.classList.remove("current");

        if (
            link.getAttribute("href") === "#" + current
        ) {

            link.classList.add("current");

        }

    });

});