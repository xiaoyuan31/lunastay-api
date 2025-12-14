import express from "express";
import { getRoomDetail, getRooms, searchRooms,getGallery } from "../controllers/roomsController.js";
import { getRoomTypes } from "../controllers/roomtypesController.js";

const router = express.Router();

router.get("/", getRooms);
router.get("/types/", getRoomTypes);
router.post("/search/", searchRooms);
router.get("/:id/", getRoomDetail);
router.get("/:id/gallery",getGallery);

export default router;