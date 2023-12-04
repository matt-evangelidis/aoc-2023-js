import {parseInput} from "~/utils/parseInput.js";

const matchNumberExp = /[0-9]\w+/;
const matchSymbolExp = /[^0-9.]/

function getAdjacencyShadow(match: RegExpMatchArray, line: string): string {
  const [start, end] = match.indices?.[0] as [number, number];

  return line.substring(
    match.index === 0 ? start : start - 1,
    match.index === line.length - 1 ? end : end + 1
  );
}

function hasQualifyingSymbol(line: string): boolean {
  return line.search(new RegExp(matchSymbolExp, 'g')) !== -1;
}

async function part1() {
  const array = await parseInput('resources/day3/sample.txt');
  let sum = 0;
  for (let i = 0; i < array.length; i++) {
    const numbers = (array[i] ?? '').matchAll(new RegExp(matchNumberExp, 'dg'))
    for (const number of numbers) {
      const hasAdjacentSymbol = hasQualifyingSymbol(getAdjacencyShadow(number, array[i] ?? ''))
        || hasQualifyingSymbol(getAdjacencyShadow(number, array[i - 1] ?? ''))
        || hasQualifyingSymbol(getAdjacencyShadow(number, array[i + 1] ?? ''));

      if (hasAdjacentSymbol) {
        console.log(number[0]);
        sum += Number(number[0]);
      }
    }
  }
  console.log(sum);
}

part1();