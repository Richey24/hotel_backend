const mongoose = require("mongoose");

const User = mongoose.model(
  "User",
  new mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: false,
    },
    role: {
      type: String,
      required: true,
    },
    bactive: {
      type: Boolean,
      required: false,
    },
    cusname: {
      type: String,
      required: false,
    },
    address: {
      type: String,
      required: false,
    },
    dob: {
      type: String,
      required: false,
    },
    gender: {
      type: String,
      required: false,
    },
    email: {
      type: String,
      required: false,
    },
    phone: {
      type: String,
      required: false,
    },
  }),
  "user"
);

const Room = mongoose.model(
  "Room",
  new mongoose.Schema({
    isAvailable: {
      type: Boolean,
      required: true,
    },
    roomNum: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      required: false,
    },
    cusId: {
      type: String,
      required: false,
    },
    bkId: {
      type: String,
      required: false,
    },
  }),
  "room"
);

const Booking = mongoose.model(
  "Booking",
  new mongoose.Schema({
    checkInDate: {
      type: Date,
      required: true,
    },
    checkOutDate: {
      type: Date,
      required: true,
    },
    roomNum: {
      type: Number,
      required: true,
    },
    cusId: {
      type: String,
      required: true,
    },
  }),
  "booking"
);

const Services = mongoose.model(
  "Service",
  new mongoose.Schema({
    bookings: { type: mongoose.Schema.Types.ObjectId, ref: "Booking" },
    status: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  }),
  "service"
);

module.exports = {
  User,
  Room,
  Booking,
  Services,
};
