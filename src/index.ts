import dotenv from "dotenv";

import { app } from "./app";
import { ServerBootstrap } from "./bootstrap/server.bootstrap";
import { IServerBootstrap } from "./bootstrap/server.interface";

dotenv.config({ path: "env-variables.txt" });

const serverBootstrap: IServerBootstrap = new ServerBootstrap(app);

(async () => {
  try {
    const responseServer = await serverBootstrap.initialize();
    console.log(responseServer);
  } catch (error) {
    serverBootstrap.close();
    console.error("Error on server bootstrap", error);
  }
})();

const gracefullyShutdown = (SIGNAME: string) => {
  return async () => {
    console.log(`${SIGNAME} signal received`);
    console.log("Closing server...");
    serverBootstrap.getServer().close(() => {
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
