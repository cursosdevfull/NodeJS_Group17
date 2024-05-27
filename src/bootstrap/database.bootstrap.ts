import { DataSource } from "typeorm";

import { Parameters } from "../core/parameters/parameters";
import { Logger } from "../core/utils/logger";
import { Bootstrap, TInitialize } from "./bootstrap.interface";

export class DatabaseBootstrap implements Bootstrap {
  private static appDataSource: DataSource;
  private readonly logger = Logger.createLogger();

  initialize(): Promise<TInitialize> {
    const dbConfig = Parameters.dbConfig;
    const dataSource = new DataSource({
      type: "mysql",
      ...dbConfig,
    });

    DatabaseBootstrap.appDataSource = dataSource;

    const init = dataSource.initialize();
    init.then(() => {
      this.logger.logInfo("Database is running", dbConfig);
    });

    return Promise.resolve(
      `Connecting to database ${dbConfig.host}:${dbConfig.port}...`
    );
  }

  close() {
    this.logger.logInfo("Closing database...");
    return DatabaseBootstrap.appDataSource?.destroy();
  }

  static getDataSource(): DataSource {
    return DatabaseBootstrap.appDataSource;
  }
}
