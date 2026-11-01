const BASE_FREQUENCY = 440; // A1 in Hz, the base note.
// The ratio between two adjacent semitones (the twelfth root of two). Multiplying by
// it raises a pitch one semitone; dividing (a negative exponent) lowers it.
const SEMITONE_RATIO = Math.pow(2, 1 / 12);

// Each note expressed as its offset in semitones from the A1 base (440 Hz).
const NOTE_SEMITONES = {
    b1: -10,
    C1: -9,
    Cis: -8,
    D1: -7,
    Dis: -6,
    Des: -6,
    E1: -5,
    Es: -5,
    F1: -4,
    Fis: -3,
    Ges: -3,
    G1: -2,
    Gis: -1,
    A1: 0,
    Ais: 1,
    As: 1,
    H1: 2,
};

// Frequencies derived from the base by multiplying/dividing it by SEMITONE_RATIO.
const NOTE_FREQUENCIES = Object.fromEntries(
    Object.entries(NOTE_SEMITONES).map(([name, semitones]) => [
        name,
        BASE_FREQUENCY * Math.pow(SEMITONE_RATIO, semitones),
    ])
);

let audioContext = null;

function ensureAudioContext() {
    const AudioCtor = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtor) {
        return null;
    }
    if (!audioContext) {
        audioContext = new AudioCtor();
    }
    if (audioContext.state === "suspended") {
        audioContext.resume();
    }
    return audioContext;
}

function playTone(frequency, duration = 0.35, volume = 0.08, waveType = "sine") {
    const context = ensureAudioContext();
    if (!context || !Number.isFinite(frequency)) {
        return;
    }

    const oscillator = context.createOscillator();
    const gainNode = context.createGain();
    const startTime = context.currentTime;

    oscillator.type = waveType;
    oscillator.frequency.setValueAtTime(frequency, startTime);

    gainNode.gain.setValueAtTime(0.0001, startTime);
    gainNode.gain.exponentialRampToValueAtTime(volume, startTime + 0.02);
    gainNode.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

    oscillator.connect(gainNode);
    gainNode.connect(context.destination);
    oscillator.start(startTime);
    oscillator.stop(startTime + duration);
}

function playNoteSound(noteName) {
    if (!noteName) {
        return;
    }

    const normalizedNote = noteName.trim();
    const frequency = NOTE_FREQUENCIES[normalizedNote];
    if (frequency) {
        playTone(frequency, 0.9, 0.08, "sine");
    }
}

function playCorrectAnswerSound() {
    playTone(523.25, 0.18, 0.08, "triangle");
    setTimeout(() => playTone(659.25, 0.18, 0.08, "triangle"), 90);
    setTimeout(() => playTone(783.99, 0.24, 0.08, "triangle"), 180);
}

function playIncorrectAnswerSound() {
    playTone(220, 0.12, 0.08, "sawtooth");
    setTimeout(() => playTone(174.61, 0.18, 0.08, "sawtooth"), 120);
}

function playCurrentMarkedNote() {
    const markedImg = document.getElementById("card" + markedNote + "img");
    if (!markedImg) {
        return;
    }

    const noteName = noteNameFromFileName(markedImg.src);
    playNoteSound(noteName);
}

function playCardNote(card) {
    const img = card.querySelector("img");
    if (!img) {
        return;
    }

    const noteName = noteNameFromFileName(img.src);
    playNoteSound(noteName);
}
