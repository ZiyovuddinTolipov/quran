const listOfSurah = document.getElementById("surah-name-list");
const menuSurahName = document.getElementById('menu-surah-name');
const menuAyahslist = document.querySelector('.menu-ayahs-list');
const surahRevaledInfo = document.querySelector('.surah-ayahs__card .surah-revealed-info');

// Check if surah data is already in localStorage
let surahData = localStorage.getItem('surahData');

if (!surahData) {
    // Fetch surah data if not in localStorage
    fetch("https://api.alquran.cloud/v1/surah")
        .then((req) => req.json())
        .then((res) => {
            // Save fetched data to localStorage
            localStorage.setItem('surahData', JSON.stringify(res.data));
            renderSurahList(res.data);
        })
        .catch(error => console.log(error));
} else {
    // Parse and render from localStorage
    renderSurahList(JSON.parse(surahData));
}

function renderSurahList(surahList) {
    surahList.forEach(surah => {
        let li = document.createElement('li');
        li.innerHTML = `
        <a href="?id=${surah.number}">${surah.number}) ${surah.englishName} (${surah.name})</a>
        `;
        listOfSurah.appendChild(li);
    });

    // Load the last selected surah from localStorage
    const lastSurahID = localStorage.getItem('lastSurahID');
    if (lastSurahID) {
        const selectedLink = listOfSurah.querySelector(`a[href="?id=${lastSurahID}"]`);
        if (selectedLink) {
            selectedLink.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }
}

const params = new URLSearchParams(document.location.search);
let surahID = params.get('id');
console.log('surahid '+surahID)

fetch(`https://api.alquran.cloud/v1/surah/${surahID ? surahID : 2}/uz.sodik`)
    .then(request => request.json())
    .then(res => {
        // Save the selected surah ID to localStorage
        localStorage.setItem('lastSurahID', surahID);

        console.log(res.data);
        menuAyahslist.innerHTML = ''; // Clear previous ayahs
        res.data.ayahs.forEach(ayah => {
            let li = document.createElement('li');
            let arabicNumber = ayah.numberInSurah.toString().replace(/\d/g, d => '٠١٢٣٤٥٦٧٨٩'[d]);
            li.innerHTML = `${ayah.text} <span>${arabicNumber}</span>`;
            menuAyahslist.appendChild(li);
        });

        surahRevaledInfo.textContent = `${res.data.revelationType == "Meccan" ? "Makka" : 'Madina'}da nozil bo'lgan, ${res.data.numberOfAyahs} oyatdan iborat.`;
        menuSurahName.textContent = res.data.englishName + ' ' + res.data.name;
    })
    .catch(error => console.error(error));
