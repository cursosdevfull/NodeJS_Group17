import { NextFunction, Request, Response } from 'express';

export interface IGuard {
  canActivate(req: Request, res: Response, next: NextFunction): void;
}
