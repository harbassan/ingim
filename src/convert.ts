import ipaData from "./ipa-en-uk.json";
import ingimData from "./ingim.json";

const ipa = ipaData.en_UK[0] as unknown as Record<string, string>;
const ingim = ingimData as unknown as Record<string, string>;

const ingimReverse = Object.fromEntries(
  Object.entries(ingim)
    .reverse()
    .map(([ipa, ing]) => [ing, ipa])
);
const ipaReverse = Object.fromEntries(
  Object.entries(ipa).map(([base, ipa]) => [sanitiseIpa(ipa), base])
);

interface SanitisedWord {
  wordIndex: number;
  word: string;
  leading: string | null;
  trailing: string | null;
  uppercase: boolean;
}

function sanitise(text: string): SanitisedWord[] {
  const words = text.split(/\s+/);

  return words.map((word, index) => ({
    wordIndex: index,
    word: word.replace(/[^\w]/g, '').toLowerCase(),
    leading: word.match(/^[^\w]+/)?.[0] ?? null,
    trailing: word.match(/[^\w]+$/)?.[0] ?? null,
    uppercase: /^\W*[A-Z]/.test(word),
  }));
}

function sanitiseIpa(word: string) {
  return word?.replace(/\P{L}|[ˈ'ːˌ]|\u200D/gu, "");
}

export function baseToIpa(text: string[]) {
  return text.map(w => sanitiseIpa(ipa[w]) ?? "baboon");
}

export function ipaToBase(text: string[]) {
  return text.map(w => ipaReverse[w] ?? "baboon");
}


export function ipaToIngim(text: string[]) {
  return text.map(w => {
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
    return result.join('');
  });
}

// NOTE: inaccurate given multiple ipa chars map to a single ingim char
export function ingimToIpa(text: string[]) {
  return text.map(w => {
    const chars = [...w];
    const result: string[] = [];
    let i = 0;
    while (i < chars.length) {
      const two = chars[i] + (chars[i + 1] ?? '');
      if (ingimReverse[two] !== undefined) {
        result.push(ingimReverse[two]);
        i += 2;
      } else {
        result.push(ingimReverse[chars[i]] ?? chars[i]);
        i++;
      }
    }
    return result.join('');
  });
}

<<<<<<< HEAD
// export function revert(text: string) {

// }
=======
export function convert(base: string) {
  const sanitised = sanitise(base);
  const converted = ipaToIngim(baseToIpa(sanitised.map(s => s.word)));

  const output = converted.map((word, i) => {
    const { leading, trailing, uppercase } = sanitised[i];
    const cased = uppercase ? word[0].toUpperCase() + word.slice(1) : word;
    return `${leading ?? ""}${cased}${trailing ?? ""}`;
  });

  return output.join(" ");
}

export function revert(converted: string) {
  const sanitised = sanitise(converted);
  const base = ipaToBase(ingimToIpa(sanitised.map(s => s.word)));

  const output = base.map((word, i) => {
    const { leading, trailing, uppercase } = sanitised[i];
    const cased = uppercase ? word[0].toUpperCase() + word.slice(1) : word;
    return `${leading ?? ""}${cased}${trailing ?? ""}`;
  });

  return output.join(" ");
}
>>>>>>> d8f9bc5905a299df6a4fb80155ba78ad95eafc08
