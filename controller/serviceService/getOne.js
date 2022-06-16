const { Room } = require("../../schema");

const getOneRoomController = async (req, res) => {
  // if (req.user) {
  const { id } = req.params;
  try {
    let request = await Room.findById({
      id,
    });
    res.status(200).json({ status: true, message: "", request });
  } catch (err) {
    res.status(404).json({ status: false, message: err });
  }
  // } else {
  // res.status(401).json({ status: false, message: "unauthorized access" });
  // }
};

module.exports = getOneRoomController;
