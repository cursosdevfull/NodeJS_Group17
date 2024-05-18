import dotenv from "dotenv";

import app from "./app";
import { Bootstrap } from "./bootstrap/bootstrap.interface";
import { ServerBootstrap } from "./bootstrap/server.bootstrap";
import { gracefullyShutdown } from "./core/shutdown/gracefully";

dotenv.config({ path: "env-variables.txt" });

const serverBootstrap: Bootstrap = new ServerBootstrap(app);
const serversBootstrap: Bootstrap[] = [serverBootstrap];

(async () => {
  try {
    const listBootstraps: Array<Promise<string>> = [
      serverBootstrap.initialize(),
    ];
    const responses = await Promise.all(listBootstraps);
    responses.forEach((response) => console.log(response));
  } catch (error) {
    serverBootstrap.close();
    console.error("Error on server bootstrap", error);
  }
})();

process.on("SIGINT", gracefullyShutdown("SIGINT", ...serversBootstrap));
process.on("SIGTERM", gracefullyShutdown("SIGTERM", ...serversBootstrap));
process.on("SIGUSR2", gracefullyShutdown("SIGUSR2", ...serversBootstrap));
