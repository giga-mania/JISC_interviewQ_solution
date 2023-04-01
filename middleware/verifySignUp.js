const db = require("../models")
const User = db.user


exports.checkDuplicateUsernameOrEmail = async (req, res, next) => {

    const username = await User.findOne({where: {username: req.body.username}})
    if (username) {
        return res.status(400).send({
            message: "Failed! Username is already in use!"
        })
    }

    const email = await User.findOne({where: {email: req.body.email}})
    if (email) {
        return res.status(400).send({
            message: "Failed! Email is already in use!"
        })
    }

    next()
}