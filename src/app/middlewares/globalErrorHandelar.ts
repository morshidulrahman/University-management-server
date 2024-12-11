/* eslint-disable prefer-const */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { ErrorRequestHandler } from 'express';
import { TErrorSources } from '../interface/error';
import { ZodError } from 'zod';
import handleZodError from '../errors/handleZodError';
import handleValidationError from '../errors/handleValidationError';

// eslint-disable-next-line @typescript-eslint/no-explicit-any, no-unused-vars
export const globalErrorHandelar: ErrorRequestHandler = (
  err,
  req,
  res,
  next,
) => {
  let statusCode = 500;
  let message = 'Something went wrong';
  let errorSources: TErrorSources = [
    {
      path: '',
      message: 'Something went wrong',
    },
  ];

  if (err instanceof ZodError) {
    const simpliedError = handleZodError(err);
    message = simpliedError.message;
    errorSources = simpliedError.errorSources;
    statusCode = simpliedError.statusCode;
  } else if (err?.name === 'ValidationError') {
    const simpliedError = handleValidationError(err);
    message = simpliedError.message;
    errorSources = simpliedError.errorSources;
    statusCode = simpliedError.statusCode;
  }

  return res.status(statusCode).json({
    success: false,
    message,
    errorSources,
    err,
  });
};
