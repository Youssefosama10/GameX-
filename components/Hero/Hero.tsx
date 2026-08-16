"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { HeroBanner } from "@/API/types";

export default function Hero({ banners }: { banners: HeroBanner[] }) {
  const slides = banners.filter((banner) => banner.backgroundImage || banner.title);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (slides.length < 2) return;
    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % slides.length);
    }, 7000);
    return () => window.clearInterval(timer);
  }, [slides.length]);

  if (slides.length === 0) {
    return (
      <section className="gx-hero">
        <div className="gx-hero__fallback" />
        <div className="gx-hero__content">
          <span className="gx-hero__badge">GameX Store</span>
          <h1>Your next adventure starts here</h1>
          <p>Browse premium digital games with instant delivery and exclusive deals.</p>
          <Link href="/games" className="gx-btn gx-btn--primary gx-btn--lg">
            Browse Games
          </Link>
        </div>
      </section>
    );
  }

  const current = slides[index];

  return (
    <section className="gx-hero">
      {slides.map((banner, slideIndex) => (
        <div
          key={banner.id || slideIndex}
          className={`gx-hero__slide ${slideIndex === index ? "is-active" : ""}`}
        >
          {banner.backgroundImage ? (
            <Image
              src={banner.backgroundImage}
              alt={banner.title}
              fill
              priority={slideIndex === 0}
              className="gx-hero__image"
              sizes="100vw"
            />
          ) : null}
        </div>
      ))}
      <div className="gx-hero__overlay" />
      <div className="gx-hero__content">
        {current.subtitle ? <span className="gx-hero__badge">{current.subtitle}</span> : null}
        <h1>{current.title}</h1>
        {current.description ? <p>{current.description}</p> : null}
        <div className="gx-hero__actions">
          <Link href={current.buttonLink || "/games"} className="gx-btn gx-btn--primary gx-btn--lg">
            {current.buttonText || "Shop Now"}
          </Link>
          <Link href="/deals" className="gx-btn gx-btn--ghost gx-btn--lg">
            View Deals
          </Link>
        </div>
      </div>
      {slides.length > 1 ? (
        <div className="gx-hero__nav">
          <button type="button" onClick={() => setIndex((index - 1 + slides.length) % slides.length)} aria-label="Previous banner">
            ‹
          </button>
          <div className="gx-hero__dots">
            {slides.map((banner, slideIndex) => (
              <button
                key={banner.id || slideIndex}
                type="button"
                className={slideIndex === index ? "is-active" : ""}
                onClick={() => setIndex(slideIndex)}
                aria-label={`Go to slide ${slideIndex + 1}`}
              />
            ))}
          </div>
          <button type="button" onClick={() => setIndex((index + 1) % slides.length)} aria-label="Next banner">
            ›
          </button>
        </div>
      ) : null}
    </section>
  );
}
