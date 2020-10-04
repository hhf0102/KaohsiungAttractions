const parkAPI = 'https://raw.githubusercontent.com/hexschool/KCGTravel/master/datastore_search.json';
const attractions = [];
const list = document.querySelector('.content > ul');
const searchBar = document.querySelector('.searchBar');
const content = document.querySelector('.content');
const notFound = document.createElement('p');
content.appendChild(notFound);
const selectArea = document.querySelector('#selectArea');
const modal = document.querySelector('.modal');
const modalContent = document.querySelector('.modal-content');
const information = document.querySelector('.information');
const close = document.querySelector('.close');

fetch(parkAPI)
  .then(res => res.json())
  .then((res) => {
    attractions.push(...res.result.records);
    const html = attractions.map(attraction =>
      `
        <li>
            <div class="pic" style="background-image:url(${attraction.Picture1})"></div>
            <h4>景點：${attraction.Name}</h4>
            <h4>地點：${attraction.Add}</h4>
            <h4>開放時間：${attraction.Opentime}</h4>
            <a href="javascript:;" id="${attraction.Id}">詳細資訊</a>
        </li>
      `).join('');
    list.innerHTML = html;
  });


searchBar.addEventListener('keyup', () => {
  // selectArea.value = 'default';
  const regexp = new RegExp(searchBar.value, 'g');
  const attractionMatch = attractions.filter(attraction => attraction.Name
    .match(regexp)).map((attraction) => {
    const attractionName = attraction.Name.replace(regexp, `<span class="highlight">${searchBar.value}</span>`);
    return `
            <li>
                <div class="pic" style="background-image:url(${attraction.Picture1})"></div>
                <h4>景點：${attractionName}</h4>
                <h4>地點：${attraction.Add}</h4>
                <h4>開放時間：${attraction.Opentime}</h4>
                <a href="#" id="${attraction.Id}">詳細資訊</a>
            </li>
        `;
  }).join('');
  list.innerHTML = attractionMatch;
  attractionMatch.length === 0 ? notFound.textContent = '沒有找到相關資料' : notFound.textContent = '';
});


selectArea.addEventListener('change', () => {
  searchBar.value = '';
  const area = selectArea.value;
  if (area === '全部') {
    const attractionMatch = attractions.map(attraction =>
      `
        <li>
            <div class="pic" style="background-image:url(${attraction.Picture1})"></div>
            <h4>景點：${attraction.Name}</h4>
            <h4>地點：${attraction.Add}</h4>
            <h4>開放時間：${attraction.Opentime}</h4>
            <a href="#" id="${attraction.Id}">詳細資訊</a>
        </li>
      `)
      .join('');
    list.innerHTML = attractionMatch;
  } else {
    const attractionMatch = attractions.filter(attraction => attraction.Zone === area)
      .map(attraction =>
        `
            <li>
                <div class="pic" style="background-image:url(${attraction.Picture1})"></div>
                <h4>景點：${attraction.Name}</h4>
                <h4>地點：${attraction.Add}</h4>
                <h4>開放時間：${attraction.Opentime}</h4>
                <a href="#" id="${attraction.Id}" id="${attraction.Id}">詳細資訊</a>
            </li>
        `)
      .join('');
    list.innerHTML = attractionMatch;
    attractionMatch.length === 0 ? notFound.textContent = '沒有找到相關資料' : notFound.textContent = '';
  }
});


list.addEventListener('click', (e) => {
  e.preventDefault();
  if (e.target.matches('a')) {
    modal.style.display = 'block'
  } else return;
  const attraction = attractions.find(attractionEach => attractionEach.Id === e.target.id);
  if (attraction.Ticketinfo === '') attraction.Ticketinfo = '沒有資訊';
  const html = `
        <img class="picModal" src="${attraction.Picture1}"</img>
        <h4>景點：${attraction.Name}</h4>
        <h4>地點：${attraction.Add}</h4>
        <h4>開放時間：${attraction.Opentime}</h4>
        <h4>票價： ${attraction.Ticketinfo}</h4>
        <h4>行政區：${attraction.Zone}</h4>
        <h4>簡介：${attraction.Description}</h4>
        <h4>電話：${attraction.Tel}</h4>
    `;
  information.innerHTML = html;
  modalContent.scrollTop = 0;
});


window.addEventListener('click', (e) => {
  if (e.target.matches('.modal')) modal.style.display = 'none';
});

close.addEventListener('click', () => modal.style.display = 'none');

// goTop button-----------------------------------------

const goTopBtn = document.querySelector('.goTop');
let timer = null;
let isRunning = false;
goTopBtn.style.display = `${window.scrollY === 0 ? 'none' : 'flex'}`;

window.addEventListener('scroll', () => {
  goTopBtn.style.display = `${window.scrollY !== 0 && !isRunning ? 'flex' : 'none'}`;
  if (window.scrollY == 0) clearInterval(timer);
})

goTopBtn.addEventListener('click', () => {
  isRunning = true;
  timer = setInterval(function() {
    let currentTop = document.documentElement.scrollTop;
    let isSpeed = -30;
    document.documentElement.scrollTop = currentTop + isSpeed;
    if (window.scrollY == 0) isRunning = false;
  }, 10);
})