import * as http from "http";

import { app } from "./app";

const server = http.createServer(app);

server
  .listen(3000)
  .on("listening", () => console.log("Server is listening on port 3000"))
  .on("error", (error: Error) => console.error("Error on server", error));

const gracefullyShutdown = (SIGNAME: string) => {
  return async () => {
    console.log(`${SIGNAME} signal received`);
    console.log("Closing server...");
    server.close(() => {
      console.log("Server closed");
      process.exit(0);
    });

    setTimeout(() => {
      console.error("Could not close server, forcefully shutting down");
      process.exit(1);
    }, 10000);
  };
};

process.on("SIGINT", gracefullyShutdown("SIGINT"));
process.on("SIGTERM", gracefullyShutdown("SIGTERM"));
process.on("SIGUSR2", gracefullyShutdown("SIGUSR2"));

/* process.on("SIGINT", () => {
  console.log("SIGINT signal received");
  console.log("Process terminated");
  server.close(() => {
    console.log("Server closed");
    process.exit(0);
  });
});

process.on("SIGTERM", () => {
  console.log("SIGTERM signal received");
  console.log("Process terminated");
  server.close(() => {
    console.log("Server closed");
    process.exit(0);
  });
});

process.on("SIGUSR2", () => {
  console.log("SIGUSR2 signal received");
  console.log("Process terminated");
  server.close(() => {
    console.log("Server closed");
    process.kill(process.pid, "SIGUSR2");
  });
}); */
