import { parse } from "yaml";

export async function fetchYamlData(filename: string) {
  try {
    const fetchOptions = {
      headers: {
        "Content-Type": "text/yaml",
        Origin: "https://edoyen.com/",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers":
          "Origin, X-Requested-With, Content-Type, Accept",
      },
    };
    const response = await fetch(
      //"/data/yaml/" + filename
      `${process.env.NEXT_PUBLIC_BASE_URL}/data/yaml/${filename}`,
      //`http://localhost:3000/data/yaml/${filename}`
      fetchOptions
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
    const fetchOptions = {
      headers: {
        "Content-Type": "text/markdown",
        Origin: "https://edoyen.com/",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers":
          "Origin, X-Requested-With, Content-Type, Accept",
      },
    };
    const response = await fetch(
      //"/data/" + filepath
      `${process.env.NEXT_PUBLIC_BASE_URL}/data/${filepath}`,
      //`http://localhost:3000/data/${filepath}`
      fetchOptions
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
