import './style.css'


document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
<h1>Ingim Text Converter</h1>
<div class="box">
  <div class="input-box">
    <h2>Input:</h2>
    <textarea type="text" placeholder="Example" id="input" class="input"></textarea>
  </div>
  <div class="output-box">
    <h2>Output:</h2>
    <p id="output" class="output"> 
      <span class="original">ex</span>
      <span class="changed">New text added after</span>
  </p>
  </div>
</div>
`


const input = document.getElementById("input") as HTMLInputElement;
const output = document.getElementById("output");

input.addEventListener("input", () => {
  output.textContent = `${input.value}`;
});

const p = document.querySelector('p');
const newSpan = document.createElement('span');
newSpan.classList.add('changed');
newSpan.textContent = ' new text here';
p.appendChild(newSpan);