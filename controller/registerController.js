const User = require("../schema");
const jwt = require("jsonwebtoken");

const registerController = async (req, res) => {
  let check = await User.findOne({ username: req.body.username });
  if (!check) {
    let user = await User.create(req.body);

    //signing jwt
    const token = jwt.sign({ id: user._id }, process.env.TOKEN_KEY, {
      expiresIn: "90d",
    });
    user.password = "";
    res.status(200).json({ user, token });
  } else {
    res.status(201).json({ message: "already registered" });
  }
};

module.exports = registerController;
