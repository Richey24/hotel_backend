const { User } = require('../schema')

const updateCustomer = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.body.id, req.body, { new: true })
        res.status(200).json(user)
    } catch (error) {
        console.log(error);
    }
}

module.exports = updateCustomer