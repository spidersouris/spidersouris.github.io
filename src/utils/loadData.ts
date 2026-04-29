import { promises as fs } from "node:fs";
import path from "node:path";
import { parse } from "yaml";

const DATA_DIR = path.join(process.cwd(), "public", "data");

export async function loadYaml<T = unknown>(filename: string): Promise<T> {
  try {
    const file = await fs.readFile(
      path.join(DATA_DIR, "yaml", filename),
      "utf8",
    );
    return parse(file) as T;
  } catch (err) {
    console.error(`Error loading yaml/${filename}:`, err);
    return [] as unknown as T;
  }
}

export async function loadDataFile(
  relativePath: string,
): Promise<string | null> {
  try {
    return await fs.readFile(path.join(DATA_DIR, relativePath), "utf8");
  } catch (err) {
    console.error(`Error loading ${relativePath}:`, err);
    return null;
  }
}

export async function loadJson<T = unknown>(
  relativePath: string,
): Promise<T | null> {
  const text = await loadDataFile(relativePath);
  if (text === null) return null;
  try {
    return JSON.parse(text) as T;
  } catch (err) {
    console.error(`Error parsing JSON ${relativePath}:`, err);
    return null;
  }
}
