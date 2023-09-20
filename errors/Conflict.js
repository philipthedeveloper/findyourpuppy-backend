import CustomError from "./CustomError";
import { StatusCodes } from "http-status-codes";

export default class ConflictError extends CustomError {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.CONFLICT;
  }
}

export const createConflictError = (message) => new ConflictError(message);
