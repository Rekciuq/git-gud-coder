import Image from "next/image";
import Rating from "@/components/features/course/Rating";
import { cn } from "@/lib/cn";
import EnrollUser from "./EnrollUser";

type CourseDetailsProps = {
  thumbnailUrl: string;
  name: string;
  description: string;
  avgRating: number;
  price?: number;
  id: number;
  author: string;
};

const CourseDetails = ({
  thumbnailUrl,
  name,
  description,
  avgRating,
  price,
  id,
  author,
}: CourseDetailsProps) => {
  return (
    <div
      className={cn(
        "text-primary-text flex flex-col gap-2 border border-primary-text/90 hover:border-primary-text p-2 group",
      )}
    >
      <h3>{name}</h3>
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
      <p>author: {author}</p>
      <p className="text-secondary-text text-xs">{description}</p>
      <div className="mt-auto">
        <div className="inline-flex gap-2">
          <Rating avgRating={avgRating || 0} />
        </div>
        <p>{price ? `${price}$` : "Free"}</p>
      </div>
      <EnrollUser courseId={id} />
    </div>
  );
};

export default CourseDetails;
