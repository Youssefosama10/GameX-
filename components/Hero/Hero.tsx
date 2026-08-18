"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { LOCAL_HERO_IMAGES } from "@/lib/gameImages";

/** Mirrors the promotional copy drawn inside each banner, which is otherwise
 *  unavailable to screen readers. */
const SLIDE_ALT: Record<string, string> = {
  "/games/slider-one.png": "Enter the Dark Realm - legends aren't born, they're forged",
  "/games/slider-tow.png": "Live to play - Cyber Racer - speed, style, supremacy",
  "/games/slider-three.png": "Rise beyond the limits - new worlds, epic battles, your legacy",
  "/games/slider-Four.png": "Gear up for victory - elite gear, legendary performance",
};

export default function Hero() {
  const slides = LOCAL_HERO_IMAGES;
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (slides.length < 2) return;
    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % slides.length);
    }, 7000);
    return () => window.clearInterval(timer);
  }, [slides.length]);

  return (
    <section className="gx-hero">
      <div className="gx-hero__stage">
        {slides.map((image, slideIndex) => (
          <div
            key={image}
            className={`gx-hero__slide ${slideIndex === index ? "is-active" : ""}`}
          >
            <Image
              src={image}
              alt={SLIDE_ALT[image] ?? ""}
              width={2172}
              height={724}
              priority={slideIndex === 0}
              className="gx-hero__image"
              sizes="100vw"
              style={{ width: "100%", height: "auto" }}
            />
          </div>
        ))}
        <div className="gx-hero__overlay" />
        {slides.length > 1 ? (
          <div className="gx-hero__nav">
            <button type="button" onClick={() => setIndex((index - 1 + slides.length) % slides.length)} aria-label="Previous banner">
              ‹
            </button>
            <button type="button" onClick={() => setIndex((index + 1) % slides.length)} aria-label="Next banner">
              ›
            </button>
          </div>
        ) : null}
      </div>
    </section>
  );
}
