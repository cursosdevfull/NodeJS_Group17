import { Bootstrap } from "../../bootstrap/bootstrap.interface";
import { Logger } from "../utils/logger";

export const gracefullyShutdown = (
  SIGNAME: string,
  ...servers: Bootstrap[]
) => {
  const logger = Logger.createLogger();

  return async () => {
    logger.logInfo(`${SIGNAME} signal received`);
    logger.logInfo("Closing server...");
    await Promise.all(servers.map((server) => server.close()));

    setTimeout(() => {
      logger.logError("Could not close server, forcefully shutting down");
      process.exit(1);
    }, 10000);
  };
};
