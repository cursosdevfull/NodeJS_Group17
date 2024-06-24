import { validate } from 'class-validator';
import { NextFunction, Request, Response } from 'express';

import { ExtractValueProperties, listConstraints, setDefault } from '../utils/extract';

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
        return res.status(400).json({ errorsDetails });
      }

      next();
    };
  }
}
