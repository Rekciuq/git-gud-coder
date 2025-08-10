import StarIcon from "@/components/icons/star/StarIcon";
import { memo } from "react";

type RatingProps = {
  avgRating: number;
};

const Rating = ({ avgRating }: RatingProps) => {
  return (
    <div className="inline-flex gap-2 relative">
      {Array.from({ length: 5 }).map((_, index) => {
        const fillPercentage =
          avgRating > index
            ? avgRating - index >= 1
              ? 100
              : (avgRating - index) * 100
            : 0;

        return (
          <div key={index} className="relative">
            <StarIcon
              className="w-5 h-5 z-10"
              fillPercentage={fillPercentage}
            />
          </div>
        );
      })}
    </div>
  );
};

export default memo(Rating);
