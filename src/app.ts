import express from "express";

import { about, api, file, home, image, user, video } from "./callbacks";

const app = express();

app.get("/", home);
app.get("/api", api);
app.get("/user", user);
app.get("/about", about);
app.get("/file", file);
app.get("/image", image);
app.get("/video", video);

export { app };
