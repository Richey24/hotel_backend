const { Booking } = require("../../schema");

const updateBookingController = async (req, res) => {
  if (req.user) {
    if (!req.params.id) {
      res.status(203).json({
        message:
          "send the id of the booking you wish to update in the request parameter",
      });
    } else {
      const room = await Booking.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
      res.status(200).json(room);
    }
  } else {
    res.status(401).json({ status: false, message: "unauthorized access" });
  }
};

module.exports = updateBookingController;
