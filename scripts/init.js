import { spawn } from "child_process";

const isWindows = process.platform === "win32";
const npmCmd = isWindows ? "npm.cmd" : "npm";

function runCommand(command, args = []) {
  return new Promise((resolve, reject) => {
    const proc = spawn(command, args, { stdio: "inherit" });
    proc.on("close", (code) => {
      if (code !== 0) {
        reject(new Error(`Command "${command} ${args.join(" ")}" failed`));
      } else {
        resolve();
      }
    });
    proc.on("error", (err) => reject(err));
  });
}

async function waitForServer(url, timeout = 30000) {
  console.log(`Waiting for server to be ready at ${url}...`);
  const startTime = Date.now();
  while (Date.now() - startTime < timeout) {
    try {
      const response = await fetch(url, { signal: AbortSignal.timeout(1000) });
      if (response.status < 500) {
        console.log("Server is ready!");
        return;
      }
    } catch {}
    await new Promise((resolve) => setTimeout(resolve, 500));
  }
  throw new Error(
    `Server at ${url} did not become ready within ${timeout / 1000} seconds.`,
  );
}

async function main() {
  let devServerProcess;

  try {
    console.log("Installing packages & generating .env file...");
    await runCommand(npmCmd, ["ci"]);
    await runCommand(npmCmd, ["run", "setup-env"]);
    await runCommand(npmCmd, ["run", "reset-bucket-data"]);

    console.log("Starting the development server in the background...");
    devServerProcess = spawn(npmCmd, ["run", "dev"]);

    devServerProcess.stdout.on("data", () => {});
    devServerProcess.stderr.on("data", (data) => {
      console.log(`Server Response: ${data.toString()}`);
    });

    await waitForServer("http://localhost:3000");

    console.log("\n🔄 Resetting database...");
    await runCommand(npmCmd, ["run", "reset-db"]);
  } catch (error) {
    console.error(
      "\n❌ An error occurred during initialization:",
      error.message,
    );
    process.exit(1);
  } finally {
    if (devServerProcess) {
      console.log("Shutting down the development server...");
      devServerProcess.kill();
      console.log("Initialization complete.");
      console.log(
        "You can now start the server for development with: npm run dev",
      );
    }
  }
}

main();
