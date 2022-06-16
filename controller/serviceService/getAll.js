const { Room } = require("../../schema");

const getAllRoomsController = async (req, res) => {
  // if (req.user) {
  try {
    let requests = await Room.find();
    const total = await Room.find().count();
    res
      .status(200)
      .json({
        status: true,
        message: "Requests successfully fetched!",
        requests,
        total,
      });
  } catch (err) {
    res.status(400).json({ status: false, message: err });
  }
};

module.exports = getAllRoomsController;
