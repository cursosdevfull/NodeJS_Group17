"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Parameters = void 0;
class Parameters {
    static get port() {
        return process.env.port ? Number(process.env.port) : 3000;
    }
    static get host() {
        return process.env.host || "0.0.0.0";
    }
}
exports.Parameters = Parameters;
