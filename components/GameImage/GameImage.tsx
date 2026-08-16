"use client";

import Image, { ImageProps } from "next/image";
import { useState } from "react";
import { FALLBACK_GAME_IMAGE } from "@/lib/gameImages";

interface GameImageProps extends Omit<ImageProps, "src" | "alt"> {
  productId?: string;
  src: string;
  alt: string;
}

export default function GameImage({
  productId,
  src,
  alt,
  onError,
  ...props
}: GameImageProps) {
  const [imageSrc, setImageSrc] = useState(src || FALLBACK_GAME_IMAGE);

  return (
    <Image
      {...props}
      src={imageSrc}
      alt={alt}
      onError={(event) => {
        if (imageSrc !== FALLBACK_GAME_IMAGE) {
          setImageSrc(FALLBACK_GAME_IMAGE);
        }
        onError?.(event);
      }}
      data-product-id={productId}
    />
  );
}
