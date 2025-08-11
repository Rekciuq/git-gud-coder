-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_CourseUser" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "progressPercentage" REAL NOT NULL DEFAULT 0,
    "userId" INTEGER NOT NULL,
    "courseId" INTEGER NOT NULL,
    CONSTRAINT "CourseUser_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "CourseUser_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_CourseUser" ("courseId", "id", "userId") SELECT "courseId", "id", "userId" FROM "CourseUser";
DROP TABLE "CourseUser";
ALTER TABLE "new_CourseUser" RENAME TO "CourseUser";
CREATE UNIQUE INDEX "CourseUser_userId_courseId_key" ON "CourseUser"("userId", "courseId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
