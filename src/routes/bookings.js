import express from "express";
import { getBookings, getBookingByID, saveBooking } from "../controllers/bookingsController.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();


router.get("/", verifyToken, getBookings);
router.get("/:id/", verifyToken, getBookingByID);
router.post("/", verifyToken, saveBooking);


export default router;