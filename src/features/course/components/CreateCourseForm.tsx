"use client";

import VideoFormModalWindow from "@/components/features/course/VideoFormModalWindow";
import Form from "@/components/shared/form/Form";
import ModalWindowButton from "@/components/shared/modal-window/ModalWindowButton";
import useModalWindow from "@/hooks/useModalWindow";
import { useTRPC } from "@/lib/trpc/client/client";
import courseSchema from "@/schemas/course.schema";
import videoSchema from "@/schemas/video.schema";
import { SchemaType } from "@/types/shared/schema";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import DndVideoList from "./DndVideoList";
import { uploadImageToBucket } from "@/features/file/helpers/uploadImageToBucket";
import { useUserStore } from "@/context/UserProvider";
import ToastEmitter from "@/services/client/ToastEmitter";
import { uploadVideoToBucket } from "@/features/file/helpers/uploadVideoToBucket";

export type VideoSchemaWithID = {
  id: string;
  index: number;
} & SchemaType<typeof videoSchema>;

const CreateCourseForm = () => {
  const [videos, setVideos] = useState<VideoSchemaWithID[]>([]);
  const tRPC = useTRPC();
  const userId = useUserStore((state) => state.user.id);
  const { data: category } = useQuery(tRPC.filter.getCategories.queryOptions());
  const getPresignedUrlOptions = tRPC.upload.getPresignedUrl.queryOptions();

  const { refetch: getPresignedUrl } = useQuery({
    ...getPresignedUrlOptions,
    enabled: false,
  });

  const { mutateAsync: createCourse } = useMutation(
    tRPC.course.createCourse.mutationOptions(),
  );
  const { mutateAsync: createVideo } = useMutation(
    tRPC.video.createVideo.mutationOptions(),
  );
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

  const updateVideosOrder = (videos: VideoSchemaWithID[]) =>
    setVideos(videos.map((video, index) => ({ ...video, index })));

  return (
    <>
      <VideoFormModalWindow
        controls={modalControls.controls}
        state={modalControls.state}
        saveVideo={updateVideos}
        videosLength={videos.length}
      />
      <Form
        handleSubmit={async (values) => {
          const { data: presignedUrl } = await getPresignedUrl();
          const { url, bucketId } = await uploadImageToBucket({
            presignedUrl: presignedUrl?.url,
            file: values.thumbnail,
          });

          const { courseId } = await createCourse({
            name: values.name,
            description: values.description,
            category: category!.categories!.find(
              (cat) => cat.name === values.category,
            )!.id,
            authorId: userId,
            thumbnailUrl: url,
            thumbnailBucketId: bucketId,
          });

          for await (const video of videos) {
            const { data: thumbnailPresignedUrl } = await getPresignedUrl();
            const { url: thumbnailUrl, bucketId: thumbnailBucketId } =
              await uploadImageToBucket({
                presignedUrl: thumbnailPresignedUrl?.url,
                file: video.thumbnail,
              });

            if (!courseId) return;

            const { data: videoPresignedUrl } = await getPresignedUrl();
            const {
              lengthInSec,
              bucketId: bucketVideoId,
              url: videoUrl,
            } = await uploadVideoToBucket({
              presignedUrl: videoPresignedUrl?.url,
              file: video.video,
            });

            await createVideo({
              thumbnailUrl,
              thumbnailBucketId,
              courseId: courseId,
              name: video.name,
              description: video.description,
              bucketVideoId,
              index: video.index,
              lengthSec: lengthInSec,
              url: videoUrl,
            });
          }
          ToastEmitter.success("Course created!");
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
            <div className="w-full min-h-50 max-h-70 overflow-auto border border-primary-text">
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
