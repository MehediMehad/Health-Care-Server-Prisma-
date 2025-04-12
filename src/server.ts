import { Server } from "http";
import app from "./app";

const port = 3000;

async function main() {
  const server: Server = app.listen(port, () => {
    console.log(`🚀 Server listening at http://localhost:${port} 😎`);
  });
}

main().catch((error) => {
  console.error("❌ Server failed to start", error);
  process.exit(1);
});
