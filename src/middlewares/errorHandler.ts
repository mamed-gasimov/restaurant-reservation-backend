import { NextFunction, Request, Response } from 'express';

export class CustomError extends Error {
  statusCode: number;
  logMessage: string;

  constructor(statusCode: number, logMessage?: string) {
    super(logMessage);

    this.statusCode = statusCode;
    this.logMessage = logMessage;
  }
}

export const errorHandler = (
  error: Error & { statusCode: number },
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  res.status(error?.statusCode).json({ message: error?.message || 'Something went wrong!' });
};
