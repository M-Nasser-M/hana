"use client";
import { AspectRatio, Box, Button } from "@radix-ui/themes";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Image } from "@/lib/types/sharedTypes";
import { useHydrateAtoms } from "jotai/utils";
import React, { ReactNode, useCallback, useRef, useState } from "react";
import { atom, useAtom } from "jotai";
import NextImage from "next/image";
import Glider from "react-glider";

import "glider-js/glider.min.css";

type Props = { images: Image[] | [] | null | undefined; cover: Image };

const GliderContainer = ({ children }: { children: ReactNode }) => {
  return <Box className="glider-contain  p-2">{children}</Box>;
};

const defaultImage: Image = {
  width: 0,
  height: 0,
  url: "",
  placeholder: "",
  formats: {},
};

const currentImageAtom = atom<Image>(defaultImage);

const Carousel = ({ images, cover }: Props) => {
  useHydrateAtoms([[currentImageAtom, cover]]);
  const [currentImage, setCurrentImage] = useAtom(currentImageAtom);
  const previousButton = useRef<HTMLButtonElement | null>(null);
  const nextButton = useRef<HTMLButtonElement | null>(null);
  const [isReady, setIsReady] = useState(false);
  const previousButtonCallbackRef = useCallback(
    (element: HTMLButtonElement | null) => {
      previousButton.current = element;
      setIsReady(Boolean(previousButton.current && nextButton.current));
    },
    []
  );

  const nextButtonCallbackRef = useCallback(
    (element: HTMLButtonElement | null) => {
      nextButton.current = element;
      setIsReady(Boolean(previousButton.current && nextButton.current));
    },
    []
  );
  return (
    <Box p="4" className="md:w-2/3">
      <AspectRatio>
        <NextImage
          src={currentImage.url}
          alt={currentImage.alternativeText || ""}
          fill
          placeholder="blur"
          blurDataURL={currentImage.placeholder}
        />
      </AspectRatio>
      <Box position="relative">
        {images && images.length > 0 && isReady && (
          <Glider
            className="glider"
            containerElement={GliderContainer}
            hasArrows
            arrows={{ next: nextButton.current, prev: previousButton.current }}
            slidesToShow={2}
            slidesToScroll={1}
            responsive={[
              { breakpoint: 1280, settings: { slidesToShow: 3 } },
              { breakpoint: 768, settings: { slidesToShow: 2 } },
              { breakpoint: 0, settings: { slidesToShow: 1 } },
            ]}
            skipTrack
          >
            <Box className="glider-track">
              {images.map((image) => (
                <NextImage
                  key={image.id}
                  className="cursor-pointer"
                  src={image.formats.medium?.url || ""}
                  alt={image.alternativeText || ""}
                  height={image.formats.medium?.height || 0}
                  width={image.formats.medium?.width || 0}
                  placeholder="blur"
                  blurDataURL={image.placeholder}
                  onClick={() => setCurrentImage(image)}
                />
              ))}
            </Box>
          </Glider>
        )}
        <Button
          ref={previousButtonCallbackRef}
          variant="ghost"
          className="absolute top-[50%] left-4"
          aria-label="Previous"
        >
          <ChevronLeft size={32} />
        </Button>
        <Button
          ref={nextButtonCallbackRef}
          variant="ghost"
          className="absolute top-[50%] right-4"
          aria-label="next"
        >
          <ChevronRight size={32} />
        </Button>
      </Box>
    </Box>
  );
};

export default Carousel;
