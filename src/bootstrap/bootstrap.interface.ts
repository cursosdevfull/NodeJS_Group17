export interface Bootstrap {
  initialize(): Promise<string>;
  close(): void;
}
