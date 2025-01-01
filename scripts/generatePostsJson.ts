import fs from "fs";
import path from "path";

const POSTS_DIR = path.join(process.cwd(), "public", "data", "posts");
const POSTS_CONTENT_DIR = path.join(
  process.cwd(),
  "public",
  "data",
  "posts",
  "content"
);
const OUTPUT_FILE = path.join(POSTS_DIR, "posts.json");

function generatePostsJson() {
  try {
    if (!fs.existsSync(POSTS_CONTENT_DIR)) {
      console.error(`Posts directory does not exist: ${POSTS_CONTENT_DIR}`);
      return;
    }

    // get all .mdx files in the directory
    const files = fs
      .readdirSync(POSTS_CONTENT_DIR)
      .filter((file) => file.endsWith(".mdx"));

    // write to posts.json
    fs.writeFileSync(OUTPUT_FILE, JSON.stringify(files, null, 2));
    console.log(`Successfully generated ${OUTPUT_FILE}`);
  } catch (error) {
    console.error("Error generating files.json:", error);
  }
}

generatePostsJson();
