import { StatusCodes } from "http-status-codes";

const routeNotFound = (req, res) => {
  return res.status(StatusCodes.NOT_FOUND).json({
    success: false,
    status: StatusCodes.NOT_FOUND,
    messsage: `${req.url} does not exist`,
  });
};

export default routeNotFound;
