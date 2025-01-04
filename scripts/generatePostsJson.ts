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
const ENV = process.env.NODE_ENV; // set by cross-env in package.json

function generatePostsJson() {
  try {
    if (!fs.existsSync(POSTS_CONTENT_DIR)) {
      console.error(`Posts directory does not exist: ${POSTS_CONTENT_DIR}`);
      return;
    }

    // get all .mdx files in the directory
    const mdxFiles = fs.readdirSync(POSTS_CONTENT_DIR).filter(
      (file) =>
        file.endsWith(".mdx") &&
        // ignore files starting with _ in prod
        (ENV === "production" ? !file.startsWith("_") : true)
    );

    // write to posts.json
    fs.writeFileSync(OUTPUT_FILE, JSON.stringify(mdxFiles, null, 2));
    console.log(`Successfully generated ${OUTPUT_FILE}`);
  } catch (error) {
    console.error("Error generating files.json:", error);
  }
}

generatePostsJson();
