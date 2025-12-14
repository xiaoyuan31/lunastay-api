import { db } from "../config/db.js";

export const getRoomTypes = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM roomtypes where active_status = 1");
    res.json({data : rows});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

