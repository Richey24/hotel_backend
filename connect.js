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

//RESTRICT

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
app.get("/get/all", async (req, res) => {
    const user = await User.find({});
    res.json(user);
});

/// FOR HANDING ROOM CREATION
const rommRouter = express.Router();

rommRouter
    .post("/", restrict, createRoomController)
    .get("/all", restrict, getAllRoomsController)
    .get("/:roomNum", restrict, getOneRoomController)
    .delete("/:roomNum", restrict, deleteRoomController);

app.post("/register", registerController);
app.post("/login", loginController);
app.use("/room", rommRouter);
