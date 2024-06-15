import IORedis, { Redis } from "ioredis";

import { Parameters } from "../core/parameters/parameters";
import { Logger } from "../core/utils/logger";
import { Bootstrap, TInitialize } from "./bootstrap.interface";

export class RedisBootstrap implements Bootstrap {
  private static client: IORedis;
  private readonly logger = Logger.createLogger();

  initialize(): Promise<TInitialize> {
    return new Promise((resolve, reject) => {
      const client = new IORedis({
        host: Parameters.redisHost,
        port: Parameters.redisPort,
        password: Parameters.redisPassword,
        maxRetriesPerRequest: Parameters.redisMaxRetriesPerRequest,
      });

      client
        .on("connect", () => {
          this.logger.logInfo("Redis is running");
          resolve(true);
        })
        .on("error", (error) => {
          this.logger.logError("Redis connection error", error);
          reject(error);
        });

      RedisBootstrap.client = client;
    });
  }

  close(): void {
    RedisBootstrap.client?.disconnect();
  }

  static get redisClient(): Redis {
    return RedisBootstrap.client;
  }

  static async set(key: string, value: string): Promise<void> {
    await RedisBootstrap.client.set(
      key,
      value,
      "PX",
      Parameters.redisExpiresIn
    );
  }

  static async get(key: string): Promise<string | null> {
    return RedisBootstrap.client.get(key);
  }

  static async clear(prefix: string = "") {
    const keys = await RedisBootstrap.client.keys(`${prefix}*`);
    const pipeline = RedisBootstrap.client.pipeline();

    keys.forEach((key) => {
      pipeline.del(key);
    });

    await pipeline.exec();
  }
}
