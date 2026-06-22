import ipaData from "./ipa-en-uk.json";
import ingimData from "./ingim.json";

const ipa = ipaData.en_UK[0] as unknown as Record<string, string>;
const ingim = ingimData as unknown as Record<string, string>;

function segment(text: string) {
  return text.replace(/'/g, '').match(/\b\w+\b/g);
}

export function toIPA(text: string) {
  const words = segment(text) ?? [];
  return words.map(w => ipa[w] ?? "baboon");
}

export function toIngim(words: string[]) {
  return words.map(w => [...w].map(c => ingim[c] ?? c).join().replace(/\P{L}|[ˈ'ː]/gu, ''));
}

export function convert(text: string) {
  return toIngim(toIPA(text)).join(" ");
}
