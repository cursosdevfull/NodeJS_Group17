export enum STATUS_CODE_ID {
  INTERNAL_SERVER_ERROR = "INTERNAL_SERVER_ERROR",
  NOT_FOUND = "NOT_FOUND",
  BAD_REQUEST = "BAD_REQUEST",
  UNAUTHORIZED = "UNAUTHORIZED",
  OK = "OK",
}

export enum STATUS_CODE {
  OK = 200,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  PRECONDITION_FAILED = 428,
  INTERNAL_SERVER_ERROR = 500,
}

export enum MESSAGE_STATUS {
  INTERNAL_SERVER_ERROR = "Internal server error",
  NOT_FOUND = "Not found",
  BAD_REQUEST = "Bad request",
  UNAUTHORIZED = "Unauthorized",
}

export interface IExceptionEssentials {
  message: MESSAGE_STATUS | string;
  name: string;
}

export type IErrorsDetails = string | string[] | undefined;

export interface IExceptionOptionals {
  stack: string;
  errorsDetails: IErrorsDetails;
}

export type IExceptionOptions = IExceptionEssentials &
  Partial<IExceptionOptionals>;

export abstract class BaseException extends Error {
  abstract statusCodeId: STATUS_CODE_ID;
  abstract status: STATUS_CODE;
  abstract message: MESSAGE_STATUS | string;
  abstract name: string;
  abstract stack: string | undefined;
  abstract errorsDetails: IErrorsDetails;

  constructor(message: string) {
    super(message);
  }
}

export class InternalServerErrorException extends BaseException {
  readonly statusCodeId: STATUS_CODE_ID = STATUS_CODE_ID.INTERNAL_SERVER_ERROR;
  readonly status: STATUS_CODE = STATUS_CODE.INTERNAL_SERVER_ERROR;
  readonly message: MESSAGE_STATUS | string;
  readonly name: string;
  readonly stack: string;
  readonly errorsDetails: IErrorsDetails;

  constructor(options: IExceptionOptions) {
    super(options.message);
    Object.assign(this, options);
  }
}

export class NotFoundException extends BaseException {
  readonly statusCodeId: STATUS_CODE_ID = STATUS_CODE_ID.NOT_FOUND;
  readonly status: STATUS_CODE = STATUS_CODE.NOT_FOUND;
  readonly message: MESSAGE_STATUS | string;
  readonly name: string;
  readonly stack: string;
  readonly errorsDetails: IErrorsDetails;

  constructor(options: IExceptionOptions) {
    super(options.message);
    Object.assign(this, options);
  }
}

export class BadRequestException extends BaseException {
  readonly statusCodeId: STATUS_CODE_ID = STATUS_CODE_ID.BAD_REQUEST;
  readonly status: STATUS_CODE = STATUS_CODE.BAD_REQUEST;
  readonly message: MESSAGE_STATUS | string;
  readonly name: string;
  readonly stack: string;
  readonly errorsDetails: IErrorsDetails;

  constructor(options: IExceptionOptions) {
    super(options.message);
    Object.assign(this, options);
  }
}

export class UnauthorizedException extends BaseException {
  readonly statusCodeId: STATUS_CODE_ID = STATUS_CODE_ID.UNAUTHORIZED;
  readonly status: STATUS_CODE = STATUS_CODE.UNAUTHORIZED;
  readonly message: MESSAGE_STATUS | string;
  readonly name: string;
  readonly stack: string;
  readonly errorsDetails: IErrorsDetails;

  constructor(options: IExceptionOptions) {
    super(options.message);
    Object.assign(this, options);
  }
}
