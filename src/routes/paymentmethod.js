import express from "express";
import { getPaymentMethod } from "../controllers/paymentMethodController.js";

const router = express.Router();

router.get("/", getPaymentMethod);

export default router;