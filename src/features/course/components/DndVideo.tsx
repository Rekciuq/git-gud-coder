import EditIcon from "@/components/icons/EditIcon";
import { VideoSchemaWithID } from "./CreateCourseForm";
import CancelIcon from "@/components/icons/CancelIcon";
import { ModalWindowControls } from "@/types/shared/modalWindow";
import DragThumbIcon from "@/components/icons/DragThumbIcon";
import { CSS } from "@dnd-kit/utilities";
import { useSortable } from "@dnd-kit/sortable";

type DndVideoProps = {
  video: VideoSchemaWithID;
  deleteVideo: (videoId: string) => void;
} & ModalWindowControls<VideoSchemaWithID | null>;

const DndVideo = ({ video, deleteVideo, controls }: DndVideoProps) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: video.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  return (
    <div
      ref={setNodeRef}
      style={style}
      className="text-primary-text border border-primary-text flex justify-between p-2 gap-2 w-full items-center"
    >
      <DragThumbIcon
        {...attributes}
        {...listeners}
        className="w-4 h-4 cursor-pointer active:cursor-grabbing"
      />
      <div className="w-full inline-flex items-center">
        <p>{video.name}</p>
        <EditIcon
          onClick={() => {
            controls.setCurrentItem(video);
            controls.setIsOpen(true);
          }}
          className="w-6 h-6 ml-auto mr-2 cursor-pointer"
        />
        <CancelIcon
          onClick={() => deleteVideo(video.id)}
          className="w-6 h-6 cursor-pointer"
        />
      </div>
    </div>
  );
};

export default DndVideo;
