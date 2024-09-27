const listOfSurah = document.getElementById("surah-name-list");

fetch("https://api.alquran.cloud/v1/surah")
    .then((req) => req.json())
    .then((res) => {
        res.data.forEach(surah => {
            console.log(surah)
            let li = document.createElement('li');
            li.innerHTML = `
            <a href="#">${surah.englishName}(${surah.name})</a>
            `
            listOfSurah.appendChild(li)
        });
    });
