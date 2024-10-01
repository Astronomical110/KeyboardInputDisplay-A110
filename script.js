const pressedKeys = new Set();

document.addEventListener('keydown', (event) => {
    const key = event.key.toLowerCase();
    if (!pressedKeys.has(key)) {
        pressedKeys.add(key);
        updatePressedKeys();
        speakKey(key); // Call the TTS function when a key is pressed
    }
});

document.addEventListener('keyup', (event) => {
    const key = event.key.toLowerCase();
    if (pressedKeys.has(key)) {
        pressedKeys.delete(key);
        updatePressedKeys();
    }
});

// Function to update the display of pressed keys
function updatePressedKeys() {
    const elements = document.querySelectorAll('.key');
    elements.forEach(element => {
        const elementKey = element.textContent.toLowerCase();
        if (pressedKeys.has(elementKey) || 
            (elementKey === 'space' && pressedKeys.has(' ')) || 
            (elementKey === 'ctrl' && (pressedKeys.has('control') || pressedKeys.has('ctrl'))) || 
            (elementKey === '~' && pressedKeys.has('`')) || 
            (elementKey === 'alt' && pressedKeys.has('alt'))) {
            element.classList.add('pressed');
        } else {
            element.classList.remove('pressed');
        }
    });
}

// Text-to-Speech function
function speakKey(key) {
    // Cancel any ongoing speech before starting a new one
    speechSynthesis.cancel();
    
    let utterance;

    // Handle special cases for readable speech
    if (key === ' ') {
        utterance = new SpeechSynthesisUtterance('space');
    } else if (key === 'enter') {
        utterance = new SpeechSynthesisUtterance('enter');
    } else if (key === 'backspace') {
        utterance = new SpeechSynthesisUtterance('backspace');
    } else if (key === 'control') {
        utterance = new SpeechSynthesisUtterance('control');
    } else if (key === 'shift') {
        utterance = new SpeechSynthesisUtterance('shift');
    } else {
        // If it's a regular letter or number, speak it as-is
        utterance = new SpeechSynthesisUtterance(key);
    }

    // Set voice properties (optional)
    utterance.rate = 1;  // Adjust the speed
    utterance.pitch = 1; // Adjust the pitch
    
    // Speak the key
    speechSynthesis.speak(utterance);
}
