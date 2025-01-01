"use client";
import { PageIntro } from "@/components/PageIntro";
import PhotoGallery from "@/components/photography/PhotoGallery";
import { usePhotographyStore } from "@/store/PhotographyStore";
import { useEffect } from "react";

import { IconArrowAutofitWidth, IconCamera } from "@tabler/icons-react";

export default function PhotographyPage() {
  const { photos, fetchPhotos } = usePhotographyStore();

  useEffect(() => {
    fetchPhotos();
  }, [fetchPhotos]);

  return (
    <>
      <div className="space-y-8 pb-2">
        <PageIntro
          title="Photography"
          icon={IconCamera}
          blurb={
            <>
              I am by no means a professional photographer, but I enjoy taking
              pictures when I travel or when I see something that catches my
              eye.
              <br />
              <br />
              I am currently learning more about photography theory and I want
              to use this page to expose some of my favorite shots (and,
              hopefully, this will incite me to take more and better pictures!).
              <br />
              <br />
              My current setup is very basic — I am simply using my current
              phone's camera (a Google Pixel 6 Pro) — but I believe that a
              beginner like I am should focus first and foremost on the
              composition and the subject of the picture, rather than on the
              gear.
              <br />
              <br />
              Some of the pictures were edited using Lightroom. Such pictures
              are labelled with{" "}
              <IconArrowAutofitWidth size={20} className="inline" />.
              <br />
              Click on a picture to view an enlarged version and the picture
              metadata, and use the before/after editing slider.
            </>
          }
        />
      </div>
      <hr className="border-gray-200 dark:border-gray-800 p-2" />
      <PhotoGallery initialPhotos={photos} />
    </>
  );
}
