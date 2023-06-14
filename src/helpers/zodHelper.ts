import { z, ZodError } from 'zod';
import * as responseHelper from './responseHelper';

export const getReadableZodError = (error: ZodError) => {
  if (error instanceof ZodError) {
    return error.issues
      .map((issue) => {
        const field = issue.path.join('.');
        const message = issue.message;

        return `${field}: ${message}`;
      })
      .join(', ');
  }

  return 'Unknown error';
};

export const requestBodyValidator = async (event: any, middlewareConfig: any) => {
  try {
    const result = await middlewareConfig.validationScheme.safeParseAsync(event.body);
    if (!result.success) {
      const readableError = getReadableZodError(result.error);
      return Promise.reject({ status: 422, message: readableError });
    }
    return Promise.resolve();
  } catch (err) {
    return Promise.reject({ status: 500, message: 'something went wrong', error: err });
  }
};
