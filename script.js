const textInput = document.getElementById("textInput");
const voiceSelect = document.getElementById("voiceSelect");
const rateInput = document.getElementById("rate");
const pitchInput = document.getElementById("pitch");
const speakBtn = document.getElementById("speakBtn");
const stopBtn = document.getElementById("stopBtn");
const rateValue = document.getElementById("rateValue");
const pitchValue = document.getElementById("pitchValue");

const synth = window.speechSynthesis;
let voices = [];

function populateVoices() {
  voices = synth.getVoices();
  voiceSelect.innerHTML = "";

  if (voices.length === 0) {
    voiceSelect.innerHTML = "<option>No voices available</option>";
    return;
  }

  voices.forEach((voice, index) => {
    const option = document.createElement("option");
    option.value = index;
    option.textContent = `${voice.name} (${voice.lang})`;
    if (voice.default) option.textContent += " — DEFAULT";
    voiceSelect.appendChild(option);
  });
}

populateVoices();
if (speechSynthesis.onvoiceschanged !== undefined) {
  speechSynthesis.onvoiceschanged = populateVoices;
}

let utterance;

function speakText() {
  const text = textInput.value.trim();
  if (!text || voices.length === 0) return;

  if (synth.speaking) synth.cancel();

  utterance = new SpeechSynthesisUtterance(text);
  const selectedVoice = voices[voiceSelect.value];
  if (selectedVoice) utterance.voice = selectedVoice;
  utterance.rate = parseFloat(rateInput.value);
  utterance.pitch = parseFloat(pitchInput.value);
  synth.speak(utterance);
}

function stopSpeaking() {
  if (synth.speaking) {
    synth.cancel();
  }
}

speakBtn.addEventListener("click", speakText);
stopBtn.addEventListener("click", stopSpeaking);

rateInput.addEventListener("input", () => {
  rateValue.textContent = rateInput.value;
});

pitchInput.addEventListener("input", () => {
  pitchValue.textContent = pitchInput.value;
});

voiceSelect.addEventListener("change", () => {
  if (synth.speaking) {
    speakText(); // Restart with new voice
  }
});
