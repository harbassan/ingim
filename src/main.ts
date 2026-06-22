import './style.css'
import { convert, revert } from './convert.ts'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
<div class="page-container">
  <h1>Ingim Text Converter</h1>
  <div class="input-box">
    <h2>Input:</h2>
    <textarea type="text" placeholder="Example" id="input" class="input"></textarea>
  </div>
  <button id="switch-button" class="switchB">
    <span class="material-symbols-outlined">sync_alt</span>
  </button>
    <button id="translate-button" class="translateB">Translate</button>
  <div class="output-box">
    <h2>Output:</h2>
    <p id="output" class="output">Egzāmpəl</p>
  </div>

</div>
`

const input = document.getElementById("input") as HTMLInputElement;
const output = document.getElementById("output");

const tBtn = document.getElementById("translate-button");
tBtn.addEventListener('click', () => {
  if (convertMode) {
    output.textContent = `${convert(input.value)}`;
  } else {
    output.textContent = `${revert(input.value)}`;
  }
});

const sBtn = document.getElementById("switch-button")
let convertMode = true;
sBtn.addEventListener('click', () => {
  if (!convertMode) {
    sBtn.style.backgroundColor = '';
    convertMode = true;
    console.log(convertMode)
  } else {
    sBtn.style.backgroundColor = 'red';
    convertMode = false;
    console.log(convertMode)
  }
});

window.convert = convert;
window.revert = revert;
