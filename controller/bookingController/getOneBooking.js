const { Booking } = require("../../schema");

const getOneBookingController = async (req, res) => {
  if (req.user) {
    if (!req.params.cusId) {
      res.status(203).json({
        message:
          "send the customer id of the room you wish to get in the request parameter",
      });
    } else {
      const book = await Booking.findOne({ cusId: req.params.cusId });
      res.status(200).json(book);
    }
  } else {
    res.status(401).json({ status: false, message: "unauthorized access" });
  }
};

module.exports = getOneBookingController;
