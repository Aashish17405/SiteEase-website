"use client";
import { useState } from "react";
import dynamic from "next/dynamic";

export function LazyYouTube({
  videoId,
  title,
}: {
  videoId: string;
  title: string;
}) {
  const [isIframeLoaded, setIsIframeLoaded] = useState(false);
  const thumbnail = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;

  return (
    <div className="relative w-full overflow-hidden rounded-xl shadow-xl border border-gray-200 bg-gray-100 aspect-video">
      {isIframeLoaded ? (
        <iframe
          className="w-full h-full"
          width="560"
          height="315"
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
          title={title}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        ></iframe>
      ) : (
        <button
          className="w-full h-full relative group"
          onClick={() => setIsIframeLoaded(true)}
          aria-label="Play video"
        >
          <img
            src={thumbnail}
            alt={`YouTube video thumbnail for ${title}`}
            className="w-full h-full object-cover"
            loading="lazy"
          />
          <span className="absolute inset-0 flex items-center justify-center">
            <svg
              width="64"
              height="64"
              viewBox="0 0 64 64"
              fill="white"
              className="opacity-80 group-hover:opacity-100 transition"
            >
              <circle cx="32" cy="32" r="32" fill="black" opacity="0.6" />
              <polygon points="26,20 50,32 26,44" fill="white" />
            </svg>
          </span>
        </button>
      )}
    </div>
  );
}
