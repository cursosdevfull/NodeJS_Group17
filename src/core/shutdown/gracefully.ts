import { Bootstrap } from "../../bootstrap/bootstrap.interface";

export const gracefullyShutdown = (
  SIGNAME: string,
  ...servers: Bootstrap[]
) => {
  return async () => {
    console.log(`${SIGNAME} signal received`);
    console.log("Closing server...");
    await Promise.all(servers.map((server) => server.close()));

    setTimeout(() => {
      console.error("Could not close server, forcefully shutting down");
      process.exit(1);
    }, 10000);
  };
};
