import './style.css'
import { convert } from './convert.ts'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
<h1>Ingim Text Converter</h1>
<div class="box">
  <div class="input-box">
    <h2>Input:</h2>
    <textarea type="text" placeholder="Example" id="input" class="input"></textarea>
  </div>
  <div class="output-box">
    <h2>Output:</h2>
    <p id="output" class="output">Egzāmpəl</p>
  </div>
</div>
<button>Translate</button>
`


const input = document.getElementById("input") as HTMLInputElement;
const output = document.getElementById("output");

const btn = document.querySelector('button');
btn.addEventListener('click', () => {
  output.textContent = `${convert(input.value)}`;
});



window.convert = convert;
