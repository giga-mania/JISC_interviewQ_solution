const db = require("../models")
const User = db.user


exports.checkDuplicateUsernameOrEmail = async (req, res, next) => {
    console.log(req.body)
    const username = await User.findOne({where: {username: req.body.username}})
    if (username) {
        return res.status(400).send({
            message: "User with given username already exists!"
        })
    }

    const email = await User.findOne({where: {email: req.body.email}})
    if (email) {
        return res.status(400).send({
            message: "User with given email already exists!"
        })
    }

    next()
}