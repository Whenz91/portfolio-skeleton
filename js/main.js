let skills = [];

let navLinkList = document.querySelector('.link-list');
let sideMenu = document.querySelector('.js-side-menu');
let sideMenuContent = document.querySelector('.js-side-menu > .content');


async function getData() {
    const res = await fetch('/skillDescriptions.json');
    const data = await res.json();

    return data;
}

function renderSideMenuContent(skill) {
    let data = skills.filter((item) => {
        return item[skill];
    })

    sideMenuContent.innerHTML = data[0][skill]['description'];
}

document.addEventListener("DOMContentLoaded", async (event) => {
    gsap.registerPlugin(ScrollTrigger);
    skills = await getData();

    const fadeInFromLeft = (selector, trigger) => {
        gsap.fromTo(selector, 
            { opacity: 0, x: -100 },
            {
                opacity: 1, x: 0,
                duration: 1,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: trigger,
                    start: "top 80%",
                    toggleActions: "play none none none"
                }
            }
        );
    };
    
    const fadeInFromRight = (selector, trigger) => {
        gsap.fromTo(selector, 
            { opacity: 0, x: 100 },
            {
                opacity: 1, x: 0,
                duration: 1,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: trigger,
                    start: "top 80%",
                    toggleActions: "play none none none"
                }
            }
        );
    };
    
    const fadeInFromTop = (selector, trigger) => {
        gsap.fromTo(selector, 
            { opacity: 0, y: -200 },
            {
                opacity: 1, y: 0,
                duration: 1,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: trigger,
                    start: "top 80%",
                    toggleActions: "play none none none"
                }
            }
        );
    };
    
    const fadeInFromBottom = (selector, trigger) => {
        gsap.fromTo(selector, 
            { opacity: 0, y: 500 },
            {
                opacity: 1, y: 0,
                duration: 1,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: trigger,
                    start: "top 80%",
                    toggleActions: "play none none none"
                }
            }
        );
    };
    
    // Animációk alkalmazása
    gsap.utils.toArray(".section-title").forEach(title => fadeInFromLeft(title, title));

    if(document.querySelector('#about')) {
        fadeInFromLeft('.gsap-box-1', '#about');
        fadeInFromRight('.gsap-box-2', '#about');
        fadeInFromTop('.gsap-box-3', '#project');
        fadeInFromBottom('.gsap-box-4', '#project');
        fadeInFromLeft('#skill .grid', '#skill');
    }
    if(document.querySelector('#experience')) {
        fadeInFromLeft('.gsap-box-1', '#experience');
        fadeInFromRight('.gsap-box-2', '#experience');

        gsap.from(".gsap-boxes > div", {
            opacity: 0,
            y: 50,
            duration: 1,
            ease: "power2.out",
            stagger: 0.3,
            scrollTrigger: {
                trigger: "#hobbie",
                start: "top 80%",
                toggleActions: "play none none none"
            }
        });
    }
    
});

document.querySelector('body').addEventListener('click', (e) => {
    if(e.target.classList.contains('js-mobile-menu-btn')) {

        navLinkList.classList.toggle('open');
    
    }
    if(e.target.dataset.skill) {
        renderSideMenuContent(e.target.dataset.skill)
        sideMenu.classList.toggle('open');
    }
    if(e.target.classList.contains('js-close-side-menu-btn')) {
        sideMenu.classList.toggle('open');
    }
});