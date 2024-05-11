"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServerBootstrap = void 0;
const http = __importStar(require("http"));
const parameters_1 = require("../core/parameters/parameters");
class ServerBootstrap {
    constructor(app) {
        this.app = app;
    }
    initialize() {
        return new Promise((resolve, reject) => {
            const server = http.createServer(this.app);
            const port = parameters_1.Parameters.port;
            const host = parameters_1.Parameters.host;
            server
                .listen(port, host)
                .on("listening", () => {
                const addressInfo = server.address();
                resolve(`HTTP server is running on http://${addressInfo.address}:${addressInfo.port}`);
            })
                .on("error", (error) => {
                console.error("Error on server", error);
                reject(error);
            });
            this.server = server;
        });
    }
    close() {
        this.server.close(() => {
            console.log("Server closed");
            process.exit(0);
        });
    }
}
exports.ServerBootstrap = ServerBootstrap;
