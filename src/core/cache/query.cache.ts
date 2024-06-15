import { NextFunction, Request, Response } from "express";

import { RedisBootstrap } from "../../bootstrap/redis.bootstrap";
import { Logger } from "../utils/logger";

export class QueryCache {
  private static readonly logger = Logger.createLogger();
  private static getParameters(prefix: string, params: Record<string, any>) {
    let newKey = prefix;
    if (params) {
      Object.keys(params).forEach((param) => {
        newKey += `_${param}_${params[param]}`;
      });
    }

    return newKey;
  }

  static build(prefix: string) {
    return async (req: Request, res: Response, next: NextFunction) => {
      let cacheKey = prefix;
      cacheKey = this.getParameters(cacheKey, req.params);
      cacheKey = this.getParameters(cacheKey, req.query);
      cacheKey = this.getParameters(cacheKey, req.body);

      console.log("cacheKey", cacheKey);

      const client = RedisBootstrap.redisClient;
      const value = await client.get(cacheKey);

      if (value) {
        this.logger.logInfo("Cache hit", { cacheKey });
        return res.json(JSON.parse(value));
      }

      this.logger.logInfo("Cache miss", { cacheKey });
      res.locals.cacheKey = cacheKey;
      next();
    };
  }
}

export class InvalidationQueryCache {
  private static readonly logger = Logger.createLogger();

  static execute() {
    return async (req: Request, res: Response, next: NextFunction) => {
      this.logger.logInfo("Invalidating cache", {
        prefix: (req.query.prefix ?? "") as string,
      });
      RedisBootstrap.clear((req.query.prefix ?? "") as string);

      res.json({ message: "Cache invalidated" });
    };
  }
}
