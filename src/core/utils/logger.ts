import winston, { format } from "winston";

export type LogMessage = string;
export type LogContext = Record<string, any>;

export enum LogLevel {
  DEBUG = "debug",
  INFO = "info",
  WARN = "warn",
  ERROR = "error",
}

export class Logger {
  private _logger: winston.Logger;
  private static _appName = "CourseNodeJS17";
  private static instance: Logger;

  private constructor() {
    this._logger = this._initialize();
  }

  public static createLogger() {
    if (!this.instance) {
      this.instance = new Logger();
    }
    return this.instance;
  }

  public logInfo(msg: LogMessage, context?: LogContext) {
    this._log(msg, LogLevel.INFO, context);
  }

  public logWarn(msg: LogMessage, context?: LogContext) {
    this._log(msg, LogLevel.WARN, context);
  }

  public logDebug(msg: LogMessage, context?: LogContext) {
    this._log(msg, LogLevel.DEBUG, context);
  }

  public logError(msg: LogMessage, context?: LogContext) {
    this._log(msg, LogLevel.ERROR, context);
  }

  private _log(msg: LogMessage, level: LogLevel, context?: LogContext) {
    this._logger.log(level, msg, { context });
  }

  private _initialize() {
    const logger = winston.createLogger({
      transports: Logger._getTransports(),
    });

    return logger;
  }

  private static _getTransports() {
    return [
      new winston.transports.Console({
        format: this._getFormatForConsole(),
      }),
    ];
  }

  private static _getFormatForConsole() {
    return format.combine(
      format.timestamp(),
      format.printf(
        (info) =>
          `[${this._appName}] [${
            info.timestamp
          }] [${info.level.toUpperCase()}]: ${info.message} [Context: ${
            info.context ? "\n" + JSON.stringify(info.context, null, 2) : "{}"
          }]`
      ),
      format.colorize({ all: true })
    );
  }
}
