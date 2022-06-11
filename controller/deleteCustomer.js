const { User } = require('../schema')

const deleteCustomer = async (req, res) => {
    try {
        const msg = await User.findByIdAndDelete(req.body.id, { new: true })
        res.status(200).json(msg)
    } catch (error) {
        console.log(error);
    }
}

module.exports = deleteCustomer