const text = gsap.timeline({ repeat: 0 });
function introAnimation() {
    text.to("body", {
        overflow: "hidden"
    })
        .from(".intro_text span", {
            x: 20,
            opacity: 0,
            stagger: .2,
            duration: .9,
            ease: "back.out(1)"
        })
        .to(".intro", {
            y: "-100vh",
            borderRadius: "70%",
            duration: .4
        })
        .to("body", {
            overflow: "auto"
        })
        .from(".navigation_ele", {
            y: -10,
            opacity: 0,
            duration: .5,
            stagger: .2,
            ease: "power2.out"
        })
        .from(".img", {
            y: -10,
            opacity: 0,
            duration: .5
        })
        .from(".title_1", {
            y: -10,
            opacity: 0,
            duration: .5
        })
        .from(".des li", {
            y: -10,
            stagger: .2,
            opacity: 0,
            duration: .5
        })
}
// introAnimation()

// const scroll_cat = gsap.timeline();
function scrollAnimation() {
    gsap.from(".category-div", {
        x: -20,
        opacity: 0,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
            trigger: ".category-div",
            scroller: "body",
            start: "top 50%",
            // scrub: true,
            markers: true
        }
    })
    gsap.from(".cat_img", {
        y: 50,
        opacity: 0,
        duration: 1.2,
        stagger: .5,
        ease: "power3.out",
        scrollTrigger: {
            trigger: ".img_box",
            scroller: "body",
            start: "top 50%",
            // scrub: true
            // markers: true,
        }
    })
    gsap.from(".new_des", {
        x: -20,
        opacity: 0,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
            trigger: ".new_des",
            scroller: "body",
            start: "top 50%",
            // scrub: true,
            // markers: true
        }
    })
    gsap.from(".new_img", {
        y: 50,
        opacity: 0,
        duration: 1.2,
        stagger: .5,
        ease: "power3.out",
        scrollTrigger: {
            trigger: ".new_box",
            scroller: "body",
            start: "top 50%",
            // scrub: true
            // markers: true,
        }
    })
    gsap.from(".banner_img", {
        opacity: 0,
        duration: 1.2,
        stagger: .5,
        ease: "power3.out",
        scrollTrigger: {
            trigger: ".banner_img",
            scroller: "body",
            start: "top 50%",
            // scrub: true
            // markers: true,
        }
    })
    gsap.from(".footer_1", {
        opacity: 0,
        duration: 1.2,
        stagger: .5,
        delay: .5,
        ease: "power3.out",
        scrollTrigger: {
            trigger: ".banner_img",
            scroller: "body",
            start: "top 50%",
            // scrub: true
            // markers: true,
        }
    })
}
// scrollAnimation()

// Hover
function img_hover() {
    const catImg = document.querySelectorAll(".cat_img");
    const new_img = document.querySelectorAll(".new_img");

    catImg.forEach((img) => {
        img.addEventListener("mouseenter", () => {
            gsap.to(img, {
                scale: 1.05,
                // borderRadius: "15px",
                opacity: .4,
                duration: .4,
                ease: "power2.out"
            })
        })
        img.addEventListener("mouseleave", () => {
            gsap.to(img, {
                scale: 1,
                // borderRadius: "0px",
                opacity: 1,
                duration: .4,
                ease: "power2.out"
            })
        })
    })

    new_img.forEach((img) => {
        img.addEventListener("mouseenter", () => {
            gsap.to(img, {
                scale: 1.05,
                // borderRadius: "15px",
                opacity: .4,
                duration: .4,
                ease: "power2.out"
            })
        })
        img.addEventListener("mouseleave", () => {
            gsap.to(img, {
                scale: 1,
                // borderRadius: "0px",
                opacity: 1,
                duration: .4,
                ease: "power2.out"
            })
        })
    })
}
img_hover()

// Animation Line Animation

const element_h3 = document.querySelectorAll(".navigation_ele");
function mouse_enter(div_id) {
    gsap.to(div_id, {
        width: "100%",
        // transformOrigin: "right left",
        opacity: 1,
        duration: .6,
        ease: "expo.out"
    })
}
function mouse_leave(div_id) {
    gsap.to(div_id, {
        width: "0%",
        // transformOrigin: "right center",
        opacity: 0,
        duration: .6,
        ease: "expo.out"
    })
}
element_h3.forEach((link) => {
    link.addEventListener("mouseenter", () => {
        console.log("enter");
        const div_id = `#${link.children[1].getAttribute("id")}`
        mouse_enter(div_id)
    })
    link.addEventListener("mouseleave", () => {
        console.log("leave");
        const div_id = `#${link.children[1].getAttribute("id")}`
        mouse_leave(div_id)
    })
})

const user_icon = document.querySelector(".icon");
user_icon.addEventListener("click", () => {
    gsap.to(".user_div", {
        x: "-500px",
    })
})

const colse_icon = document.querySelector(".close_icon");
colse_icon.addEventListener("click", () => {
    gsap.to(".user_div", {
        x: "500px",
    })
})

const user_icon_div = document.querySelector(".create_icon");
user_icon_div.addEventListener("click", () => {
    gsap.to(".create_form", {
        y: "100%",
    })
    gsap.from(".input_create", {
        stagger: .4,
        duration: 1,
        opacity: 0,
        y: -30,
        ease: "power3.out",
    })
    gsap.to(".login_form", {
        y: "-100%",
    })
})

const colse_icon_div = document.querySelector(".login_icon");
colse_icon_div.addEventListener("click", () => {
    gsap.to(".login_form", {
        y: "100%",
    })
    gsap.from(".login_create", {
        stagger: .4,
        duration: 1,
        opacity: 0,
        y: -30,
        ease: "power3.out",
    })
    gsap.to(".create_form", {
        y: "-100%",
    })
})
