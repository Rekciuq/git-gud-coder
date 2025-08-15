import VideoFormModalWindow from "@/components/features/course/VideoFormModalWindow";
import Form from "@/components/shared/form/Form";
import ModalWindowButton from "@/components/shared/modal-window/ModalWindowButton";
import useModalWindow from "@/hooks/useModalWindow";
import { useTRPC } from "@/lib/trpc/client/client";
import courseSchema from "@/schemas/course.schema";
import videoSchema from "@/schemas/video.schema";
import { SchemaType } from "@/types/shared/schema";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import DndVideoList from "./DndVideoList";

export type VideoSchemaWithID = {
  id: string;
} & SchemaType<typeof videoSchema>;

const CreateCourseForm = () => {
  const [videos, setVideos] = useState<VideoSchemaWithID[]>([]);
  const tRPC = useTRPC();
  const { data: category } = useQuery(tRPC.filter.getCategories.queryOptions());
  const modalControls = useModalWindow<VideoSchemaWithID>();

  const updateVideos = (video: VideoSchemaWithID) => {
    setVideos((prev) => {
      const videoIndex = prev.findIndex(
        (prevVideo) => prevVideo.id === video.id,
      );

      if (videoIndex === -1) return [...prev, video];

      const updatedVideos = [...prev];
      updatedVideos[videoIndex] = { ...prev[videoIndex], ...video };

      return updatedVideos;
    });
  };

  const removeVideo = (videoId: string) =>
    setVideos((prev) => prev.filter((prevVideo) => prevVideo.id !== videoId));

  const updateVideosOrder = (videos: VideoSchemaWithID[]) => setVideos(videos);

  return (
    <>
      <VideoFormModalWindow
        controls={modalControls.controls}
        state={modalControls.state}
        saveVideo={updateVideos}
      />
      <Form
        handleSubmit={(values) => {
          console.log(values);
        }}
        schema={courseSchema}
      >
        <div className="flex gap-4 flex-col">
          <Form.TextField name="name" label="Name:" />
          <Form.TextAreaField name="description" label="Description:" />
          <Form.ImageField name="thumbnail" label="Thumbnail:" />
          <Form.NumberField name="price" label="Price:" />
          <div className="flex my-2 justify-between">
            <div className="text-primary-text">
              <p className="mb-2">Manage videos:</p>
              <ModalWindowButton
                setIsOpen={modalControls.controls.setIsOpen}
                isOpen={modalControls.state.isOpen}
              >
                Add Videos
              </ModalWindowButton>
            </div>
            <div className="w-full h-50 overflow-auto border border-primary-text">
              <DndVideoList
                videos={videos}
                deleteVideo={removeVideo}
                updateVideosOrder={updateVideosOrder}
                state={modalControls.state}
                controls={modalControls.controls}
              />
              {!!!videos.length && (
                <p className="text-center w-full mt-20">
                  There are no any added videos yet!
                </p>
              )}
            </div>
          </div>
        </div>

        <Form.RadioField
          name="category"
          label="Category:"
          options={
            (category?.categories || []).map(({ name }) => ({
              title: name,
              value: name,
            })) || []
          }
        />
        <Form.Submit type="submit" className="ml-auto" />
      </Form>
    </>
  );
};

export default CreateCourseForm;
