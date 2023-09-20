import { login, register } from "../controllers/authController.js";
import { Router } from "express";

// Create a new router
const authRouter = Router();

// Bind routes to controllers
authRouter.post("/login", login);
authRouter.post("/register", register);

// Export the router
export default authRouter;
