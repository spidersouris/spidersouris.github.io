# spidersouris.github.io

This repository hosts the source code of my personal static website available at [www.edoyen.com](https://edoyen.com). It was made using:
- [React 19](https://react.dev/),
- [NextJS 15](https://nextjs.org/),
- [TailwindCSS 3](https://tailwindcss.com/),
- [MDX](https://mdxjs.com/),
- [Motion](https://motion.dev/),
- [Yet Another React Lightbox](https://yet-another-react-lightbox.com/) and [React Photo Album](https://react-photo-album.com/) (for the "photography" section),
- [Tabler](https://tabler.io/admin-template) and [Phosphor](https://phosphoricons.com/) icons.

## Run Development Server

`npm run dev`

This will start a development server with port 3888 (`http://localhost:3888`).

## Build

Before building, make sure that the development server is running. This is required to generate the slug pages statically.

`npm run build`

Before starting, make sure to stop the dev server so that the same port (3888) can be used.

`npm run start`

### Scripts

When building, some scripts are ran automatically:
- `scripts/generatePostsJson.ts` creates a `posts.json` file to `public/data/posts.json`, listing all available MDX writings files, which will then be fetched by `src/content/posts.ts`.
- `scripts/getGitHubStars.ts` calls the GitHub API and updates the number of stars for each GitHub project in `public/data/yaml/projects.yaml`.