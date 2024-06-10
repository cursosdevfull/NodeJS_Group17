import { NextFunction, Request, Response } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";

import { StatusJwt } from "../services/status-jwt";
import { Tokens } from "../services/tokens";
import { IGuard } from "./guard.interface";

export interface IUserInformation {
  userId: string;
  roles: { roleId: string; roleName: string }[];
  enable2FA: boolean;
}

export interface IValidateToken {
  statusCode: 200 | 401 | 409 | 428;
  error: string | null;
  payload: IUserInformation | null;
}

export class AuthenticationGuard {
  execute2FA(validate2FA: boolean): IGuard {
    return {
      async canActivate(
        req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
        res: Response<any, Record<string, any>>,
        next: NextFunction
      ) {
        const { authorization } = req.headers;

        const isTokenAdded = AuthenticationGuard.isTokenAdded(authorization);
        if (!isTokenAdded) {
          return res.status(401).json({ message: "Unauthorized" });
        }

        try {
          const isTokenValid = await AuthenticationGuard.isTokenValid(
            authorization,
            validate2FA
          );
          if (isTokenValid.statusCode !== 200) {
            return res
              .status(isTokenValid.statusCode)
              .json({ message: isTokenValid.error });
          } else {
            res.locals.userId = isTokenValid.payload?.userId;
            res.locals.roles = isTokenValid.payload?.roles;
            next();
          }
        } catch (error: any) {
          return res.status(error.statusCode).json({ message: error.error });
        }

        /* Tokens.verifyToken(authorization.split(" ")[1])
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
          }); */
      },
    };
  }

  static isTokenAdded(authorization: string): boolean {
    if (
      !authorization ||
      authorization.split(" ")[0] !== "Bearer" ||
      !authorization.split(" ")[1]
    ) {
      return false;
    }

    return true;
  }

  static isTokenValid(
    authorization: string,
    validate2FA: boolean
  ): Promise<IValidateToken> {
    return new Promise(async (resolve, reject) => {
      try {
        const payload = await Tokens.verifyToken(authorization.split(" ")[1]);
        if (validate2FA && !(payload as IUserInformation).enable2FA) {
          resolve({
            statusCode: 428,
            error: "2FA is not enabled",
            payload: null,
          });
        } else {
          resolve({
            statusCode: 200,
            error: null,
            payload: payload as IUserInformation,
          });
        }
      } catch (error: any) {
        if (error.message === StatusJwt.JWT_EXPIRED) {
          reject({ statusCode: 409, error: "Token expired", payload: null });
        } else {
          reject({ statusCode: 401, error: "Unauthorized", payload: null });
        }
      }
    });
  }
}
