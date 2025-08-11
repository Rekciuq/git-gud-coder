"use client";

import Button from "@/components/shared/Button";
import { useUserStore } from "@/context/UserProvider";
import { getQueryClient, useTRPC } from "@/lib/trpc/client/client";
import ToastEmitter from "@/services/client/ToastEmitter";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

type EnrollUserProps = {
  courseId: number;
};

const EnrollUser = ({ courseId }: EnrollUserProps) => {
  const tRPC = useTRPC();
  const userId = useUserStore((state) => state.user.id);
  const router = useRouter();
  const queryClient = getQueryClient();

  const { isSuccess, isPending, mutate } = useMutation(
    tRPC.course.enrollCourse.mutationOptions(),
  );

  useEffect(() => {
    if (!isSuccess) return;

    ToastEmitter.success("Course enrolled!");
    queryClient.invalidateQueries();
    router.push(`/course/${courseId}`);
  }, [isSuccess, router, courseId, queryClient]);

  return (
    <Button
      label="Enroll"
      isLoading={isPending}
      onClick={() => mutate({ userId, courseId })}
      type="submit"
    />
  );
};

export default EnrollUser;
