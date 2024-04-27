import { Application } from "express";
import * as http from "http";

export class ServerBootstrap {
  constructor(private app: Application) {}

  initialize(): Promise<string> {
    return new Promise((resolve, reject) => {
      const server = http.createServer(this.app);

      server
        .listen(3000)
        .on("listening", () => {
          resolve("Server is listening on port 3000");
        })
        .on("error", (error: Error) => {
          console.error("Error on server", error);
          reject(error);
        });
    });
  }
}
