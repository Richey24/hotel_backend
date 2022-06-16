const { Services } = require("../../schema");

const editOneServiceController = async (req, res) => {
  const { id } = req.params;
  try {
    let service = await Services.findByIdAndUpdate(
      id,
      {...req.body},
      { new: true }
    );
    res.status(200).json({ status: true, message: "Request Update!", service });
  } catch (err) {
    res.status(404).json({ status: false, message: err });
  }

};

module.exports = editOneServiceController;
