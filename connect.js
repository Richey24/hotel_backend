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
const updateBookingController = require("./controller/bookingController/updateBooking");
const removeBookingController = require("./controller/bookingController/removeBooking");
const refreshController = require("./controller/bookingController/refreshController");
const getAllBookingController = require("./controller/bookingController/getAllBooking");
const getOneBookingController = require("./controller/bookingController/getOneBooking");
const createServiceController = require("./controller/serviceService/create");
const getAllServiceController = require("./controller/serviceService/getAll");
const getOneServiceController = require("./controller/serviceService/getOne");
const editOneServiceController = require("./controller/serviceService/editOne");
const cors = require("cors");
const deleteService = require("./controller/serviceService/deleteService");
const app = express();

//dotenv
dotenv.config({ path: "./environ/.env" });

app.use(express.json());
app.use(cors());
const port = process.env.PORT || 5000;

try {
  mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  app.listen(port, () => console.log(`listening at ${port}`));
} catch (error) {
  console.log(error);
}

//JWT RESTRICTION

const restrict = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decode = await promisify(jwt.verify)(token, process.env.TOKEN_KEY);
    const user = await User.findById(decode.id);
    req.user = user;
  } catch (err) {}

  next();
};

app.get("/", (req, res) => res.send("hello"));

//USER ROUTES

const userRouter = express.Router();
userRouter
  .get("/get/all", async (req, res) => {
    const user = await User.find({});
    for (let i = 0; i < user.length; i++) {
      if (user[i].role === "0") user[i].role = "Employee";
      if (user[i].role === "1") user[i].role = "Customer";
    }
    const count = await User.count({});
    res.json({ count: count, user });
  })
  .post("/register", registerController)
  .post("/login", loginController)
  .get("/get/:id", getCustomer)
  .delete("/delete/:id", deleteCustomer)
  .put("/update/:id", updateCustomer);

/// FOR HANDING SERVICE REQUEST CREATION WITH AND WITHOUT JWT

const serviceRouter = express.Router();
serviceRouter
  .post("/create", createServiceController)
  .get("/get/all", getAllServiceController)
  .get("/get/:id", getOneServiceController)
  .put("/update/:id", editOneServiceController)
  .delete("/delete/:id", deleteService);

//BOOKING ROUTES
const bookRouter = express.Router();
bookRouter
  .get("/get/all", getAllBookingController)
  .get("/get/:cusId", getOneBookingController)
  .post("/create", createBookingController)
  .put("/update/:id", updateBookingController)
  .delete("/remove/:id", removeBookingController)
  .get("/refresh", refreshController);

/// FOR HANDING ROOM CREATION WITH AND WITHOUT JWT
const roomRouter = express.Router();
roomRouter
  .post("/create", createRoomController)
  .get("/get/all", getAllRoomsController)
  .get("/get/:roomNum", getOneRoomController)
  .delete("/delete/:roomNum", deleteRoomController);

app.use("/room", roomRouter);
app.use("/user", userRouter);
app.use("/book", bookRouter);
app.use("/service", serviceRouter);
