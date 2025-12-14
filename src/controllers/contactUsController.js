
import { db } from "../config/db.js";

export const contactUs = async (req, res) => {
  try {
    const [hotels] = await db.query("Select * from hotels limit 1");   
    res.json(hotels[0]);
} catch (error) {
    res.status(500).json({ error: error.message });
  }
};