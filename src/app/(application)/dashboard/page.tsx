"use client";

import Rating from "@/components/features/course/Rating";
import Filters from "@/components/features/dashboard/Filters";
import Loader from "@/components/icons/Loader";
import { useGetParams } from "@/features/dashboard/hooks/useGetParams";
import { useTRPC } from "@/lib/trpc/client/client";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";

export default function DashboardPage() {
  const params = useGetParams();
  const trpc = useTRPC();

  const { data: courses } = useQuery(
    trpc.course.getCourses.queryOptions(params),
  );

  return (
    <div className="w-full h-full flex">
      <div className="p-2 mt-2 ml-2 relative">
        <Filters />
      </div>
      <div className="p-2 w-full">
        <div className="inline-flex justify-between w-full">
          <h1 className="text-primary-text text-5xl">Video courses</h1>
          <div className="inline-flex gap-2 items-center">
            <p className="text-primary-text">total:</p>
            <span className="text-primary-text">
              {courses?.courses?.length || 0}
            </span>
          </div>
        </div>
        <div className="flex flex-wrap gap-10 p-2">
          {courses?.courses?.map((course) => (
            <Link
              className="text-primary-text w-54 flex flex-col gap-2 hover:cursor-pointer border border-primary-text/90 hover:border-primary-text p-2 group"
              key={course.id}
              href={`course/${course.id}`}
            >
              <div className="w-50 h-50 relative bg-white">
                <Image
                  src={course.thumbnail.url}
                  alt="Course thumbnail"
                  fill
                  priority
                  sizes="max-w-50 max-h-50"
                  className="object-cover group-hover:opacity-90 transition-opacity"
                />
              </div>
              <h3 className="hover:underline line-clamp-2">{course.name}</h3>
              <p className="text-secondary-text text-xs hover:underline line-clamp-4">
                {course.description}
              </p>
              <div className="mt-auto">
                <div className="inline-flex gap-2">
                  <Rating avgRating={course.avgRating || 0} />
                </div>
                <p>{`${course?.price}$` || "Free"}</p>
              </div>
            </Link>
          ))}
          {!!!courses?.courses?.length && (
            <div className="w-full h-full flex justify-center items-center pt-100">
              <Loader className="text-primary-text max-w-25" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
