const musicList = [
  {
    id: 1,
    artistName: "Jah Khalib",
    musicName: "Medina",
    musicPath: "Jah Khalib - Медина.mp3",
    imagePath: "maxresdefault.jpg",
    duration: 245,
  },
  {
    id: 2,
    artistName: "Mehman Huseynov",
    musicName: "Hani Bes",
    musicPath: "Mehman Huseynov- Hani Bes (Official Video Klip 2021 ).mp3",
    imagePath: "hanibes.jpg",
    duration: 266,
  },
  {
    id: 3,
    artistName: "Monica Belluci",
    musicName: "Malena",
    musicPath: "Monica Belluci - Malena.mp3",
    imagePath: "monica.webp",
    duration: 231,
  },
  {
    id: 4,
    artistName: "Namiq Qaracuxurlu",
    musicName: "Cavanligimin Ogrusu",
    musicPath: "namiq.mp3",
    imagePath: "namiq).jpg",
    duration: 63,
  },
  {
    id: 5,
    artistName: "Savai",
    musicName: "Dark Life",
    musicPath: "Savai - Dark Life (Instrumental).mp3",
    imagePath: "darklife.jpg",
    duration: 194,
  },
  {
    id: 6,
    artistName: "SHOUSE",
    musicName: "Love Tonight",
    musicPath: "Lovetonight.mp3",
    imagePath: "LoveTonight.png",
    duration: 171,
  },
  {
    id: 7,
    artistName: "Tom Odell",
    musicName: "Another Love",
    musicPath: "Tom Odell - Another Love (Official Video).mp3",
    imagePath: "another.jpg",
    duration: 247,
  },
  {
    id: 8,
    artistName: "Xpert",
    musicName: "Və bir də",
    musicPath: "Xpert - Və bir də (Official Music Video).mp3",
    imagePath: "expert).jpg",
    duration: 219,
  },
];

const musicListElem = document.querySelector(".music-list");
const prevBtn = document.querySelector("#prev");
const playBtn = document.querySelector("#play");
const pauseBtn = document.querySelector("#pause");
const nextBtn = document.querySelector("#next");
const gramafonImg = document.querySelector(".gramafonImg");
const marquee = document.querySelector("marquee");
const scrollBar = document.getElementById("scrollbar");
const audioElem = document.querySelector("audio");
const currentTimeElem = document.querySelector(".currentTime");
const musicImg = document.querySelector(".music-img");
let index = 0;
let interVal;
marquee.innerHTML = `${musicList[index].artistName}-${musicList[index].musicName}`;

playBtn.addEventListener("click", () => {
  playMusic()
});
pauseBtn.addEventListener("click", () => {
  gramafonImg.classList.add("animation-pause");
  marquee.stop();
  audioElem.pause()
  clearInterval(interVal)
});
nextBtn.addEventListener("click", () => {
  index++;
  if (index === musicList.length) {
    index = 0;
  }
  playMusic()
});
prevBtn.addEventListener("click", () => {
  index--;
  if (index < 0) {
    index = musicList.length - 1;
  }
  playMusic()
});

scrollBar.addEventListener("input", () => {
  audioElem.currentTime = scrollBar.value;
  let min = Math.floor(scrollBar.value / 60);
  let sec = Math.floor(scrollBar.value % 60);
  let minStr;
  if (min >= 10) {
    minStr = min;
  } else {
    minStr = "0" + min;
  }

  let secStr;
  if (sec >= 10) {
    secStr = sec;
  } else {
    secStr = "0" + sec;
  }

  currentTimeElem.innerHTML = `${minStr}:${secStr}`;
});

function playMusic() {
  audioElem.src = `./files/audio/${musicList[index].musicPath}`;
  musicImg.src = `./files/image/${musicList[index].imagePath}`;
  audioElem.play();
  gramafonImg.classList.remove("animation-pause");
  scrollBar.value = 0;
  marquee.start();
  marquee.innerHTML = `${musicList[index].artistName}-${musicList[index].musicName}`;

  interVal = setInterval(() => {
    let min = Math.floor(audioElem.currentTime / 60);
    let sec = Math.floor(audioElem.currentTime % 60);

    let minStr;
    if (min >= 10) {
      minStr = min;
    } else {
      minStr = "0" + min;
    }

    let secStr;
    if (sec >= 10) {
      secStr = sec;
    } else {
      secStr = "0" + sec;
    }

    currentTimeElem.innerHTML = `${minStr}:${secStr}`;
    scrollBar.value = audioElem.currentTime;
  }, 1000);
}

musicList.forEach((music) => {
  const minute = Math.floor(music.duration / 60);
  const second = Math.floor(music.duration % 60);

  let minuteStr;
  if (minute >= 10) {
    minuteStr = minute;
  } else {
    minuteStr = "0" + minute;
  }

  let secondStr;
  if (second >= 10) {
    secondStr = second;
  } else {
    secondStr = "0" + second;
  }

  let displayedName = "";
  if (music.artistName.length > 10) {
    displayedName = music.artistName.slice(0, 10) + "...";
  } else {
    displayedName = music.artistName;
  }

  musicListElem.innerHTML += `
    <div class="music">
      <img src="/files/image/${music.imagePath}">
      <div class="info">
        <p title="${music.artistName}">
          ${displayedName}
        </p>
        <p>${music.musicName}</p>
        <p class="time">${minuteStr} : ${secondStr}</p>
      </div>
    </div>
  `;
});


const musicİtemList = document.querySelectorAll(".music");
musicİtemList.forEach((item, i) => {
  item.addEventListener("click", () => {
    index = i;
    playMusic()
    musicİtemList.forEach((elem) => elem.classList.remove("music-active"));
    item.classList.add("music-active");
  });
});
