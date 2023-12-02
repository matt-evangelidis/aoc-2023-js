import promises from "fs/promises";
import path from "path";

const digitsAsWords = [
    'one',
    'two',
    'three',
    'four',
    'five',
    'six',
    'seven',
    'eight',
    'nine',
] as const;

const digitMap: Record<typeof digitsAsWords[number], number> = {
    one: 1,
    two: 2,
    three: 3,
    four: 4,
    five: 5,
    six: 6,
    seven: 7,
    eight: 8,
    nine: 9,
}

function getValueFromLine(line: string): number {
    let first = 0;
    let second = 0;
    for (let i = 0; i < line.length; i++) {
        if (Number(line[i])) {
            first = i;
            break;
        }
    }
    for (let i = line.length - 1; i > 0; i--) {
        if (Number(line[i])) {
            second = i;
            break;
        }
    }

    return Number(`${line[first]}${line[second]}`);
}
async function day1() {
    const input = (await promises.readFile(path.resolve('resources/day1/input1.txt'), 'utf8'));

    const array = input.split(/\r?\n/);
    let sum = 0;
    array.forEach((line) => {
        sum += getValueFromLine(line);
    })
    console.log(sum);
}

async function day2() {
    const input = (await promises.readFile(path.resolve('resources/day1/input1.txt'), 'utf8'));
    const array = input.split(/\r?\n/);

    let sum = 0;
    for (let i = 0; i < array.length; i++) {
        const normalValues = getNormalValuesFromLine(array[i] ?? '');
        const wordValues = getValuesByWordsFromLine(array[i] ?? '');
        if (normalValues.length < 1 && wordValues.length < 1) {
            continue;
        }

        const result = [...normalValues, ...wordValues].sort(sortValuesByIndex);
        let num = 0;
        if (result.length == 1) {
            num = Number(`${result[0]?.value}${result[0]?.value}`);
        } else {
            num = Number(`${result[0]?.value}${result[result.length - 1]?.value}`)
        }
        sum += num;
    }
    console.log(sum);
}
function sortValuesByIndex(a: {value: number, index: number}, b: {value: number, index: number}) {
    if (a.index < b.index) {
        return -1;
    }
    if (a.index > b.index) {
        return 1;
    }
    return 0;
}

function getValuesByWordsFromLine(line: string): {value: number, index: number }[] {
    const result: {value: number, index: number}[] = [];
    for (const digit of digitsAsWords) {
        const matches = [...line.matchAll(new RegExp(digit, 'gi'))].map(
          match => ({value: digitMap[digit], index: match.index})
        )
        if (matches.length > 0) {
            //@ts-ignore
            matches.forEach(match => result.push(match));
        }
    }
    return result;
}

function getNormalValuesFromLine(line: string): {value: number, index: number}[] {
    const result: {value: number, index: number}[] = [];
    for (let i = 0; i < line.length; i++) {
        const num = Number(line[i])
        if (!Number.isNaN(num)) {
            result.push({value: num, index: i})
        }
    }
    return result;
}