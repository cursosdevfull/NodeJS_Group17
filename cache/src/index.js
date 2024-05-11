"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const app_1 = __importDefault(require("./app"));
const server_bootstrap_1 = require("./bootstrap/server.bootstrap");
dotenv_1.default.config({ path: "env-variables.txt" });
const serverBootstrap = new server_bootstrap_1.ServerBootstrap(app_1.default);
(() => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const listBootstraps = [
            serverBootstrap.initialize(),
        ];
        const responses = yield Promise.all(listBootstraps);
        responses.forEach((response) => console.log(response));
    }
    catch (error) {
        serverBootstrap.close();
        console.error("Error on server bootstrap", error);
    }
}))();
const gracefullyShutdown = (SIGNAME) => {
    return () => __awaiter(void 0, void 0, void 0, function* () {
        console.log(`${SIGNAME} signal received`);
        console.log("Closing server...");
        yield serverBootstrap.close();
        setTimeout(() => {
            console.error("Could not close server, forcefully shutting down");
            process.exit(1);
        }, 10000);
    });
};
process.on("SIGINT", gracefullyShutdown("SIGINT"));
process.on("SIGTERM", gracefullyShutdown("SIGTERM"));
process.on("SIGUSR2", gracefullyShutdown("SIGUSR2"));
