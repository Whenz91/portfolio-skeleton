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

window.addEventListener('load', async () => {
    skills = await getData();
})

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