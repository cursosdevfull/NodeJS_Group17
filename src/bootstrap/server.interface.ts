import * as http from "http";

import { Bootstrap } from "./bootstrap.interface";

export interface IServerBootstrap extends Bootstrap {
  getServer(): http.Server;
}
