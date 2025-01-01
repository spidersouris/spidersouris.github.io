"use client";

import LiteYouTubeEmbed from "react-lite-youtube-embed";
import "react-lite-youtube-embed/dist/LiteYouTubeEmbed.css";

interface YoutubeVideoProps {
  id: string;
  title: string;
}

export function YoutubeVideo({ id, title }: YoutubeVideoProps) {
  return (
    <div className="aspect-video w-full rounded-lg overflow-hidden">
      <LiteYouTubeEmbed id={id} title={title} wrapperClass="yt-lite" />
    </div>
  );
}
