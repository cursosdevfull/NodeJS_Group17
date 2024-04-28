import { Application } from "express";
import * as http from "http";
import { AddressInfo } from "net";

import { Parameters } from "../core/parameters/parameters";
import { Bootstrap } from "./bootstrap.interface";

export class ServerBootstrap implements Bootstrap {
  private server!: http.Server;

  constructor(private app: Application) {}

  initialize(): Promise<string> {
    return new Promise((resolve, reject) => {
      const server = http.createServer(this.app);

      const port = Parameters.port;
      const host = Parameters.host;

      server
        .listen(port, host)
        .on("listening", () => {
          const addressInfo = server.address() as AddressInfo;
          resolve(
            `HTTP server is running on http://${addressInfo.address}:${addressInfo.port}`
          );
        })
        .on("error", (error: Error) => {
          console.error("Error on server", error);
          reject(error);
        });

      this.server = server;
    });
  }

  close() {
    this.server.close();
  }

  getServer(): http.Server {
    return this.server;
  }
}
