-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Course" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "avgRating" REAL NOT NULL DEFAULT 0,
    "thumbnailId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "price" REAL NOT NULL,
    CONSTRAINT "Course_thumbnailId_fkey" FOREIGN KEY ("thumbnailId") REFERENCES "Image" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Course_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Course" ("createdAt", "description", "id", "name", "price", "thumbnailId", "userId") SELECT "createdAt", "description", "id", "name", "price", "thumbnailId", "userId" FROM "Course";
DROP TABLE "Course";
ALTER TABLE "new_Course" RENAME TO "Course";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
