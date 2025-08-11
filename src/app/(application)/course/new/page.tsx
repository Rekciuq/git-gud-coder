"use client";

import CreateCourseForm from "@/features/course/components/CreateCourseForm";

export default function createCoursePage() {
  return (
    <div className="p-2 text-primary-text">
      <h1 className="text-2xl">Create new course!</h1>
      <CreateCourseForm />
    </div>
  );
}
