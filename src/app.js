import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import roomsRoutes from "./routes/rooms.js";
import bookingsRoutes from "./routes/bookings.js";
import guestsRoutes from "./routes/guests.js";
import authRoutes from "./routes/auth.js";
import profileRoutes from "./routes/profile.js";
import paymentMethodRoutes from "./routes/paymentmethod.js";
import contactRoutes from "./routes/contact.js";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/rooms", roomsRoutes);
app.use("/api/bookings", bookingsRoutes);
app.use("/api/guests", guestsRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/paymentmethod", paymentMethodRoutes);
app.use("/api/contact", contactRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`LunaStay API running on port ${PORT}`));