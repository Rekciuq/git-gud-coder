import Rating from "@/components/features/course/Rating";
import { cn } from "@/lib/cn";
import Image from "next/image";
import { memo } from "react";
import Button from "@/components/shared/Button";
import { getQueryClient, useTRPC } from "@/lib/trpc/client/client";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import ToastEmitter from "@/services/client/ToastEmitter";

type CourseCardProps = {
  userId: number;
  courseId: number;
  thumbnailUrl?: string;
  name?: string;
  description?: string;
  avgRating?: number;
  linkUrl: string;
};

const CourseCard = ({
  thumbnailUrl,
  userId,
  courseId,
  name,
  description,
  avgRating,
  linkUrl,
}: CourseCardProps) => {
  const router = useRouter();
  const tRPC = useTRPC();
  const isAuthor = userId === courseId;
  const queryClient = getQueryClient();

  const { mutateAsync: leaveCourse, isPending: isLeavePending } = useMutation(
    tRPC.course.leaveCourse.mutationOptions(),
  );

  return (
    <div
      className={cn(
        "text-primary-text flex flex-col gap-2 border border-primary-text/90 hover:border-primary-text p-2 group",
      )}
    >
      {thumbnailUrl && (
        <div className="w-50 h-50 relative bg-white">
          <Image
            src={thumbnailUrl}
            alt="Course thumbnail"
            fill
            priority
            sizes="max-w-50 max-h-50"
            className="object-cover group-hover:opacity-90 transition-opacity"
          />
        </div>
      )}
      <h3 className="line-clamp-2">{name}</h3>
      <p className="text-secondary-text text-xs line-clamp-4">{description}</p>
      <div className="mt-auto">
        <div className="inline-flex gap-2">
          <Rating edit avgRating={avgRating || 0} />
        </div>
      </div>
      <div className="inline-flex gap-4 w-full justify-end">
        {isAuthor ? (
          <Button
            type="update"
            label="Edit"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              router.push(`${linkUrl}/edit`);
            }}
          />
        ) : (
          <Button
            type="submit"
            label="Watch"
            onClick={() => router.push(linkUrl)}
          />
        )}
        <Button
          type="delete"
          label={isAuthor ? "Delete" : "Leave"}
          isLoading={isLeavePending}
          onClick={async (e) => {
            e.preventDefault();
            e.stopPropagation();
            if (!isAuthor) {
              await leaveCourse({ userId, courseId });
              ToastEmitter.success("Course leaved");
              queryClient.invalidateQueries();
            }
          }}
        />
      </div>
    </div>
  );
};

export default memo(CourseCard);
