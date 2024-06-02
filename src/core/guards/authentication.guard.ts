import { NextFunction, Request, Response } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';
import { ParsedQs } from 'qs';

import { StatusJwt } from '../services/status-jwt';
import { Tokens } from '../services/tokens';
import { IGuard } from './guard.interface';

export interface IUserInformation {
  userId: string;
  roles: { roleId: string; roleName: string }[];
  enable2FA: boolean;
}

export class AuthenticationGuard {
  execute2FA(validate2FA: boolean): IGuard {
    return {
      canActivate(
        req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
        res: Response<any, Record<string, any>>,
        next: NextFunction
      ) {
        const { authorization } = req.headers;

        if (
          !authorization ||
          authorization.split(" ")[0] !== "Bearer" ||
          !authorization.split(" ")[1]
        ) {
          return res.status(401).json({ message: "Unauthorized" });
        }

        Tokens.verifyToken(authorization.split(" ")[1])
          .then((payload: unknown) => {
            if (validate2FA && !(payload as IUserInformation).enable2FA)
              return res.status(428).json({ message: "2FA is not enabled" });
            res.locals.userId = (payload as IUserInformation).userId;
            res.locals.roles = (payload as IUserInformation).roles;

            next();
          })
          .catch((error) => {
            if (error.message === StatusJwt.JWT_EXPIRED) {
              return res.status(409).json({ message: "Token expired" });
            } else {
              return res.status(401).json({ message: "Unauthorized" });
            }
          });
      },
    };
  }
}
