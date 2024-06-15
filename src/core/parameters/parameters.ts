import { RoleEntity } from "../../modules/role/infrastructure/entities/role.entity";
import { StudentEntity } from "../../modules/student/infrastructure/entities/student.entity";
import { UserEntity } from "../../modules/user/infrastructure/entities/user.entity";

export class Parameters {
  static get port(): number {
    return process.env.PORT ? Number(process.env.port) : 3000;
  }

  static get host(): string {
    return process.env.HOST || "0.0.0.0";
  }

  static get dbConfig() {
    return {
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      entities: [StudentEntity, UserEntity, RoleEntity],
      synchronize: process.env.DB_SYNC === "true" ? true : false,
      logging: process.env.DB_LOG === "true" ? true : false,
      poolSize: Number(process.env.DB_POOL_SIZE),
      maxQueryExecutionTime: Number(process.env.DB_MAX_QUERY_EXECUTION_TIME),
    };
  }

  static get jwtSecret(): string {
    return process.env.JWT_SECRET || "secret";
  }

  static get jwtExpiresIn(): string {
    return process.env.JWT_EXPIRES_IN || "15m";
  }

  static get redisHost(): string {
    return process.env.REDIS_HOST || "localhost";
  }

  static get redisPort(): number {
    return process.env.REDIS_PORT ? Number(process.env.REDIS_PORT) : 6379;
  }

  static get redisPassword(): string {
    return process.env.REDIS_PASSWORD || "";
  }

  static get redisMaxRetriesPerRequest(): number {
    return process.env.REDIS_MAX_RETRIES_PER_REQUEST
      ? Number(process.env.REDIS_MAX_RETRIES_PER_REQUEST)
      : 3;
  }

  static get redisExpiresIn(): number {
    return process.env.REDIS_EXPIRES_IN
      ? Number(process.env.REDIS_EXPIRES_IN)
      : 3600;
  }
}
