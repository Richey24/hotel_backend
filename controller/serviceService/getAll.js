const { Services } = require("../../schema");

const getAllServiceController = async (req, res) => {
  try {
    let requests = await Services.find();
    res.status(200).json({
      status: true,
      message: "Requests successfully fetched!",
      requests,
    });
  } catch (err) {
    res.status(400).json({ status: false, message: err });
  }
};

module.exports = getAllServiceController;
