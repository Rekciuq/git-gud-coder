-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Image" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "url" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "bucketImageId" TEXT NOT NULL
);
INSERT INTO "new_Image" ("bucketImageId", "createdAt", "id", "url") SELECT "bucketImageId", "createdAt", "id", "url" FROM "Image";
DROP TABLE "Image";
ALTER TABLE "new_Image" RENAME TO "Image";
CREATE UNIQUE INDEX "Image_bucketImageId_key" ON "Image"("bucketImageId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
