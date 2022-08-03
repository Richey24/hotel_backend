const { Services } = require("../../schema");

const editOneServiceController = async (req, res) => {
  if (req.user) {
    const { id } = req.params;
    try {
      let service = await Services.findByIdAndUpdate(
        id,
        { ...req.body },
        { new: true }
      );
      res
        .status(200)
        .json({ status: true, message: "Request Update!", service });
    } catch (err) {
      res.status(404).json({ status: false, message: err });
    }
  } else {
    res.status(401).json({ status: false, message: "unauthorized access" });
  }
};

module.exports = editOneServiceController;
