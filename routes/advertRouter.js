import { Router } from "express";
import {
  getAllAdverts,
  createAdvert,
  getAdvert,
  updateAdvert,
  deleteAdvert,
  getUserAdverts,
} from "../controllers/advertController.js";
import { validateToken } from "../middlewares/index.js";

const advertRouter = Router();

advertRouter.route("/").get(getAllAdverts).post(validateToken, createAdvert);
advertRouter.route("/my-adverts").get(validateToken, getUserAdverts);
advertRouter
  .route("/:advertId")
  .get(validateToken, getAdvert)
  .patch(validateToken, updateAdvert)
  .delete(validateToken, deleteAdvert);

export default advertRouter;
