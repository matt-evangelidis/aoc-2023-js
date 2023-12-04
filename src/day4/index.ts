import {parseInput} from "~/utils/parseInput.js";

async function part1() {
  const input = await parseInput('resources/day4/input.txt');

  const cards = input.map(
    card => card.split(':')[1]?.split('|')
  );

  const winningNumbers = cards
    .flat()
    .filter((_, index) => index % 2 == 0)
    .map(line => line?.split(" ").filter(num => num !== '').map(num => Number(num)));
  const playerNumbers = cards
    .flat()
    .filter((_, index) => index % 2 !== 0)
    .map(line => line?.split(' ').filter(num => num !== '').map(num => Number(num)));

  let sum = 0
  for (let i = 0; i < cards.length; i++) {
    const numbers = playerNumbers[i] as number[];
    const winners = winningNumbers[i] as number[];
    const matchingNumbers = getMatchingNumbers(numbers, winners);

    let toAdd = matchingNumbers.length > 0 ? 1 : 0;
    if (matchingNumbers.length > 1) {
        for (let j = 0; j < matchingNumbers.length - 1; j++) {
          toAdd *= 2;
        }
    }
    sum += toAdd;
  }

  console.log(sum);
}

function getMatchingNumbers(array1: number[], array2: number[]): number[] {
  return array1.filter(num => array2.includes(num));
}

part1();