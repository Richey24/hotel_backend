const { Room } = require("../../schema");

const getAllRoomsController = async (req, res) => {
  if (req.user) {
    try {
      let rooms = await Room.find();
      let count = await Room.count({});
      res
        .status(200)
        .json({
          status: true,
          count: count,
          message: "Room successfully fetched!",
          rooms,
        });
    } catch (err) {
      res.status(400).json({ status: false, message: err });
    }
  } else {
    res.status(401).json({ status: false, message: "unauthorized access" });
  }
};

module.exports = getAllRoomsController;
