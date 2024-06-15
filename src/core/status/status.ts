import { DatabaseBootstrap } from "../../bootstrap/database.bootstrap";
import { RedisBootstrap } from "../../bootstrap/redis.bootstrap";

export class Status {
  static async isRunningAll(): Promise<boolean> {
    const listPromises = [
      DatabaseBootstrap.getDataSource().query("SELECT * from role limit 1"),
      RedisBootstrap.redisClient.ping(),
    ];

    try {
      const response = await Promise.all(listPromises);
      console.log("RESPONSE", response);
      return true;
    } catch (error) {
      return false;
    }
  }
}
