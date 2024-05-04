import dotenv from 'dotenv';

import app from './app';
import { Bootstrap } from './bootstrap/bootstrap.interface';
import { ServerBootstrap } from './bootstrap/server.bootstrap';

dotenv.config({ path: "env-variables.txt" });

const serverBootstrap: Bootstrap = new ServerBootstrap(app);

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

const gracefullyShutdown = (SIGNAME: string) => {
  return async () => {
    console.log(`${SIGNAME} signal received`);
    console.log("Closing server...");
    await serverBootstrap.close();

    setTimeout(() => {
      console.error("Could not close server, forcefully shutting down");
      process.exit(1);
    }, 10000);
  };
};

process.on("SIGINT", gracefullyShutdown("SIGINT"));
process.on("SIGTERM", gracefullyShutdown("SIGTERM"));
process.on("SIGUSR2", gracefullyShutdown("SIGUSR2"));
