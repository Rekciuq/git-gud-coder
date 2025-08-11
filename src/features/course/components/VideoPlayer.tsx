"use client";

import { useEffect, useRef } from "react";
import Hls from "hls.js";

type VideoPlayerProps = {
  src: string;
  className?: string;
};

const VideoPlayer = ({ src, className }: VideoPlayerProps) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const hlsRef = useRef<Hls | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = src;
      return;
    }

    if (Hls.isSupported()) {
      const hls = new Hls();
      hlsRef.current = hls;

      hls.loadSource(src);
      hls.attachMedia(video);

      return () => {
        hls.destroy();
      };
    }
  }, [src]);

  return (
    <video
      className={className}
      ref={videoRef}
      id="video"
      controls
      width="1280"
      height="720"
      style={{ backgroundColor: "black" }}
    />
  );
};

export default VideoPlayer;
