import express from "express";
import { contactUs } from "../controllers/contactUsController.js";

const router = express.Router();

router.get("/", contactUs);

export default router;