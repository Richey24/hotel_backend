const mongoose = require("mongoose");
const { User } = require("./schema");
const express = require("express");
const registerController = require("./controller/userController/registerController");
const loginController = require("./controller/userController/loginController");
const createRoomController = require("./controller/roomController/create");
const dotenv = require("dotenv");
const deleteRoomController = require("./controller/roomController/deleteOne");
const getAllRoomsController = require("./controller/roomController/getAll");
const getOneRoomController = require("./controller/roomController/getOne");
const { promisify } = require("util");
const jwt = require("jsonwebtoken");
const getCustomer = require("./controller/userController/getCustomer");
const deleteCustomer = require("./controller/userController/deleteCustomer");
const updateCustomer = require("./controller/userController/updateCustomer");
const createBookingController = require("./controller/bookingController/createBooking");
const getAvailableRoomsController = require("./controller/roomController/getAvailable");
const editOneRoomController = require("./controller/roomController/editOne");
const updateBookingController = require("./controller/bookingController/updateBooking");
const removeBookingController = require("./controller/bookingController/removeBooking");
const refreshController = require("./controller/bookingController/refreshController");
const getAllBookingController = require("./controller/bookingController/getAllBooking");
const getOneBookingController = require("./controller/bookingController/getOneBooking");
const app = express();

//dotenv
dotenv.config({ path: "./.env" });

app.use(express.json());
const port = process.env.PORT || 5000;

const url =
  "mongodb+srv://richey:Rejoice11@cluster0.uq2iuaj.mongodb.net/hotel?retryWrites=true&w=majority";

const start = () => {
  try {
    mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    app.listen(port, () => console.log(`listening at ${port}`));
  } catch (error) {
    console.log(error);
  }
};

start();

//JWT RESTRICTION

const restrict = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decode = await promisify(jwt.verify)(token, process.env.TOKEN_KEY);
    const user = await User.findById(decode.id);
    req.user = user;
  } catch (err) { }

  next();
};

app.get("/", (req, res) => res.send("hello"));
//USER ROUTES
const userRouter = express.Router()
userRouter
  .get("/get/all", async (req, res) => {
    const user = await User.find({});
    const count = await User.count({})
    res.json({ count: count, user });
  })
  .post("/register", registerController)
  .post("login", loginController)
  .get("/get/:id", getCustomer)
  .delete("/delete/:id", deleteCustomer)
  .put("/update/:id", updateCustomer)

//BOOKING ROUTES
const bookRouter = express.Router()
bookRouter
  .get("/get/all", getAllBookingController)
  .get("/get/:cusId", getOneBookingController)
  .post("/create", createBookingController)
  .put("/update/:id", updateBookingController)
  .delete("/remove/:id", removeBookingController)
  .get("/refresh", refreshController)

/// FOR HANDING ROOM CREATION WITH AND WITHOUT JWT 
const roomRouter = express.Router();
roomRouter
  .post("/create", createRoomController)
  .get("/get/all", getAllRoomsController)
  .get("/get/:roomNum", getOneRoomController)
  .delete("/delete/:roomNum", deleteRoomController);

app.use("/room", roomRouter);
app.use("/user", userRouter)
app.use("/book", bookRouter)
