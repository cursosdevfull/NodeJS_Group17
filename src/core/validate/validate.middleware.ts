import { validate } from "class-validator";
import { NextFunction, Request, Response } from "express";

import {
  ExtractValueProperties,
  listConstraints,
  setDefault,
} from "../utils/extract";

export class ValidateParameters {
  static execute<T extends object>(obj: new () => T) {
    return async (req: Request, res: Response, next: NextFunction) => {
      const instance: T = new obj();

      const parameters = {
        ...req.body,
        ...req.params,
        ...req.query,
        ...req.headers,
      };

      Object.assign(instance, parameters);
      const errors = await validate(instance);

      if (errors.length > 0) {
        setDefault();
        ExtractValueProperties(errors, "constraints");
        const errorsDetails = listConstraints;
        /*const errorsDetails = errors
          .map((error) => error.constraints)
          .map((obj) => obj[Object.keys(obj)[0]]);*/
        return res.status(400).json({ errorsDetails });
      }

      // {"roleId": "d538843b-95d1-406c-a062-c6f5f97da154"}, {"roleId": "09271bff-def2-492e-98bb-8f533c74aac4"}

      next();
    };
  }
}
