const User = require('../schema')

const loginController = async (req, res) => {
    let user = await User.findOne({ username: req.body.username })
    if (user) {
        let validate = user.password === req.body.password
        if (validate) {
            user.password = ""
            res.status(200).json(user)
        } else {
            res.status(201).json({ message: "incorrect password" })
        }
    } else {
        res.status(404).json({ message: "no user found with this email" })
    }
}

module.exports = loginController