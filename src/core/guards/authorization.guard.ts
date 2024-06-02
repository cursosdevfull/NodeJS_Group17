import { NextFunction, Request, Response } from 'express';

import { IGuard } from './guard.interface';

export class AuthorizationGuard {
  rolesAllowed(...rolesAllowed: string[]): IGuard {
    return {
      canActivate: (req: Request, res: Response, next: NextFunction) => {
        const { roles } = res.locals;
        const rolesUser = roles.map((role: any) => role.roleName);

        const hasPermission = rolesUser.some((role: string) =>
          rolesAllowed.includes(role)
        );

        if (!hasPermission) {
          return res.status(403).json({ message: "Forbidden" });
        }

        return next();
      },
    };
  }
}
