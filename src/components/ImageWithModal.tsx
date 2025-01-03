"use client";

import { IconX } from "@tabler/icons-react";
import React, { useState, useEffect } from "react";

const ImageWithModal = ({ src, alt }: { src: string; alt: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, isMounted]);

  if (!isMounted) {
    return (
      <img
        src={src}
        alt={alt}
        className="cursor-zoom-in hover:opacity-90 transition-opacity"
      />
    );
  }

  return (
    <>
      <img
        src={src}
        alt={alt}
        onClick={() => setIsOpen(true)}
        className="cursor-zoom-in hover:opacity-90 transition-opacity"
      />
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="relative max-w-screen-xl max-h-screen"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsOpen(false)}
              className="absolute -top-8 right-0 text-white hover:text-gray-300"
            >
              <IconX size={32} />
            </button>
            <img
              src={src}
              alt={alt}
              className="max-h-[90vh] max-w-full object-contain"
            />
            {alt && (
              <div className="absolute bottom-0 w-full text-gray-100 text-center bg-black opacity-90 p-2">
                {alt}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default ImageWithModal;
