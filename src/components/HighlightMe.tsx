export function highlightMe(authors: string[]) {
  const highlightedAuthor = authors
    .map((author) => {
      if (author === "Doyen, E.") {
        return `<strong class="text-accent">${author}</strong>`;
      }
      return author;
    })
    .join(", ");
  return <span dangerouslySetInnerHTML={{ __html: highlightedAuthor }} />;
}
