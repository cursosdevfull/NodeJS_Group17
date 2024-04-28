export class Parameters {
  static get port(): number {
    return process.env.port ? Number(process.env.port) : 3000;
  }

  static get host(): string {
    return process.env.host || "0.0.0.0";
  }
}
