import { NextFunction, Request, Response } from "express";
import { ERROR_CODE } from "server/constants";
import { BaseResponse } from "server/interfaces/basicModel";

export class CustomError extends Error {
    status: number;
    details?: any;
  
    constructor(message: string, status: number = 500, details?: any) {
        
      super(message); // Call the base class constructor
      Object.setPrototypeOf(this, CustomError.prototype);
      this.status = status;
      this.details = details;
      Error.captureStackTrace(this, this.constructor);
    }
  }

export const errorHandler = (err: any, _req: Request, res: Response, _next: NextFunction) => {
    const statusCode = err.status || (res.statusCode ? res.statusCode : ERROR_CODE.SERVER_ERROR);
    let errResp: BaseResponse = {
        error: true,
        status: 'ERROR',
        message: err.stack || '',
    };
    switch (statusCode) {
        case ERROR_CODE.VALIDATION_ERROR:
            errResp.message = `${err.message}  ---> ${err.message}`
            break;
        case ERROR_CODE.NOT_FOUND:
            errResp.message = `${err.message}  ---> ${err.message}`;
            break;
        case ERROR_CODE.UNAUTHORIZED:
            errResp.message = `401 Unauthorized  ---> ${err.message}`;
            break;
        case ERROR_CODE.FORBIDDEN:
            errResp.message = `403 Forbidden  ---> ${err.message}`;
            break;
        default:
            break;
        
    }
    errResp.code = statusCode || ERROR_CODE.SERVER_ERROR;
    res.status(statusCode).json(errResp)
}