const { Room } = require("../../schema");

const getOneRoomController = async (req, res) => {
  // if (req.user) {
  const { roomNum } = req.params;
  try {
    let room = await Room.findOne({
      roomNum,
    });
    res.status(200).json({ status: true, message: "", room });
  } catch (err) {
    res.status(404).json({ status: false, message: err });
  }
  // } else {
  // res.status(401).json({ status: false, message: "unauthorized access" });
  // }
};

module.exports = getOneRoomController;
