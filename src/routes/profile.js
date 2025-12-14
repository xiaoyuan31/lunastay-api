import express from "express";
import { getProfile, saveProfile } from "../controllers/guestsController.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

router.get("/", verifyToken, getProfile);
router.post("/", verifyToken, saveProfile);

export default router;