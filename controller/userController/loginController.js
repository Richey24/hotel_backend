const { User } = require("../../schema");
const jwt = require("jsonwebtoken");

const loginController = async (req, res) => {
  let user = await User.findOne({ username: req.body.username });
  if (user) {
    let validate = user.password === req.body.password;
    if (validate) {
      const { password, ...mainUser } = user._doc
      if (user.role === "0") user.role = "Employee";
      if (user.role === "1") user.role = "Customer";
      //signing jwt
      // const token = jwt.sign({ id: user._id }, process.env.TOKEN_KEY, {
      //   expiresIn: "90d",
      // });
      res.status(200).json(mainUser);
    } else {
      res.status(201).json({ message: "incorrect password" });
    }
  } else {
    res.status(404).json({ message: "no user found with this email" });
  }
};

module.exports = loginController;
