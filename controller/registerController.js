const { User } = require("../schema");
const jwt = require("jsonwebtoken");

const registerController = async (req, res) => {
  if (req.body.role === undefined) {
    res.status(203).json({ message: "please input role" });
    return;
  }

  let check = await User.findOne({ username: req.body.username });
  if (!check) {
    let user = await User.create(req.body);
    if (user.role === "0") user.role = "Employee";
    if (user.role === "1") user.role = "Customer";
    //signing jwt
    const token = jwt.sign({ id: user._id }, process.env.TOKEN_KEY, {
      expiresIn: "90d",
    });
    const { password, ...mainUser } = user._doc
    res.status(200).json({ mainUser, token });
  } else {
    res.status(201).json({ message: "already registered" });
  }
};

module.exports = registerController;
