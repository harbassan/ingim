import './style.css'
import { convert, revert } from './convert.ts'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
<div class="page-container">
  <h1>Ingim Translator</h1>
  <div class="input-box">
    <textarea type="text" placeholder="Write text here..." id="input" class="input"></textarea>
  </div>
  <div class="button-container">
    <button id="switch-button" class="switchB">
      <span class="material-symbols-outlined">sync_alt</span>
    </button>
    <button id="translate-button" class="translateB">Translate</button>
  </div>
  <div class="output-box">
    <p id="output" class="output placeholder">Translation</p>
  </div>
  <div class="header">
    <h2>What is Ingim?</h2>
    <span class="muted">Wot iz Ingim?</span>
  </div>
  <p>English spelling is notoriously inconsistent, which makes it difficult for learners and even native speakers spelling words and predicting pronunciation. Ingim is a writing system for the English language which intends to solve this problem, by standardising how we write words using a phonemic alphabet. Simply put, this means every sound is represented by a single letter or pair of letters. The name Ingim comes from (Eng)lish (im)proved, written in Ingim itself. It's still a work in progress, created by Hartej Bassan.</p>
  <p class="muted">Ingliʃ speling iz nəwtáriəslī inkənsistənt, wic meyks it difikəlt fá lənəz and īvən neytiv spīkəz speling wədz and pridikting prənunsieyʃən. Ingim iz ə rāyting sistəm fá þə Ingliʃ langwij wic intendz tū solv þis probləm, bāy standədāyzing haw wī rāyt wədz yūzing ə fonīmik alfəbet. Simplī pōt, þis mīnz evrī sawnd iz reprəsentid bāy ə singəl letə á pe ov letəz. Þə neym Ingim kumz from (Ing)liʃ (im)prūvd, ritən in Ingim itself. Its stil ə wək in prəwgres, krīeytid bāy Hurtej Busən.</p>
  <p>The current version of Ingim is based on RP (Received Pronunciation), which means that Ingim will be easier to understand for those who speak in a similar way. Future versions will incorporate elements of US pronunciation to create a system that works for all of the english speaking world.</p>
  <p class="muted">Þə kurənt vəʃən ov Ingim iz beyst on RP (Risīvd Prənunsīeyʃən), wic mīnz þat Ingim wil bī īziə tū undəstand fá þəwz hū spīk in ə similə wey. Fyūcə vəʃənz wil inkápəreyt elimənts ov US prənunsieyʃən tū krīeyt ə sistəm þat wəks fá ál ov þə ingliʃ spīking wəld.</p>
  <div class="header">
    <h2>Translator Note</h2>
    <span class="muted">Transleytə Nəwt</span>
  </div>
  <p>This translator is a very simple implementation, and therefore is unable to correctly parse homographs. It also doesn't contain a comprehensive dictionary for all 100,000+ words of the English language, and in cases where a match can't be found will output "baboon".</p>
  <p class="muted">Þis transleytə iz ə verī simpəl implimənteyʃən, and þefá iz uneybəl tū kərektlī pās həwməwgrāfs. It olsəw duzn't kənteyn ə komprihensiv dikʃənərī fá ál 100,000+ wədz ov þə Ingliʃ langwij, and in keysiz we ə mac kānt bī fawnd wil awtpōt "babūn".</p>
</div>
`

const input = document.getElementById("input") as HTMLInputElement;
const output = document.getElementById("output") as HTMLParagraphElement;

const translateBtn = document.getElementById("translate-button") as HTMLButtonElement;
const switchBtn = document.getElementById("switch-button") as HTMLButtonElement;

let convertMode = true;

translateBtn.addEventListener('click', () => {
  const fn = convertMode ? convert : revert;
  output.textContent = `${fn(input.value)}`;
  if (output.textContent && output.classList.contains("placeholder")) {
    output.classList.remove("placeholder");
  } else if (!output.textContent) {
    output.classList.add("placeholder");
    output.textContent = "Translation";
  }
});

switchBtn.addEventListener('click', () => {
  convertMode = !convertMode;
  switchBtn.classList.toggle("active")
  switchText()
});

function switchText() {
  const temp = output.innerText
  output.innerText = input.value
  input.value = temp
};
