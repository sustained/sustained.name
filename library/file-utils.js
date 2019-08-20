import { promises } from "fs";
import { resolve } from "path";
const { readdir } = promises;

export async function getDirectory(...pathComponents) {
  try {
    const files = await readdir(resolve(...pathComponents));

    return files;
  } catch (e) {
    console.error(e);

    return [];
  }
}
