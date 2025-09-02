import { Router } from "express";
import { redirector, shortenURI } from "../controllers/shortner.controllers.js";

export const shortnerRouter = Router();

shortnerRouter.route("/shorten").post(shortenURI)
shortnerRouter.route("/validate/:path").get(redirector)