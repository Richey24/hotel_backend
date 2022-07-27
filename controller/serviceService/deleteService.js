const { Services } = require("../../schema");

const deleteService = async (req, res) => {
  const { id } = req.params;
  const stat = await Services.findByIdAndDelete(id);
  res.status(200).json(stat);
};

module.exports = deleteService;
