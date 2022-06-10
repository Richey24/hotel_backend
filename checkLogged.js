const { promisify } = require("util");
const User = require("./schema");
const jwt = require('jsonwebtoken');

export const checklogged = async (req, res, next) => {
  console.log(req.headers.token);
  try {
    // console.log(req.session)
    const decode = await promisify(jwt.verify)(
      req.headers.token,
      process.env.TOKEN_KEY
    );
    const user = await User.findById(decode.id);
    req.user = user;
  } catch (err) {}

  next();
};
