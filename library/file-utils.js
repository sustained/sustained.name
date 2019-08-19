import { promises } from "fs";
const { readdir } = promises;

export async function getDirectory(path) {
  try {
    const files = await readdir(path);

    return files;
  } catch (e) {
    console.error(e);

    return [];
  }
}
