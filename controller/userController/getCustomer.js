const { User } = require("../../schema");

const getCustomer = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.id });
    const { password, ...mainUser } = user._doc;
    if (mainUser.role === "0") mainUser.role = "Employee";
    if (mainUser.role === "1") mainUser.role = "Customer";
    res.status(200).json(mainUser);
  } catch (error) {
    console.log(error);
  }
};

module.exports = getCustomer;
