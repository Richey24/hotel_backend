const { User } = require('../../schema')

const getCustomer = async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.params.id })
        res.status(200).json(user)
    } catch (error) {
        console.log(error);
    }
}

module.exports = getCustomer