import { parse } from "yaml";

export async function fetchYamlData(filename: string) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/data/yaml/${filename}`
      //`http://localhost:3000/data/yaml/${filename}`
    );
    if (!response.ok) return [];
    return parse(await response.text());
  } catch (error) {
    console.error(`Error fetching ${filename}:`, error);
    return [];
  }
}

export async function fetchMdxFile(filepath: string): Promise<string | null> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/data/${filepath}`
      //`http://localhost:3000/data/${filepath}`
    );
    if (!response.ok) {
      console.error(`Failed to fetch ${filepath}: ${response.statusText}`);
      return null;
    }
    return await response.text();
  } catch (error) {
    console.error(`Error fetching ${filepath}:`, error);
    return null;
  }
}
