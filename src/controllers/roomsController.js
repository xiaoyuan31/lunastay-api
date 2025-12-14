import { db } from "../config/db.js";

export const getRooms = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM rooms where active_status = 1");
    res.json({data : rows});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const searchRooms = async (req, res) => {
  try {
    const { roomtype, guestnum, checkin, checkout } = req.body;
    const [rows] = await db.query("SELECT  r.*,  rp.photo_url FROM rooms r LEFT JOIN room_photos rp ON r.room_id = rp.room_id AND rp.is_cover = 1 WHERE  r.room_type = "+roomtype +" AND r.max_guests >= "+guestnum+" AND r.active_status = 1 AND r.room_id NOT IN ( SELECT b.room_id FROM booking b  WHERE NOT ( b.check_out_date <= '"+checkin+"' OR b.check_in_date >= '"+checkout+"'))");
    res.json({data : rows});
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export const getRoomDetail = async (req, res) => {
  try {
    const room_id = req.params.id;
    const [rows] = await db.query("SELECT  rooms.*, roomtypes.name as room_type_name, roomtypes.description as room_type_description, roomtypes.short_code FROM rooms, roomtypes where roomtypes.id = rooms.room_id and rooms.active_status = 1 and room_id = ? ",[room_id]);
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}


export const getGallery = async (req, res) => {
  try {
    const room_id = req.params.id;
    const [rows] = await db.query(" SELECT  room_photos.photo_id, room_photos.photo_url FROM rooms, room_photos where room_photos.room_id = rooms.room_id and rooms.room_id = ?",[room_id]);
    res.json({data : rows});
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}