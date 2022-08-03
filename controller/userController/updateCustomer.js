const { User } = require("../../schema");

const updateCustomer = async (req, res) => {
  if (req.user) {
    try {
      const user = await User.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
      res.status(200).json(user);
    } catch (error) {
      console.log(error);
    }
  } else {
    res.status(401).json({ status: false, message: "unauthorized access" });
  }
};

module.exports = updateCustomer;
