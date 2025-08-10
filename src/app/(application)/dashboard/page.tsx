"use client";

// TODO: Make a list pretty with dynamic columns, I don't have much time :(

import Filters from "@/components/features/dashboard/Filters";
import Loader from "@/components/icons/Loader";
import { useGetParams } from "@/features/dashboard/hooks/useGetParams";
import { useTRPC } from "@/lib/trpc/client/client";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useVirtualizer } from "@tanstack/react-virtual";
import { useEffect, useMemo, useRef } from "react";
import { DEFAULT_PAGINATION_LIMIT } from "@/constants/schemas/pagination";
import { cn } from "@/lib/cn";
import CourseCard from "@/features/dashboard/components/CourseCard";

export default function DashboardPage() {
  const params = useGetParams();
  const trpc = useTRPC();

  const parentRef = useRef<HTMLDivElement>(null);

  const {
    data: courses,
    isLoading,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useInfiniteQuery(
    trpc.course.getCourses.infiniteQueryOptions(
      {
        filters: params,
        limit: DEFAULT_PAGINATION_LIMIT,
      },
      {
        getNextPageParam: (lastPage) => {
          return lastPage.nextCursor ?? undefined;
        },
      },
    ),
  );

  const allRows = useMemo(
    () => (courses ? courses.pages.flatMap((d) => d.courses) : []),
    [courses],
  );

  const pxSizeOfOneCourse = 356;
  const rowVirtualizer = useVirtualizer({
    count: hasNextPage ? allRows.length + 1 : allRows.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => pxSizeOfOneCourse,
    overscan: DEFAULT_PAGINATION_LIMIT,
  });

  const virtualItems = rowVirtualizer.getVirtualItems();
  const lastItem = virtualItems[virtualItems.length - 1];

  useEffect(() => {
    if (!lastItem || !hasNextPage || isLoading || isFetchingNextPage) {
      return;
    }

    if (lastItem.index >= allRows.length - DEFAULT_PAGINATION_LIMIT) {
      fetchNextPage();
    }
  }, [
    hasNextPage,
    isLoading,
    isFetchingNextPage,
    allRows.length,
    fetchNextPage,
    lastItem,
  ]);

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
            <span className="text-primary-text">{allRows?.length || 0}</span>
          </div>
        </div>
        <div ref={parentRef} className="p-2 overflow-auto h-[1030px]">
          <div
            className={cn("relative w-full")}
            style={{
              height: `${rowVirtualizer.getTotalSize()}px`,
            }}
          >
            {virtualItems.map((virtualRow) => {
              const course = allRows[virtualRow.index];

              return (
                <CourseCard
                  key={virtualRow.key}
                  itemHeight={virtualRow.size}
                  itemOffset={virtualRow.start}
                  id={course?.id}
                  thumbnailUrl={course?.thumbnail.url}
                  name={course?.name}
                  description={course?.description}
                  avgRating={course?.avgRating}
                  price={course?.price}
                />
              );
            })}
          </div>
          {!!!allRows?.length && isLoading && (
            <div className="w-full h-full flex justify-center items-center pt-100">
              <Loader className="text-primary-text max-w-25" />
            </div>
          )}
          {!!!allRows?.length && !isLoading && (
            <div className="w-full text-center text-2xl text-primary-text mt-10">
              <h2>No results were found</h2>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
