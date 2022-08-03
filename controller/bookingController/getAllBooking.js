const { Booking } = require("../../schema");

const getAllBookingController = async (req, res) => {
  if (req.user) {
    const room = await Booking.find({});
    const count = await Booking.count({});
    res.status(200).json({ count: count, room });
  } else {
    res.status(401).json({ status: false, message: "unauthorized access" });
  }
};

module.exports = getAllBookingController;
