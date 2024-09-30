const listOfSurah = document.getElementById("surah-name-list");
const menuSurahName = document.getElementById('menu-surah-name');
const menuAyahslist = document.querySelector('.menu-ayahs-list')
fetch("https://api.alquran.cloud/v1/surah")
    .then((req) => req.json())
    .then((res) => {
        res.data.forEach(surah => {
            let li = document.createElement('li');
            li.innerHTML = `
            <a href="?id=${surah.number}">${surah.number}) ${surah.englishName} (${surah.name})</a>
            `
            listOfSurah.appendChild(li)
        });
    })
    .catch(error => console.log(error));
// http://127.0.0.1:5500/surah.html?surah-id=8


const params = new URLSearchParams(document.location.search);
let surahID = params.get('id')

fetch(`https://api.alquran.cloud/v1/surah/${surahID ? surahID: 1}`)
    .then(request => request.json())
    .then(res => {
        console.log(res.data.ayahs)
        res.data.ayahs.forEach(ayah => {
            let li = document.createElement('li');
            li.textContent = ayah.number+') '+ ayah.text;
            menuAyahslist.appendChild(li);
        })
        menuSurahName.textContent = res.data.englishName + ' ' + res.data.name
    })