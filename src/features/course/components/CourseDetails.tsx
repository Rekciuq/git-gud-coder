import Image from "next/image";
import Rating from "@/components/features/course/Rating";
import { cn } from "@/lib/cn";

type CourseDetailsProps = {
  thumbnailUrl: string;
  name: string;
  description: string;
  avgRating: number;
  price?: number;
};

const CourseDetails = ({
  thumbnailUrl,
  name,
  description,
  avgRating,
  price,
}: CourseDetailsProps) => {
  return (
    <div
      className={cn(
        "absolute top-0 left-0 w-full",
        "text-primary-text flex flex-col gap-2 hover:cursor-pointer border border-primary-text/90 hover:border-primary-text p-2 group",
      )}
    >
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
      <h3 className="hover:underline line-clamp-2">{name}</h3>
      <p className="text-secondary-text text-xs hover:underline line-clamp-4">
        {description}
      </p>
      <div className="mt-auto">
        <div className="inline-flex gap-2">
          <Rating avgRating={avgRating || 0} />
        </div>
        <p>{price ? `${price}$` : "Free"}</p>
      </div>
    </div>
  );
};

export default CourseDetails;
