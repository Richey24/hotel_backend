const { Booking } = require('../../schema')

const getAllBookingController = async (req, res) => {
    const room = await Booking.find({})
    const count = await Booking.count({})
    res.status(200).json({ count: count, room })
}

module.exports = getAllBookingController