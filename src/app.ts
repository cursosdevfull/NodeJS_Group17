import * as http from "http";

import { about, api, file, home, image, user, video } from "./callbacks";

const app = (
  path: string,
  cb: (request: http.IncomingMessage, response: http.ServerResponse) => void
) => {
  return (request: http.IncomingMessage, response: http.ServerResponse) => {
    if (request.url === path) {
      cb(request, response);
    }
  };
};

export const serverHttp = (
  request: http.IncomingMessage,
  response: http.ServerResponse
) => {
  app("/", home)(request, response);
  app("/api", api)(request, response);
  app("/user", user)(request, response);
  app("/about", about)(request, response);
  app("/file", file)(request, response);
  app("/image", image)(request, response);
  app("/video", video)(request, response);
};
