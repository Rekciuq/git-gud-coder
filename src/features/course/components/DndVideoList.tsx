"use client";

import { closestCenter, DndContext } from "@dnd-kit/core";
import { DragEndEvent } from "@dnd-kit/core";
import { restrictToParentElement } from "@dnd-kit/modifiers";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import DndVideo from "./DndVideo";
import { VideoSchemaWithID } from "./CreateCourseForm";
import { ModalWindowControls } from "@/types/shared/modalWindow";

type DndVideoListProps = {
  videos: VideoSchemaWithID[];
  deleteVideo: (videoId: string) => void;
  updateVideosOrder: (videos: VideoSchemaWithID[]) => void;
} & ModalWindowControls<VideoSchemaWithID | null>;

const DndVideoList = ({
  videos,
  deleteVideo,
  updateVideosOrder,
  controls,
  state,
}: DndVideoListProps) => {
  const videosIds = videos.map((videos) => videos.id);
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = videos.findIndex((video) => video.id === active.id);
    const newIndex = videos.findIndex((video) => video.id === over.id);

    if (oldIndex !== -1 && newIndex !== -1) {
      const updatedVideos = [...videos];
      const [movedVideo] = updatedVideos.splice(oldIndex, 1);
      updatedVideos.splice(newIndex, 0, movedVideo);

      updateVideosOrder(updatedVideos);
    }
  };
  return (
    <DndContext
      onDragEnd={handleDragEnd}
      collisionDetection={closestCenter}
      modifiers={[restrictToParentElement, restrictToVerticalAxis]}
    >
      <SortableContext items={videosIds} strategy={verticalListSortingStrategy}>
        {videos.map((video) => (
          <DndVideo
            key={video.id}
            video={video}
            deleteVideo={deleteVideo}
            state={state}
            controls={controls}
          />
        ))}
      </SortableContext>
    </DndContext>
  );
};

export default DndVideoList;
