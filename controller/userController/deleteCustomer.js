const { User } = require('../../schema')

const deleteCustomer = async (req, res) => {
    try {
        const msg = await User.findByIdAndDelete(req.params.id, { new: true })
        res.status(200).json(msg)
    } catch (error) {
        console.log(error);
    }
}

module.exports = deleteCustomer;