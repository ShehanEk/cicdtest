import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { responseHelper } from "../helpers";

export const testLayerFunction = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  try {
    console.log("git here12sss2");
    return responseHelper.sendSuccess(
      event,
      `Successfully retrieved job data.`
    );
  } catch (err: any) {
    return responseHelper.sendError(
      event,
      500,
      "Could not get job data",
      err.message,
      err
    );
  }
};
