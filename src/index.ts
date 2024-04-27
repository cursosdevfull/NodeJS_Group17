import * as http from "http";

import { serverHttp } from "./app";

const server = http.createServer(serverHttp);

server.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
