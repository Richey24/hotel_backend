const { Services } = require("../../schema");

const createServiceController = async (req, res) => {
  // if (req.user) {
  const { bookingId, description, status } = req.body;
  let check = await Services.findOne({ roomNum: roomNum });
  if (!check) {
    try {
      let service = await Services.create({
        bookingId,
        description,
        status,
      });
      res
        .status(200)
        .json({
          status: true,
          message: "Request successfully created",
          service,
        });
    } catch (err) {
      res.status(400).json({ status: false, message: err });
    }
  } else {
    res.status(403).json({ message: "Already Created!" });
  }
  // } else {
  // res.status(401).json({ status: false, message: "unauthorized access" });
  // }
};

module.exports = createRoomController;
