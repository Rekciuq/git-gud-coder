"use client";

import VideoPlayer from "@/features/course/components/VideoPlayer";
import { useTRPC } from "@/lib/trpc/client/client";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useState } from "react";

export default function CoursePage() {
  const { courseId } = useParams();
  const tRPC = useTRPC();
  const [currentVideo, setCurrentVideo] = useState<{
    url: string;
    name: string;
    thumbnail: { url: string };
    lengthSec: number;
    description?: string;
  } | null>(null);

  const { data: course } = useQuery(
    tRPC.course.getCourseById.queryOptions(Number(courseId)),
  );

  return (
    <div className="flex w-full h-full">
      <div>
        {course?.course?.videos.map((video) => (
          <div
            key={video.url}
            onClick={() => setCurrentVideo(video)}
            className="text-primary-text text-xs w-60 border border-primary-text flex justify-between p-2 gap-2"
          >
            <div className="relative w-20 h-20">
              <Image
                src={video.thumbnail.url}
                alt="Video"
                fill
                className="object-cover"
              />
            </div>
            <div className="w-full flex flex-col justify-between">
              <p>{video.name}</p>
              <p>
                length:
                {`${Math.floor(video.lengthSec / 60)}:${video.lengthSec % 60}`}
              </p>
            </div>
          </div>
        ))}
      </div>
      {currentVideo && (
        <div className="w-full h-full">
          <div className="w-full relative h-200">
            <VideoPlayer
              className="absolute top-0 left-0 w-full h-full"
              src={currentVideo.url}
            />
          </div>
          <div className="w-full bg-primary-text h-0.5 mb-2"></div>
          <div className="text-primary-text flex flex-col gap-2">
            <h1 className="text-2xl">{currentVideo.name}</h1>
            <p>{currentVideo.description}</p>
          </div>
        </div>
      )}
    </div>
  );
}
