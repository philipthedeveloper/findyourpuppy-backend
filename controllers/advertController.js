import { Advert } from "../models/index.js";
import * as ERROR_TYPE from "../helpers/errorTypes.js";
import {
  throwRequestError,
  checkEmptyRequestBody,
  sendSuccessResponse,
} from "../helpers/index.js";
import { StatusCodes } from "http-status-codes";

export const getAllAdverts = async (req, res) => {
  const adverts = await Advert.find({});
  return sendSuccessResponse(res, {
    adverts,
    nbHits: adverts.length,
    message: "Successful",
  });
};

export const getUserAdverts = async (req, res) => {
  const userId = req.currentUser.id;
  const adverts = await Advert.find({ createdBy: userId });
  return sendSuccessResponse(res, {
    adverts,
    nbHits: adverts.length,
    message: "Successful",
  });
};

export const createAdvert = async (req, res) => {
  const userId = req.currentUser._id;
  const isBodyEmpty = checkEmptyRequestBody(req.body);
  if (isBodyEmpty)
    throwRequestError(ERROR_TYPE.BAD_REQUEST, "Please provide all fields");
  const newAdvert = await Advert.create({ ...req.body, createdBy: userId });
  if (newAdvert) {
    return sendSuccessResponse(
      res,
      { advert: newAdvert, messsage: "New advert created" },
      StatusCodes.CREATED
    );
  } else {
    throwRequestError(
      ERROR_TYPE.UNPROCESSABLE_ENTITY,
      "Could not create advert"
    );
  }
};

export const getAdvert = async (req, res) => {
  const { advertId } = req.params;
  const userId = req.currentUser._id;
  const advert = await Advert.findOne({ _id: advertId, createdBy: userId });
  if (!advert) throwRequestError(ERROR_TYPE.NOT_FOUND, "Resource not found!");
  return sendSuccessResponse(res, { advert, message: "Resource found" });
};

export const updateAdvert = async (req, res) => {
  const { advertId } = req.params;
  const userId = req.currentUser._id;
  const isBodyEmpty = checkEmptyRequestBody(req.body);
  if (isBodyEmpty)
    throwRequestError(
      ERROR_TYPE.UNPROCESSABLE_ENTITY,
      "No update data provided"
    );
  const advert = await Advert.findOneAndUpdate(
    { _id: advertId, createdBy: userId },
    req.body,
    { new: true }
  );
  if (!advert) throwRequestError(ERROR_TYPE.NOT_FOUND, "Resource not found!");
  return sendSuccessResponse(res, { message: "Update successful", advert });
};

export const deleteAdvert = async (req, res) => {
  const { advertId } = req.params;
  const userId = req.currentUser._id;
  const advert = await Advert.findOneAndDelete({
    _id: advertId,
    createdBy: userId,
  });
  if (!advert) throwRequestError(ERROR_TYPE.NOT_FOUND, "Resource not found!");
  return sendSuccessResponse(res, { message: "Delete successful", advert });
};
