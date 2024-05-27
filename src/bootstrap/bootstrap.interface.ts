import { DataSource } from "typeorm";

export type TInitialize = boolean | string | DataSource | Error;

export interface Bootstrap {
  initialize(): Promise<TInitialize>;
  close(): void;
}
