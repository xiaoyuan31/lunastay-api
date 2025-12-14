import { db } from "../config/db.js";

export const getGuests = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM guests where active_status = 1 order by guest_id desc limit 20");
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getProfile = async (req, res) => {
  try {
    const userid = req.user.id;
    const [rows] = await db.query("SELECT * FROM guests where guest_id=? and active_status = 1",[ userid ]);
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const saveProfile = async (req, res) => {
  try {
    const userid = req.user.id;
    const { full_name, email, phone_number, date_of_birth }= req.body;
    await db.query("UPDATE guests set full_name = ?, email= ?, phone_number=?, date_of_birth = ? where guest_id = ? ",
      [ full_name, email, phone_number, date_of_birth, userid ]);
     res.json({ message: "Profile updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
