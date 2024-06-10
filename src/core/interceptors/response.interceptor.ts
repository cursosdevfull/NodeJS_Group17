import { NextFunction, Request, Response } from "express";

import { STATUS_CODE_ID } from "../handle-errors/responses/exception";

export const ResponseInterceptor = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const methodOriginal = res.json;

  res.json = function (data) {
    if (!data) return methodOriginal.call(this, { message: "No data found" });

    if (res.statusCode === 200 || res.statusCode === 201) {
      return methodOriginal.call(this, {
        provider: "CursosDev",
        status: "success",
        statusCodeId: STATUS_CODE_ID.OK,
        statusCode: res.statusCode,
        result: { response: data },
      });
    } else if (res.statusCode >= 400 && res.statusCode < 600) {
      return methodOriginal.call(this, {
        provider: "CursosDev",
        status: "failure",
        statusCodeId: data.statusCodeId,
        statusCode: res.statusCode,
        name: data.name,
        detail: {
          message: data.message,
          errorsDetails: data.errorsDetails,
          stack: data.stack,
        },
      });
    }
  };

  next();
};
