import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import { spawn } from "child_process";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const isWindows = process.platform === "win32";

const binaryPath = path.join(
  __dirname,
  "..",
  "bucket",
  isWindows ? "go-bucket-app.exe" : "go-bucket-app",
);

if (!fs.existsSync(binaryPath)) {
  console.error(`❌ Error: Go binary not found at ${binaryPath}`);
  console.error(
    "Please build the Go binary and place it in the 'bucket' directory.",
  );
  process.exit(1);
}

const runBinary = isWindows ? "./go-bucket-app.exe" : "./go-bucket-app";
const nameSpace = "./bucket/";

const bucketProcess = spawn(runBinary, [], {
  stdio: "inherit",
  cwd: nameSpace,
});

const nextProcess = spawn(isWindows ? "npm.cmd" : "npm", ["run", "dev"], {
  stdio: "inherit",
});

function cleanup() {
  console.log("Shutting down child processes...");
  if (bucketProcess && !bucketProcess.killed) bucketProcess.kill();
  if (nextProcess && !nextProcess.killed) nextProcess.kill();
  process.exit();
}

process.on("SIGINT", cleanup);
process.on("SIGTERM", cleanup);
