import { db } from "../config/db.js";

export const getBookings = async (req, res) => {
  try {
    const userId = req.user.id;
    const [bookings] = await db.query("SELECT b.booking_id, g.full_name, r.room_number, r.room_id, b.check_in_date, b.check_out_date, b.nights, b.total_price, b.payment_method, b.booking_status, b.payment_status FROM booking b JOIN guests g ON b.guest_id = g.guest_id JOIN rooms r ON b.room_id = r.room_id WHERE g.guest_id = ? and b.active_status = 1 ORDER BY b.check_in_date DESC;", [userId]);   
    res.json({ data: bookings});
} catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getBookingByID = async (req, res) => {
  const bookingid = req.params.id;
  try {
    const userId = req.user.id;
    const [bookings] = await db.query("SELECT b.booking_id, g.full_name, r.room_number, r.room_id, b.check_in_date, b.check_out_date, b.nights, b.total_price, b.payment_method, pm.name as payment_method_name, b.booking_status, b.payment_status FROM booking b JOIN guests g ON b.guest_id = g.guest_id JOIN rooms r ON b.room_id = r.room_id JOIN paymentmethods pm ON b.payment_method = pm.paymentmethod_id WHERE b.booking_id = ? and g.guest_id = ? and b.active_status = 1  ORDER BY b.check_in_date DESC", [bookingid,userId]);   
    res.json(bookings[0]);
} catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const saveBooking = async (req, res) => {
  try {
    const {
      room_id,
      check_in_date,
      check_out_date,
      payment_method,
      fullname,
      email,
      phone
    } = req.body;

    const guest_id = req.user.id;

    // Calculate nights
    const checkIn = new Date(check_in_date);
    const checkOut = new Date(check_out_date);

    const nights = Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24));

    if (nights <= 0) {
      return res.status(400).json({ message: "Invalid date range" });
    }

    // Get room price
    const [room] = await db.query(
      "SELECT base_price FROM rooms WHERE room_id = ?",
      [room_id]
    );

    if (!room.length) {
      return res.status(404).json({ message: "Room not found" });
    }

    const basePrice = parseFloat(room[0].base_price);

    // Total price
    const totalPrice = nights * basePrice;

    // Save booking
    await db.query(
      `INSERT INTO booking 
      (guest_id, room_id, check_in_date, check_out_date, nights, total_price, payment_method)
      VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        guest_id,
        room_id,
        check_in_date,
        check_out_date,
        nights,
        totalPrice,
        payment_method
      ]
    );

    await db.query(
      `UPDATE guests SET full_name = ?, email = ?, phone_number = ? WHERE guest_id = ?
     `,
      [
        fullname,
        email,
        phone,
        guest_id
      ]
    );

    res.json({
      message: "Booking saved successfully",
      nights,
      basePrice,
      totalPrice
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
