// Usage: import { readWord } from './utils/readWord.mjs';
export function readWord(string) {
    console.log(`Reading word: ${string}`);
    const synth = window.speechSynthesis;
    const utterThis = new SpeechSynthesisUtterance(string);
    synth.speak(utterThis);
}