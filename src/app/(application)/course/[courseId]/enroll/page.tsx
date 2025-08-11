import CourseDetails from "@/features/course/components/CourseDetails";
import { getUserDisplayName } from "@/helpers/getUserDisplayName";
import { getServerCaller } from "@/lib/trpc/server/caller";

export default async function enrollPage({
  params,
}: {
  params: { courseId: string };
}) {
  const { courseId } = params;
  const caller = await getServerCaller();
  const { course } = await caller.course.getCourseById(Number(courseId));
  if (!course) return;

  const authorName = getUserDisplayName({
    firstName: course.user.firstName,
    lastName: course.user.lastName,
    email: course.user.email,
  });

  return (
    <CourseDetails
      thumbnailUrl={course.thumbnail.url}
      name={course.name}
      description={course.description}
      avgRating={course.avgRating}
      price={course.price}
      id={course.id}
      author={authorName}
    />
  );
}
