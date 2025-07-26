import fs from "fs";
import path from "path";

const directories = [
  path.join("bucket", "database"),
  path.join("bucket", "uploads"),
];

console.log("Starting cleanup...");

directories.forEach((dir) => {
  try {
    if (fs.existsSync(dir)) {
      fs.rmSync(dir, { recursive: true, force: true });
      console.log(`Successfully deleted: ${dir}`);
    } else {
      console.log(`Directory not found, skipping: ${dir}`);
    }
  } catch (error) {
    console.error(`Failed to delete ${dir}:`, error);
  }
});

console.log("Cleanup complete.");
