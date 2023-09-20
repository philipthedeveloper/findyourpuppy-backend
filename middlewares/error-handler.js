import { StatusCodes, ReasonPhrases } from "http-status-codes";

const errorHandler = (err, req, res, next) => {
  let errorObject = {};
  console.log(err);
  if (err && err.name === "ValidationError") {
    errorObject.status = StatusCodes.BAD_REQUEST;
    errorObject.message = err.message;
  }
  let status = errorObject?.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
  return res.status(status).json({
    success: false,
    status,
    message: errorObject?.message || ReasonPhrases.INTERNAL_SERVER_ERROR,
  });
};

export default errorHandler;
