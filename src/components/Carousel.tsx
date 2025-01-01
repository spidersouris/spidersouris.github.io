import React from "react";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";

const Carousel = ({
  slides,
}: {
  slides: {
    src: string;
    alt: string;
    title: string;
    description: string;
    link: string;
  }[];
}) => {
  const [emblaRef] = useEmblaCarousel();

  return (
    <div className="embla" ref={emblaRef}>
      <div className="embla__container">
        {slides.map((slide, index) => (
          <div className="embla__slide" key={index}>
            <Image
              src={slide.src}
              alt={slide.alt}
              layout="fill"
              className="object-cover"
            />
            <div className="embla__slide__caption">
              <h4>{slide.title}</h4>
              <p>{slide.description}</p>
              <a href={slide.link} target="_blank" rel="noopener noreferrer">
                Learn more
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
