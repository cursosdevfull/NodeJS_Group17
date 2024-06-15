import "reflect-metadata";

import dotenv from "dotenv";

import app from "./app";
import { Bootstrap, TInitialize } from "./bootstrap/bootstrap.interface";
import { DatabaseBootstrap } from "./bootstrap/database.bootstrap";
import { RedisBootstrap } from "./bootstrap/redis.bootstrap";
import { ServerBootstrap } from "./bootstrap/server.bootstrap";
import { gracefullyShutdown } from "./core/shutdown/gracefully";
import { Logger } from "./core/utils/logger";

dotenv.config({ path: "env-variables.txt" });

const serverBootstrap: Bootstrap = new ServerBootstrap(app);
const databaseBootstrap: Bootstrap = new DatabaseBootstrap();
const redisBootstrap: Bootstrap = new RedisBootstrap();
const serversBootstrap: Bootstrap[] = [
  serverBootstrap,
  databaseBootstrap,
  redisBootstrap,
];
const logger = Logger.createLogger();

(async () => {
  try {
    const listBootstraps: Array<Promise<TInitialize>> = [
      serverBootstrap.initialize(),
      databaseBootstrap.initialize(),
      redisBootstrap.initialize(),
    ];
    const responses = await Promise.all(listBootstraps);
    responses.forEach((response) =>
      logger.logInfo("bootstrap", { parameter: response })
    );
  } catch (error) {
    serverBootstrap.close();
    logger.logError("Error on server bootstrap", error);
  }
})();

process.on("SIGINT", gracefullyShutdown("SIGINT", ...serversBootstrap));
process.on("SIGTERM", gracefullyShutdown("SIGTERM", ...serversBootstrap));
process.on("SIGUSR2", gracefullyShutdown("SIGUSR2", ...serversBootstrap));
