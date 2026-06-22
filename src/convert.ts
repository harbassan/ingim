import ipaData from "./ipa-en-uk.json";
import ingimData from "./ingim.json";

const ipa = ipaData.en_UK[0] as unknown as Record<string, string>;
const ingim = ingimData as unknown as Record<string, string>;

function segment(text: string) {
  return text.replace(/'/g, '').match(/\b\w+\b/g);
}

export function toIPA(text: string) {
  const words = segment(text) ?? [];
  return words.map(w => ipa[w]?.replace(/\u200D/g, "") ?? "baboon");
}

export function toIngim(words: string[]) {
  return words.map(w => {
    const chars = [...w];
    const result: string[] = [];
    let i = 0;
    while (i < chars.length) {
      const two = chars[i] + (chars[i + 1] ?? '');
      if (ingim[two] !== undefined) {
        result.push(ingim[two]);
        i += 2;
      } else {
        result.push(ingim[chars[i]] ?? chars[i]);
        i++;
      }
    }
    return result.join('').replace(/\P{L}|[ˈ'ːˌ]/gu, '');
  });
}

export function convert(text: string) {
  return toIngim(toIPA(text)).join(" ");
}
