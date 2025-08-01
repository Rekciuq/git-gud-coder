/*
  Warnings:

  - A unique constraint covering the columns `[categoryId,courseId]` on the table `CourseCategory` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "CourseCategory_categoryId_courseId_key" ON "CourseCategory"("categoryId", "courseId");
