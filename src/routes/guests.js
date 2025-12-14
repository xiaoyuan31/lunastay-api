import express from "express";
import { getGuests } from "../controllers/guestsController.js";

const router = express.Router();

router.get("/", getGuests);

export default router;