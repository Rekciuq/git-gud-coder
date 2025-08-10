import Rating from "@/components/features/course/Rating";
import { cn } from "@/lib/cn";
import Link from "next/link";
import Image from "next/image";
import { memo } from "react";

type CourseCardProps = {
  itemHeight: number;
  itemOffset: number;
  id?: number;
  thumbnailUrl?: string;
  name?: string;
  description?: string;
  avgRating?: number;
  price?: number;
};

const CourseCard = ({
  itemHeight,
  itemOffset,
  id,
  thumbnailUrl,
  name,
  description,
  avgRating,
  price,
}: CourseCardProps) => (
  <Link
    style={{
      height: `${itemHeight}px`,
      transform: `translateY(${itemOffset}px)`,
    }}
    className={cn(
      "absolute top-0 left-0 w-full",
      "text-primary-text flex flex-col gap-2 hover:cursor-pointer border border-primary-text/90 hover:border-primary-text p-2 group",
    )}
    href={`course/${id}`}
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
  </Link>
);

export default memo(CourseCard);
