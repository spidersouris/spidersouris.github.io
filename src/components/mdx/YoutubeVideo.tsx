"use client";

import dynamic from "next/dynamic";

// Separate component for the dynamically loaded YouTube embed
const YouTubeWrapper = dynamic(
  () =>
    import("react-lite-youtube-embed").then((mod) => {
      require("react-lite-youtube-embed/dist/LiteYouTubeEmbed.css");
      return mod;
    }),
  {
    ssr: false,
    loading: () => (
      <div className="aspect-video w-full rounded-lg overflow-hidden bg-gray-200" />
    ),
  }
);

interface YoutubeVideoProps {
  id: string;
  title: string;
}

export function YoutubeVideo({ id, title }: YoutubeVideoProps) {
  return (
    <div className="aspect-video w-full rounded-lg overflow-hidden">
      <YouTubeWrapper id={id} title={title} wrapperClass="yt-lite" />
    </div>
  );
}
