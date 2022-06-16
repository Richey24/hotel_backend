const { Services } = require("../../schema");

const createServiceController = async (req, res) => {
  // if (req.user) {
  const { bookingId:bookings, description, status } = req.body;
  try {
    let service = await Services.create({
      bookings,
      description,
      status,
    });
    res.status(200).json({
      status: true,
      message: "Request successfully created",
      service,
    });
  } catch (err) {
    res.status(400).json({ status: false, message: err });
  }
};

module.exports = createServiceController;
