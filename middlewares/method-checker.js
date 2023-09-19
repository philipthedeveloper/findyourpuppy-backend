import { StatusCodes, ReasonPhrases } from "http-status-codes";

const ALLOWED_METHODS = [
  "GET",
  "POST",
  "PUT",
  "PATCH",
  "DELETE",
  "OPTIONS",
  "HEAD",
];
const methodChecker = (req, res, next) => {
  if (!ALLOWED_METHODS.includes(req.method.toUpperCase()))
    return res.status(StatusCodes.METHOD_NOT_ALLOWED).json({
      success: false,
      status: StatusCodes.METHOD_NOT_ALLOWED,
      message: ReasonPhrases.METHOD_NOT_ALLOWED,
    });
  next();
};

export default methodChecker;
