const mongoose = require("mongoose");

const User = mongoose.model(
  "User",
  new mongoose.Schema({
    username: {
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
    city: {
      type: String,
      required: false,
    },
    state: {
      type: String,
      required: false,
    },
    zip: {
      type: Number,
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
    booking: { type: mongoose.Schema.Types.ObjectId, ref: "Booking" },
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
Services.set("toObject", { virtuals: true });
Services.set("toJSON", { virtuals: true });

module.exports = {
  User,
  Room,
  Booking,
  Services
};
