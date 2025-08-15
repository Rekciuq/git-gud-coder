-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Video" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "url" TEXT NOT NULL,
    "lengthSec" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "index" INTEGER,
    "bucketVideoId" TEXT NOT NULL,
    "thumbnailId" INTEGER NOT NULL,
    "courseId" INTEGER,
    CONSTRAINT "Video_thumbnailId_fkey" FOREIGN KEY ("thumbnailId") REFERENCES "Image" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Video_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Video" ("bucketVideoId", "courseId", "description", "id", "index", "lengthSec", "name", "thumbnailId", "url") SELECT "bucketVideoId", "courseId", "description", "id", "index", "lengthSec", "name", "thumbnailId", "url" FROM "Video";
DROP TABLE "Video";
ALTER TABLE "new_Video" RENAME TO "Video";
CREATE UNIQUE INDEX "Video_bucketVideoId_key" ON "Video"("bucketVideoId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
