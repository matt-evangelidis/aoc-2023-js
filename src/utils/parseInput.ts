import promises from "fs/promises";
import path from "path";

export async function parseInput(resourcePath: string): Promise<string[]> {
  const input = (await promises.readFile(path.resolve(resourcePath), 'utf8'));

  return input.split(/\r?\n/);
}