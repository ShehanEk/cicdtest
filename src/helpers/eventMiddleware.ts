import { APIGatewayProxyEvent } from 'aws-lambda';
import { z } from 'zod';
import { responseHelper } from '../helpers';

export default async (
  event: APIGatewayProxyEvent,
  middlewareConfig: any,
  ...middlewares: any[]
): Promise<any> => {
  let result: any = null;

  if (typeof event.body === 'string') {
    event.body = JSON.parse(event.body);
  }
  try {
    for (let middleware of middlewares) {
      result = await middleware(event, middlewareConfig);
    }
    return result;
  } catch (error: any) {
    if (error.status === 422) {
      return responseHelper.sendError(
        event,
        error.status,
        error.message || 'Invalid parameters supplied.',
        null,
        null
      );
    }
    if (error.message === '400') {
      return responseHelper.sendError(event, 400, 'Invalid parameters supplied.', null, null);
    }
    if (error.message === '401') {
      return responseHelper.sendError(event, 401, 'Unauthorized.', null, null);
    }
  }
};
