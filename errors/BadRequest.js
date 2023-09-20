import CustomError from "./CustomError";
import { StatusCodes } from "http-status-codes";

export default class BadRequestError extends CustomError {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.BAD_REQUEST;
  }
}

export const createBadRequestError = (message) => new BadRequestError(message);
