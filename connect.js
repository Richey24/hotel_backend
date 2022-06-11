const mongoose = require("mongoose");
const { User } = require("./schema");
const express = require("express");
const registerController = require("./controller/registerController");
const loginController = require("./controller/loginController");
const createRoomController = require("./controller/roomController/create");
const dotenv = require("dotenv");
const deleteRoomController = require("./controller/roomController/deleteOne");
const getAllRoomsController = require("./controller/roomController/getAll");
const getOneRoomController = require("./controller/roomController/getOne");
const { promisify } = require("util");
const jwt = require("jsonwebtoken");
const getCustomer = require("./controller/getCustomer");
const deleteCustomer = require("./controller/deleteCustomer");
const updateCustomer = require("./controller/updateCustomer");
const createBookingController = require("./controller/bookingController/createBooking");
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
app.get("/get/all", async (req, res) => {
    const user = await User.find({});
    res.json(user);
});
app.post("/register", registerController);
app.post("/login", loginController);
app.post("/get/one", getCustomer)
app.delete("/delete/customer", deleteCustomer)
app.put("/update/customer", updateCustomer)

//ROOM ROUTES
app.post("/create/room", createRoomController)
app.get("/get/room", getAllRoomsController)
app.get("/room/:roomNum", getOneRoomController)
app.delete("/room/:roomNum", deleteRoomController)

//BOOKING ROUTES
app.post("/create/booking", createBookingController)

/// FOR HANDING ROOM CREATION WITH JWT 
const rommRouter = express.Router();

rommRouter
    .post("/", restrict, createRoomController)
    .get("/all", restrict, getAllRoomsController)
    .get("/:roomNum", restrict, getOneRoomController)
    .delete("/:roomNum", restrict, deleteRoomController);

app.use("/room", rommRouter);
