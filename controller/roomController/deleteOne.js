const { Room } = require("../../schema");

const deleteRoomController = async (req, res) => {
  // if (req.user) {
  const { roomNum } = req.params;
  if (roomNum) {
    Room.findOneAndDelete({ roomNum })
      .then(() => {
        res.status(200).json({ status: true, message: "Room deleted!" });
      })
      .catch((err) => {
        res.status(200).json({ status: false, message: err });
      });
  } else {
    res.status(403).json({ message: "valid params required" });
  }
  // } else {
  // res.status(401).json({ status: false, message: "unauthorized access" });
  // }
};

module.exports = deleteRoomController;
