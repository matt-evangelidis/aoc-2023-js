import promises from "fs/promises";
import path from "path";

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
async function main() {
    const input = (await promises.readFile(path.resolve('resources/day1/input1.txt'), 'utf8'));

    const array = input.split(/\r?\n/);
    let sum = 0;
    array.forEach((line) => {
        sum += getValueFromLine(line);
    })
    console.log(sum);
}

main();