const list = document.getElementById("list");

fetch("https://api.alquran.cloud/v1/surah")
  .then((req) => req.json())
  .then((res) => {
    res.data.forEach((surah) => {
      let card = document.createElement("div");
      card.className = "box";
      card.innerHTML = `
            <a href='/surah.html?id=${surah.number}'>
            <div class="box-lb">
                <span>${surah.number}</span>
            </div>
            <div class="box-rt">
                <span>${surah.numberOfAyahs}</span>
            </div>
            <div class="box-body">
                <div class="box-content">
                    <p>${surah.englishName}</p>
                    <p>${surah.englishNameTranslation}</p>
                    <p>${surah.name}</p>
                </div>
                <div class="box-img">
                    <img src=${surah.revelationType == "Meccan"
          ? "images/mecca.png"
          : "images/medinah.png"
        } alt="${surah.englishName} image" class="mosque-img"> 
                </div>
            </div>
            </a>
      `;
      list.appendChild(card);
    });
  });

fetch("https://api.alquran.cloud/v1/surah/1")
  .then((response) => response.json())
  .then((result) => console.log(result))
  .catch((error) => console.log("error", error));
