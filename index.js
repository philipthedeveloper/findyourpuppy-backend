import "express-async-errors";
import express from "express";
import dotenv from "dotenv";
import {
  requestLogger,
  methodChecker,
  routeNotFound,
} from "./middlewares/index.js";

// Configure the app to be able to read env variables
dotenv.config({ path: ".env" });

// Create a new express app
const app = express();

// Read env variables with the global process.env
const PORT = process.env.PORT || 3001;
const NODE_ENV = process.env.NODE_ENV;
const IPV4_ADDRESS = process.env.IPV4_ADDRESS;
const HOSTNAME = NODE_ENV === "development" ? IPV4_ADDRESS : null;

// Set up middlewares for the app
app.use(requestLogger); // Log any incoming request to the console
app.use(methodChecker); // Checks if the incoming request method is supported

// All route that are not handled from the top will be handled here
app.all("*", routeNotFound); // Returns a 404 response for such routes

// Start the app
app.listen(PORT, HOSTNAME, () => {
  console.log(`App started on http://${HOSTNAME}:${PORT}`);
});
