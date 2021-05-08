const openBtn = document.querySelector('.open-btn');
const closeBtn = document.querySelector('.close-btn');
const navEls = document.querySelectorAll('.nav');
const inputNum = document.getElementById('input-number');
const inputSearch = document.getElementById('input-search');
const button = document.querySelector('.btn-search');
const form = document.querySelector('.form-container');
const backdrop = document.getElementById('backdrop');
const deck_container = document.getElementById('deck-container');

openBtn.addEventListener('click', () => {
    navEls.forEach(nav_el => {
        nav_el.classList.add('visible');
    });
});

closeBtn.addEventListener('click', () => {
    navEls.forEach(nav_el => {
        nav_el.classList.remove('visible');
    });
});

const toggleBackdrop = () => {
    backdrop.classList.toggle('visible');
};

backdrop.addEventListener('click', toggleBackdrop);

button.addEventListener('click', () => {
    count = inputNum.value;
    searchVal = inputSearch.value;
    getWorks(count, searchVal);
});

form.addEventListener('submit', (e) => {
    e.preventDefault();

    let searchTerm = document.querySelector('.work-title');
    searchTerm.textContent = inputSearch.value;

    inputNum.value = '';
    inputSearch.value = '';

});

async function getWorks(work_count, search) {
    try {
        const url = `https://api.artic.edu/api/v1/artworks/search?q=${search}&limit=${work_count}&fields=id,title,artist_display,date_display,main_reference_number,image_id`;
        const res = await fetch(url);
        const data = await res.json();

        deck_container.textContent = '';
        for (let i = 0; i <= data.data.length - 1; i++) {
            createCard(data.data[i]);
        }
    } catch (error) {
        console.log(error);
    }
}

const createCard = (card) => {

    const workEl = document.createElement('div');
    workEl.classList.add('work');

    const title = card.title;
    const artist_country = card.artist_display.split(',')[0];
    const acSplit = artist_country.split(/[\s,]+/);
    const artist = acSplit[0] + ' ' + acSplit[1];
    const year = card.date_display;

    const workInnerHtml = `
        <h3 class="title">${title}</h3>
        <div class="img-container">
            <img src ="https://www.artic.edu/iiif/2/${card.image_id}/full/843,/0/default.jpg">
        </div>
        <div class="info">
            <h3 class="artist">${artist}</h3>
            <span class="year">${year}</span>
        </div> 
    `;

    workEl.innerHTML = workInnerHtml;
    deck_container.appendChild(workEl);
}