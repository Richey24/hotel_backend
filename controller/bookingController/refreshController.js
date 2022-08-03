const { Room, Booking } = require("../../schema");

const refreshController = async (req, res) => {
  if (req.user) {
    let date = new Date().getTime();
    try {
      const rooms = await Room.find({ isAvailable: false });
      rooms.forEach(async (room) => {
        let book = await Booking.findById(room.bkId);
        let checkDate = new Date(book.checkOutDate).getTime();
        if (date > checkDate) {
          await Room.findOneAndUpdate(
            { roomNum: book.roomNum },
            { isAvailable: true, bkId: "" }
          );
        }
      });
      res
        .status(200)
        .json({ message: `successfully updated all expired bookings` });
    } catch (err) {
      res.status(500).json({ error: err });
    }
  } else {
    res.status(401).json({ status: false, message: "unauthorized access" });
  }
};

module.exports = refreshController;
