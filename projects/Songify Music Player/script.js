const musicPlayer = document.querySelector(".music_player"),
musicImg = musicPlayer.querySelector(".imgBox img"),
musicName = musicPlayer.querySelector(".songDetails .name"),
musicArtist = musicPlayer.querySelector(".songDetails .artist"),
mainAudio = musicPlayer.querySelector("#mainAudio"),
playPauseBtn = musicPlayer.querySelector(".play-pause"),
prevBtn = musicPlayer.querySelector("#prev"),
nextBtn = musicPlayer.querySelector("#next"),
progressArea = musicPlayer.querySelector(".progress-area"),
progressBar = musicPlayer.querySelector(".progress-bar"),
equalizer = musicPlayer.querySelector("#equalizer"),
musicList = document.querySelector(".music_list"),
volMuteBtn = musicPlayer.querySelector("#vol"),
songCount = document.getElementById("song-count");

let musicIndex = Math.floor(Math.random() * songs.length) + 1;

window.addEventListener("load", () => {
    loadMusic(musicIndex);
    playingNow();

    if(songCount){
        songCount.textContent = `${songs.length} Songs`;
    }
});

// ==============================
// Load Music
// ==============================

function loadMusic(indexNum){

    musicName.textContent = songs[indexNum - 1].name;
    musicArtist.textContent = songs[indexNum - 1].artist;

    musicImg.src = `assets/images/${songs[indexNum - 1].img}.jpg`;

    mainAudio.src = `https://www.mboxdrive.com/${songs[indexNum - 1].src}.mp3`;

}

// ==============================
// Play Music
// ==============================

function playMusic(){

    musicPlayer.classList.add("paused");

    playPauseBtn.querySelector("i").textContent = "pause";

    musicImg.classList.add("anim");

    mainAudio.play();

    equalizer.load("https://assets7.lottiefiles.com/packages/lf20_btTua7.json");

}

// ==============================
// Pause Music
// ==============================

function pauseMusic(){

    musicPlayer.classList.remove("paused");

    playPauseBtn.querySelector("i").textContent = "play_arrow";

    musicImg.classList.remove("anim");

    mainAudio.pause();

    equalizer.load("");

}

// ==============================
// Next Song
// ==============================

function nextMusic(){

    musicIndex++;

    if(musicIndex > songs.length){

        musicIndex = 1;

    }

    loadMusic(musicIndex);

    playMusic();

    playingNow();

}

// ==============================
// Previous Song
// ==============================

function prevMusic(){

    musicIndex--;

    if(musicIndex < 1){

        musicIndex = songs.length;

    }

    loadMusic(musicIndex);

    playMusic();

    playingNow();

}

// ==============================
// Events
// ==============================

playPauseBtn.addEventListener("click",()=>{

    const isPlaying = musicPlayer.classList.contains("paused");

    isPlaying ? pauseMusic() : playMusic();

    playingNow();

});

nextBtn.addEventListener("click",nextMusic);

prevBtn.addEventListener("click",prevMusic);

// ==============================
// Volume
// ==============================

let isMute = false;

volMuteBtn.addEventListener("click",()=>{

    isMute = !isMute;

    mainAudio.muted = isMute;

    volMuteBtn.textContent = isMute ? "volume_off" : "volume_up";

});

// ==============================
// Progress
// ==============================

mainAudio.addEventListener("timeupdate",(e)=>{

    const currentTime = e.target.currentTime;
    const duration = e.target.duration;

    if(duration){

        progressBar.style.width = `${(currentTime/duration)*100}%`;

    }

    const current = musicPlayer.querySelector(".current");
    const total = musicPlayer.querySelector(".duration");

    current.textContent = formatTime(currentTime);

    total.textContent = formatTime(duration);

});

function formatTime(time){

    if(isNaN(time)) return "00:00";

    const min = Math.floor(time/60);

    const sec = Math.floor(time%60);

    return `${String(min).padStart(2,"0")}:${String(sec).padStart(2,"0")}`;

}

progressArea.addEventListener("click",(e)=>{

    const width = progressArea.clientWidth;

    const clickX = e.offsetX;

    const duration = mainAudio.duration;

    mainAudio.currentTime = (clickX/width)*duration;

    playMusic();

});

// ==============================
// Repeat / Shuffle
// ==============================

const repeatBtn = document.getElementById("repeat-plist");

repeatBtn.addEventListener("click",()=>{

    switch(repeatBtn.textContent){

        case "repeat":

            repeatBtn.textContent = "repeat_one";
            repeatBtn.title = "Song Looped";
            break;

        case "repeat_one":

            repeatBtn.textContent = "shuffle";
            repeatBtn.title = "Shuffle";
            break;

        default:

            repeatBtn.textContent = "repeat";
            repeatBtn.title = "Playlist Looped";

    }

});

mainAudio.addEventListener("ended",()=>{

    switch(repeatBtn.textContent){

        case "repeat":

            nextMusic();
            break;

        case "repeat_one":

            mainAudio.currentTime = 0;

            playMusic();
            break;

        default:

            let rand;

            do{

                rand = Math.floor(Math.random()*songs.length)+1;

            }while(rand===musicIndex);

            musicIndex = rand;

            loadMusic(musicIndex);

            playMusic();

            playingNow();

    }

});

// ==============================
// Playlist
// ==============================

const ulTag = document.querySelector(".music_list ul");

songs.forEach((song,index)=>{

    const li = `
    <li liIndex="${index+1}">
        <div class="row">
            <span>${song.name}</span>
            <p>${song.artist}</p>
        </div>

        <span class="audio-duration">♪</span>
    </li>
    `;

    ulTag.insertAdjacentHTML("beforeend",li);

});

const allLiTags = ulTag.querySelectorAll("li");

function playingNow(){

    allLiTags.forEach(li=>{

        li.classList.remove("playing");

        if(Number(li.getAttribute("liIndex"))===musicIndex){

            li.classList.add("playing");

        }

        li.onclick=()=>{

            musicIndex = Number(li.getAttribute("liIndex"));

            loadMusic(musicIndex);

            playMusic();

            playingNow();

        }

    });

}