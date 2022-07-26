const { Room, Booking } = require("../../schema");

const removeBookingController = async (req, res) => {
  if (!req.params.id) {
    res
      .status(203)
      .json({
        message:
          "send the id of the booking you wish to remove in the request parameter",
      });
  } else {
    const book = await Booking.findByIdAndDelete(req.params.id);
    // const room = await Room.findOneAndUpdate({ roomNum: book.roomNum }, { isAvailable: true, bkId: "" }, { new: true })
    res.status(200).json(book);
  }
};

module.exports = removeBookingController;
