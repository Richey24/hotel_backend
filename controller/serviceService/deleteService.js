const { Services } = require("../../schema");

const deleteService = async (req, res) => {
  if (req.user) {
    const { id } = req.params;
    const stat = await Services.findByIdAndDelete(id);
    res.status(200).json(stat);
  } else {
    res.status(401).json({ status: false, message: "unauthorized access" });
  }
};

module.exports = deleteService;
