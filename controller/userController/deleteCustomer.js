const { User } = require("../../schema");

const deleteCustomer = async (req, res) => {
  if (req.user) {
    try {
      const msg = await User.findByIdAndDelete(req.params.id, { new: true });
      res.status(200).json(msg);
    } catch (error) {
      console.log(error);
    }
  } else {
    res.status(401).json({ status: false, message: "unauthorized access" });
  }
};

module.exports = deleteCustomer;
