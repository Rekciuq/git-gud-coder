"use client";

import Loader from "@/components/icons/Loader";
import Button from "@/components/shared/Button";
import { useUserStore } from "@/context/UserProvider";
import CourseCard from "@/features/user-dashboard/CourseCard";
import { hasPermission } from "@/helpers/hasPermission";
import { useTRPC } from "@/lib/trpc/client/client";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export default function UserDashboardPage() {
  const user = useUserStore((state) => state.user);
  const tRPC = useTRPC();
  const router = useRouter();

  const { data: enrolledCourses, isPending } = useQuery(
    tRPC.course.getEnrolledCourses.queryOptions(user.id),
  );

  return (
    <div className="p-2 text-primary-text">
      <div className="w-full inline-flex justify-between">
        <h1 className="text-2xl">My Courses</h1>
        {user.roleId && hasPermission(user.roleId, "create:course") && (
          <Button
            type="submit"
            label="Create new course"
            onClick={() => router.push("/course/new")}
          />
        )}
      </div>
      {(enrolledCourses?.courses || []).map((course) => (
        <CourseCard
          courseId={course.id}
          userId={user.id}
          key={course.id}
          thumbnailUrl={course.thumbnail.url}
          linkUrl={`/course/${course.id}`}
          name={course.name}
          description={course.description}
          avgRating={course.avgRating}
        />
      ))}
      {isPending && (
        <div className="w-full inline-flex justify-center">
          <Loader className="w-20 h-20" />
        </div>
      )}
      {!!!enrolledCourses?.courses?.length && !isPending && (
        <div className="w-full text-center text-2xl text-primary-text mt-10">
          <h2>No results were found</h2>
        </div>
      )}
    </div>
  );
}
