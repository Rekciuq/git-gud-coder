import Button from "@/components/shared/Button";
import CourseDetails from "@/features/course/components/CourseDetails";

export default async function enrollPage() {
  return (
    <>
      <CourseDetails
        thumbnailUrl={""}
        name={""}
        description={""}
        avgRating={0}
        price={0}
      />
      <Button label="Enroll" type="submit" />
    </>
  );
}
