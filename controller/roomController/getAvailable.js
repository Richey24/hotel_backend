const { Room } = require("../../schema");

const getAvailableRoomsController = async (req, res) => {
  if (req.user) {
    try {
      let rooms = await Room.find({
        isAvailable: true,
      });
      res
        .status(200)
        .json({ status: true, message: "Room successfully fetched!", rooms });
    } catch (err) {
      res.status(400).json({ status: false, message: err });
    }
  } else {
    res.status(401).json({ status: false, message: "unauthorized access" });
  }
};

module.exports = getAvailableRoomsController;
