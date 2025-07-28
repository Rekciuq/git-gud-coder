/*
  Warnings:

  - You are about to drop the `Resolution` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `VideoResolution` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `lengthSec` to the `Video` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Resolution_name_key";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Resolution";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "VideoResolution";
PRAGMA foreign_keys=on;

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Video" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "url" TEXT NOT NULL,
    "lengthSec" INTEGER NOT NULL,
    "bucketVideoId" TEXT NOT NULL,
    "courseId" INTEGER,
    "thumbnailId" INTEGER NOT NULL,
    CONSTRAINT "Video_thumbnailId_fkey" FOREIGN KEY ("thumbnailId") REFERENCES "Image" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Video_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Video" ("bucketVideoId", "courseId", "id", "thumbnailId", "url") SELECT "bucketVideoId", "courseId", "id", "thumbnailId", "url" FROM "Video";
DROP TABLE "Video";
ALTER TABLE "new_Video" RENAME TO "Video";
CREATE UNIQUE INDEX "Video_bucketVideoId_key" ON "Video"("bucketVideoId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
