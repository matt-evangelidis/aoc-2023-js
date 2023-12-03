import {parseInput} from "~/utils/parseInput.js";
import {isNonEmptyArray} from "~/utils/isNonEmptyArray.js";

const colors = ['red', 'green', 'blue'] as const;

type Color = typeof colors[number];
const totalCubesMap: Record<Color, number> = {
  red: 12,
  green: 13,
  blue: 14,
}

function parseRound(round: string): {color: Color, value: number}[] {
  const result: {color: string, value: number}[] = [];
  const splits = round.split(',');

  for (let i = 0; i < splits.length; i++) {
    const color = colors.find(color => (splits[i] ?? '').includes(color));
    if (color !== undefined) {
      const value = (splits[i] ?? '').split(` ${color}`);
      result.push({color, value: Number(value[0])});
    }
  }

  // @ts-ignore
  return result;
}

async function part1() {
  const array = await parseInput('resources/day2/input1.txt');

  let sum = 0;
  for (let i = 0; i < array.length; i++) {
    const splitLine = array[i]?.split(';');
    if (isNonEmptyArray(splitLine)) {
      const [gameId, roundOne] = splitLine[0]?.split(':') ?? [];
      const rounds = [roundOne, ...splitLine.slice(1)]
        .map(round => parseRound(round ?? ''))
        .flat();
      if (rounds.every(({color, value}) => value <= totalCubesMap[color])) {
        const toAdd = Number(gameId?.substring(('Game ').length));
        console.log(toAdd)
        sum += toAdd;
      }
    }
  }
}

async function part2() {
  // find the minimum possible number of cubes of each colour needed to make the game possible
  // iterate through the game, raising the maximums of each colour as new higher values become available
  // multiply the total of each colour per game
  // sum each line's total

  const array = await parseInput('resources/day2/input1.txt');
  let sum = 0;
  for (let i = 0; i < array.length; i++) {
    const splitLine = array[i]?.split(';');
    if (isNonEmptyArray(splitLine)) {
      const [_, roundOne] = splitLine[0]?.split(':') ?? [];
      const rounds = [roundOne, ...splitLine.slice(1)]
        .map(round => parseRound(round ?? ''))
        .flat();

      const colors: Record<Color, number> = {
        red: 0,
        green: 0,
        blue: 0,
      }

      rounds.forEach(({color, value}) => {
        if (colors[color] < value) {
          colors[color] = value;
        }
      });
      console.log(colors);
      sum += (colors.red * colors.blue * colors.green);
    }

    console.log(sum);
  }
}

part2();