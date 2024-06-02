import { RoleEntity } from '../../modules/role/infrastructure/entities/role.entity';
import { StudentEntity } from '../../modules/student/infrastructure/entities/student.entity';
import { UserEntity } from '../../modules/user/infrastructure/entities/user.entity';

export class Parameters {
  static get port(): number {
    return process.env.port ? Number(process.env.port) : 3000;
  }

  static get host(): string {
    return process.env.host || "0.0.0.0";
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
}
