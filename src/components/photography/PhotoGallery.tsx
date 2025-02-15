"use client";

import { useState, JSX } from "react";

import Lightbox, { RenderSlideFooterProps } from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Download from "yet-another-react-lightbox/plugins/download";

import Image from "next/image";
import {
  ColumnsPhotoAlbum,
  Photo,
  RenderImageContext,
  RenderImageProps,
  RowsPhotoAlbum,
} from "react-photo-album";
import {
  ReactCompareSlider,
  ReactCompareSliderImage,
} from "react-compare-slider";
import "react-photo-album/rows.css";
import "react-photo-album/columns.css";

import {
  IconCamera,
  IconAperture,
  IconPhotoSensor3,
  IconBoltFilled,
} from "@tabler/icons-react";

import "yet-another-react-lightbox/plugins/captions.css";

interface PhotoMetadata {
  camera?: string;
  lens?: string;
  aperture?: string;
  shutterSpeed?: string;
  iso?: string;
  focalLength?: string;
}

interface ExtendedPhoto extends Photo {
  description: string;
  location: string;
  metadata?: PhotoMetadata;
  og?: string;
}

import { RenderSlideProps, SlideImage } from "yet-another-react-lightbox";
import { IconArrowAutofitWidth } from "@tabler/icons-react";
import { CustomIcon } from "../CustomIcon";
import { MapPin } from "@phosphor-icons/react";

// Custom slide component for the lightbox
const CustomSlide = ({ slide }: RenderSlideProps<SlideImage>) => {
  // Cast the slide to our ExtendedPhoto type
  const extendedSlide = slide as unknown as ExtendedPhoto;

  if (!extendedSlide.og) {
    return (
      <img
        src={slide.src}
        alt={slide.alt || ""}
        style={{ width: "100%", height: "100%", objectFit: "contain" }}
      />
    );
  }

  const [labelOpacity, setLabelOpacity] = useState(1);

  return (
    <div
      className="relative w-full h-full"
      // disable yarn lightbox swipe events to allow comparison slider
      onPointerDown={(e) => e.stopPropagation()}
    >
      <div
        className="absolute lg:top-4 top-8 left-4 bg-black/50 px-3 py-1 rounded-full text-white text-sm z-10 transition-opacity duration-200"
        style={{ opacity: labelOpacity }}
      >
        Edited
      </div>
      <div
        className="absolute lg:top-4 top-8 right-4 bg-black/50 px-3 py-1 rounded-full text-white text-sm z-10 transition-opacity duration-200"
        style={{ opacity: labelOpacity }}
      >
        Original
      </div>
      <ReactCompareSlider
        itemOne={
          <ReactCompareSliderImage
            src={slide.src}
            alt={slide.alt || "Edited photo"}
          />
        }
        itemTwo={
          <ReactCompareSliderImage
            src={extendedSlide.og}
            alt="Original photo"
          />
        }
        style={{ width: "100%", height: "100%" }}
        position={50}
        onPointerDown={() => setLabelOpacity(0)}
        onPointerUp={() => setLabelOpacity(1)}
      />
    </div>
  );
};

const CustomCaption = ({ slide }: RenderSlideFooterProps) => {
  const extendedSlide = slide as unknown as ExtendedPhoto;

  let metadataIcons: Record<string, JSX.Element> = {};

  if (extendedSlide.metadata) {
    metadataIcons = {
      camera: <IconCamera className="inline" />,
      aperture: <IconAperture className="inline" />,
      lens: <IconPhotoSensor3 className="inline" />,
      shutterSpeed: <IconBoltFilled className="inline" />,
      iso: (
        <span className="inline text-xs font-bold lg:ml-0.5 lg:mr-1">ISO</span>
      ),
    };
  }

  return (
    <div
      className="flex lg:flex-col lg:relative lg:gap-2 lg:justify-center lg:h-full lg:max-w-52 lg:p-4 lg:pr-8 select-text max-w-none h-fit absolute bottom-0 bg-black bg-opacity-80 p-4 rounded-lg"
      // prevent propagation of pointer events to the lightbox,
      // which would cause swipe events to be registered
      // we still need to define select-text to allow text selection though
      onPointerDown={(e) => e.stopPropagation()}
    >
      <div className="flex flex-row">
        <p>{extendedSlide.description}</p>
      </div>
      <div>
        <span className="text-sm text-gray-300">
          <MapPin className="inline relative bottom-0.5" size={20} />{" "}
          {extendedSlide.location}
        </span>
      </div>
      {extendedSlide.metadata && (
        <div className="flex lg:flex-col flex-row text-sm text-gray-300 items-start gap-1">
          {Object.entries(extendedSlide.metadata).map(([key, value]) => (
            <p key={key} className="">
              {metadataIcons[key as keyof typeof metadataIcons]} {value}
            </p>
          ))}
        </div>
      )}
    </div>
  );
};

function renderNextImage(
  { alt = "", title, sizes }: RenderImageProps,
  { photo, width, height }: RenderImageContext
) {
  return (
    <div
      style={{
        width: "100%",
        position: "relative",
        aspectRatio: `${width} / ${height}`,
        // fixes scrolling on mobile selecting the image
        touchAction: "pan-y",
        userSelect: "none",
      }}
    >
      <Image
        fill
        key={photo.src}
        src={photo.src}
        alt={alt}
        title={title}
        sizes={sizes}
        placeholder={"blurDataURL" in photo ? "blur" : undefined}
        className="photography-image"
        quality={100}
        unoptimized={true}
        // disable drag
        draggable={false}
        style={{ userSelect: "none" }}
      />
      {(photo as ExtendedPhoto).og && (
        <div className="absolute top-2 right-2 text-white px-2 py-1 rounded text-sm bg-black bg-opacity-50">
          <CustomIcon
            icon={IconArrowAutofitWidth}
            label={`Comparison\navailable`}
          />
        </div>
      )}
    </div>
  );
}

export default function PhotoGallery({
  initialPhotos,
}: {
  initialPhotos: Photo[];
}) {
  const [lightboxPhoto, setLightboxPhoto] = useState<Photo>();

  return (
    <>
      <ColumnsPhotoAlbum
        photos={initialPhotos}
        render={{ image: renderNextImage }}
        columns={1}
        defaultContainerWidth={1600}
        onClick={({ event, photo }) => {
          // let a link open in a new tab / new window / download
          if (event.shiftKey || event.altKey || event.metaKey) return;

          // prevent the default link behavior
          event.preventDefault();

          // open photo in a lightbox
          setLightboxPhoto(photo as ExtendedPhoto);
        }}
        // describe photo album size in different viewports
        sizes={{
          size: "100vw",
          sizes: [
            { viewport: "(max-width: 1920px)", size: "calc(100vw - 32px)" },
          ],
        }}
        // re-calculate the layout only at specific breakpoints
        breakpoints={[220, 360, 480, 600, 900, 1200, 1800]}
      />

      <Lightbox
        open={Boolean(lightboxPhoto)}
        close={() => setLightboxPhoto(undefined)}
        slides={initialPhotos}
        index={initialPhotos.findIndex((photo) => photo === lightboxPhoto)}
        carousel={{ finite: true }}
        styles={{ root: { "--yarl__color_backdrop": "rgba(0, 0, 0, .8)" } }}
        controller={{
          closeOnBackdropClick: true,
          closeOnPullUp: false,
          closeOnPullDown: false,
        }}
        plugins={[Fullscreen, Download]}
        render={{ slide: CustomSlide, slideFooter: CustomCaption }}
      />
    </>
  );
}
