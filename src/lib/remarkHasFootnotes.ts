import { visit } from "unist-util-visit";

export default function remarkHasFootnotes() {
  return (tree: any) => {
    let hasFootnotes = false;

    visit(tree, "mdxJsxTextElement", (node) => {
      if (node.name === "Footnote") {
        hasFootnotes = true;
        return;
      }
    });

    return hasFootnotes;
  };
}
