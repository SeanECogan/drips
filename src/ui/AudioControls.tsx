import React, { useState, useEffect } from 'react';

import './AudioControls.css';

const bg1Audio = require('../sounds/bg_1.mp3');
const bg2Audio = require('../sounds/bg_2.mp3');
const bg3Audio = require('../sounds/bg_3.mp3');

const bgAudios = [
    new Audio(bg1Audio),
    new Audio(bg2Audio),
    new Audio(bg3Audio)
];

for (let bgAudio of bgAudios) {
    bgAudio.volume = 0.4;
}

function AudioControls() {
    useEffect(() => {
        for (let i = 0; i < bgAudios.length; i++) {
            bgAudios[i].addEventListener('ended', () => {
                bgAudios[i].currentTime = 0;
                bgAudios[i].play();
            }, false);
        }
    })

    const [currentBgAudioId, setCurrentBgAudioId] = useState(0);
    const [bgAudioIsPlaying, setBgAudioIsPlaying] = useState(false);

    function playPreviousBgAudio() {
        bgAudios[currentBgAudioId].pause();

        let previousBgAudioId = currentBgAudioId - 1;

        if (previousBgAudioId < 0) {
            previousBgAudioId = bgAudios.length - 1;
        }

        bgAudios[previousBgAudioId].play();

        setCurrentBgAudioId(previousBgAudioId);
        setBgAudioIsPlaying(true);
    }

    function togglePlayForCurrentBgAudio() {
        if (!bgAudioIsPlaying) {
            bgAudios[currentBgAudioId].play();
        } else {
            bgAudios[currentBgAudioId].pause();
        }

        setBgAudioIsPlaying(!bgAudioIsPlaying);
    }

    function playNextBgAudio() {
        bgAudios[currentBgAudioId].pause();

        let nextBgAudioId = currentBgAudioId + 1;

        if (nextBgAudioId > bgAudios.length - 1) {
            nextBgAudioId = 0;
        }

        bgAudios[nextBgAudioId].play();

        setCurrentBgAudioId(nextBgAudioId);
        setBgAudioIsPlaying(true);
    }

    return (
        <div className="AudioControls">
            <p>Background Music</p>
            <p>
                <i className="material-icons" onClick={playPreviousBgAudio}>skip_previous</i>
                <i className="material-icons" onClick={togglePlayForCurrentBgAudio}>{bgAudioIsPlaying ? 'pause' : 'play_arrow'}</i>
                <i className="material-icons" onClick={playNextBgAudio}>skip_next</i>
            </p>
        </div>
    );
}

export default AudioControls;