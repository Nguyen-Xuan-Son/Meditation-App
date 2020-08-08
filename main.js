const song = document.querySelector(".song");
const play = document.querySelector(".play");
const video = document.querySelector(".video-container video");
const timesSelect = document.querySelectorAll(".choose-time button");
const outline = document.querySelector(".move-outline circle");
const sounds = document.querySelectorAll(".sound-choose button");
const timeDisplay = document.querySelector(".time-display");

const outlineLength = outline.getTotalLength();
let timeDuration;

const stopSong = () => {
    song.pause();
    video.pause();
    song.currentTime = 0;
    play.src = './svg/play.svg';
};

const playSong = () => {
    song.play();
    video.play();
    song.currentTime = 0;
    play.src = './svg/pause.svg';
};

const checkPlaying = () => {
    if (song.paused) {
        playSong();
    } else {
        stopSong();
    }
};

const displayTime = (minutes, seconds) => {
    let minutesResult = Math.floor(minutes);
    let secondsResult = Math.floor(seconds);

    if (minutes < 10) {
        minutesResult = '' + minutesResult;
    } else if (minutes === 0) {
        minutesResult = '00';
    }

    if (seconds < 10) {
        secondsResult = '0' + secondsResult;
    } else if (seconds === 0) {
        secondsResult = '00';
    }

    timeDisplay.textContent = `${minutesResult}:${secondsResult}`;
};

(initTimeDuration= () => {
    timeDuration = timesSelect[0].getAttribute('data-time');
    const minutes = timeDuration/60;
    const seconds = timeDuration%60;
    displayTime(minutes, seconds);
})();

outline.style.strokeDasharray = outlineLength;
outline.style.strokeDashoffset = outlineLength;

timesSelect.forEach(timeSelect => {
    timeSelect.addEventListener('click', function() {
        timeDuration = this.getAttribute('data-time');
        const minutes = timeDuration/60;
        const seconds = timeDuration%60;
        displayTime(minutes, seconds);
        stopSong();
    });
});

sounds.forEach(sound => {
    sound.addEventListener('click', function() {
        const dataVideo = this.getAttribute('data-video');
        const dataSound = this.getAttribute('data-sound');
        song.src = dataSound;
        video.src = dataVideo;
        stopSong();
    });
});

play.addEventListener('click', () => {
    checkPlaying();
});

song.ontimeupdate = () => {
    const currentTime = Math.floor(song.currentTime);
    const elapsed = timeDuration - currentTime;
    const minutes = Math.floor(elapsed/60);
    const seconds = Math.floor(elapsed%60);

    outline.style.strokeDashoffset = (1 - (currentTime/timeDuration))*outlineLength;

    displayTime(minutes, seconds);
    if (currentTime >= timeDuration) {
        stopSong();
        return;
    }
};
