/*
  Warnings:

  - Added the required column `thumbnailId` to the `Course` table without a default value. This is not possible if the table is not empty.
  - Added the required column `bucketVideoId` to the `Video` table without a default value. This is not possible if the table is not empty.
  - Added the required column `thumbnailId` to the `Video` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Course" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "thumbnailId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "Course_thumbnailId_fkey" FOREIGN KEY ("thumbnailId") REFERENCES "Image" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Course_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Course" ("description", "id", "name", "userId") SELECT "description", "id", "name", "userId" FROM "Course";
DROP TABLE "Course";
ALTER TABLE "new_Course" RENAME TO "Course";
CREATE TABLE "new_Video" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "url" TEXT NOT NULL,
    "bucketVideoId" TEXT NOT NULL,
    "courseId" INTEGER,
    "thumbnailId" INTEGER NOT NULL,
    CONSTRAINT "Video_thumbnailId_fkey" FOREIGN KEY ("thumbnailId") REFERENCES "Image" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Video_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Video" ("courseId", "id", "url") SELECT "courseId", "id", "url" FROM "Video";
DROP TABLE "Video";
ALTER TABLE "new_Video" RENAME TO "Video";
CREATE UNIQUE INDEX "Video_bucketVideoId_key" ON "Video"("bucketVideoId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
