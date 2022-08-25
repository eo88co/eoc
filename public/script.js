let buttonPlay = document.getElementById('buttonPlay');
let buttonRecord = document.getElementById('buttonRecord');
let buttonPause = document.getElementById('buttonPause');
let trackHolder = document.getElementById('trackHolder');
let templateTrack = document.getElementById('templateTrack');

let isPlayingAll = false;

const app = function(stream) {
    let mediaRecorder = new MediaRecorder(stream);
    let chunks = [];

    let startRecord = function() {
        mediaRecorder.start();
    };
    
    let stopRecord = function() {
        mediaRecorder.stop();
    };

    mediaRecorder.ondataavailable = function(e) {
        chunks.push(e.data);
    }

    mediaRecorder.onstop = function(e) {
        let blob = new Blob(chunks, {
            'type' : 'audio/ogg; codecs=opus',
        });
        
        chunks = [];

        addTrack(blob);
    };

    // bind actions
    buttonPlay.onclick = function() {
        buttonPlay.disabled = true;
        buttonRecord.disabled = true;
        buttonPause.disabled = false;

        document.querySelectorAll('audio').forEach(audio => {
            audio.play();
        });

        isPlayingAll = true;
    };

    buttonRecord.onclick = function() {
        buttonPlay.disabled = true;
        buttonRecord.disabled = true;
        buttonPause.disabled = false;

        startRecord();
    };

    buttonPause.onclick = function() {
        buttonPlay.disabled = false;
        buttonRecord.disabled = false;
        buttonPause.disabled = true;

        if (isPlayingAll) {
            document.querySelectorAll('audio').forEach(audio => {
                audio.pause();
            });
        } else {
            stopRecord();
        }
    };
};

const addTrack = function(blob) {
    let template = templateTrack.content.cloneNode(true);
    let templateAudio = template.querySelector('audio');
    let templatePlay = template.querySelector('.track__button--play');
    let templatePause = template.querySelector('.track__button--pause');
    let templateRemove = template.querySelector('.track__button--remove');

    templateAudio.src = URL.createObjectURL(blob);

    templatePlay.onclick = function() {
        templatePlay.disabled = true;
        templatePause.disabled = false;

        templateAudio.play();
    };

    templatePause.onclick = function() {
        templatePlay.disabled = false;
        templatePause.disabled = true;

        templateAudio.pause();
    };

    templateRemove.onclick = function(e) {
        e.target.closest('.track').remove();
    };

    trackHolder.appendChild(template);
}

navigator.mediaDevices
    .getUserMedia({ audio: true })
    .then(app);