/* eslint-disable @typescript-eslint/no-unused-vars */

import { NextFunction, Request, Response } from "express";


// eslint-disable-next-line @typescript-eslint/no-explicit-any, no-unused-vars
export const globalErrorHandelar = ((err: any, req: Request, res: Response, next: NextFunction) => {
    const statusCode = 500
    const message = err.message || "Something went wrong"

    return res.status(statusCode).json({
        success: false,
        message,
        eroor: err
    })
})