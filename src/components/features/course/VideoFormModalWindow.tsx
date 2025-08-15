"use client";

import CancelIcon from "@/components/icons/CancelIcon";
import Form from "@/components/shared/form/Form";
import ModalWindow from "@/components/shared/modal-window/ModalWindow";
import { VideoSchemaWithID } from "@/features/course/components/CreateCourseForm";
import videoSchema from "@/schemas/video.schema";
import { v4 as uuidv4 } from "uuid";
import { ModalWindowControls } from "@/types/shared/modalWindow";

type VideoFormModalWindowProps = {
  saveVideo: (video: VideoSchemaWithID) => void;
  videosLength: number;
} & ModalWindowControls<VideoSchemaWithID | null>;

const VideoFormModalWindow = ({
  state,
  controls,
  saveVideo,
  videosLength,
}: VideoFormModalWindowProps) => {
  return (
    <ModalWindow state={state} controls={controls}>
      <div className="w-150">
        <div className="inline-flex w-full justify-between items-center p-2">
          <h1 className="text-2xl">
            {state.currentItem ? "Edit the Video!" : "Add the video!"}
          </h1>
          <CancelIcon
            className="w-8 h-8 cursor-pointer"
            onClick={() => controls.setIsOpen(false)}
          />
        </div>
        <div className="w-full h-0.25 border border-primary-text"></div>
        <Form
          defaultValues={state.currentItem || undefined}
          className="p-2"
          schema={videoSchema}
          handleSubmit={(values) => {
            saveVideo({
              ...values,
              id: state.currentItem?.id || uuidv4(),
              index: state.currentItem?.index || videosLength,
            });
            controls.setIsOpen(false);
          }}
        >
          <div className="w-full flex flex-col gap-2">
            <Form.TextField label="Name:" name="name" />
            <Form.TextField label="Description:" name="description" />
            <Form.FileField label="Thumbnail:" name="thumbnail" />
            <Form.FileField label="Video:" name="video" />
            <Form.Submit
              type={state.currentItem ? "update" : "submit"}
              className="self-end mt-2"
            />
          </div>
        </Form>
      </div>
    </ModalWindow>
  );
};

export default VideoFormModalWindow;
