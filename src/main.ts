import './style.css'
import { convert, revert } from './convert.ts'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
<div class="page-container">
  <h1>Ingim Translator</h1>
  <div class="input-box">
    <textarea type="text" placeholder="Write text here" id="input" class="input"></textarea>
  </div>
  <div class="button-container">
  <button id="switch-button" class="switchB">
    <span class="material-symbols-outlined">sync_alt</span>
  </button>
    <button id="translate-button" class="translateB">Translate</button>
    </div>
  <div class="output-box">
    <p id="output" class="output">Rāyt tekst hiə</p>
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
  } else {
    sBtn.style.backgroundColor = '#29383D';
    convertMode = false;
  }
  switchText()
});

function switchText() {
  const temp = output.innerText
  output.innerText = input.value
  input.value = temp
}
