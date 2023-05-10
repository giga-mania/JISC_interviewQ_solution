const db = require("../models")
const {createToken, hashPassword, verifyPassword} = require("../utils/index")
const User = db.user


exports.register = async (req, res) => {
    try {
        const hashedPassword = await hashPassword(req.body.password)
        console.log(hashedPassword)
        const userData = {
            email: req.body.email.toLowerCase(),
            username: req.body.username,
            password: hashedPassword
        }

        const newUser = await User.create(userData)

        if (newUser) {
            res.status(200).json({
                id: newUser.id,
                username: newUser.username,
                email: newUser.email
            })
        }
    } catch (err) {
        res.status(400).send({
            message: "There was a problem when creating an account!",
            error: err
        })
    }

}


exports.login = async (req, res) => {
    if (!(req.body.username && req.body.password)) {
        return res.status(404).json({
            message: "Auth credentials were not provided!"
        })
    }

    try {
        const user = await User.findOne({where: {username: req.body.username}})
        if (!user) return res.status(403).json({message: "Wrong username or password!"})

        let passwordIsValid = await verifyPassword(req.body.password, user.password)
        if (!passwordIsValid) return res.status(401).json({message: "Wrong username or password!"})

        let token = createToken(user)

        return res.status(200).send({
            id: user.id,
            username: user.username,
            hasAnswered: user.hasAnswered,
            email: user.email,
            isAdmin: user.isAdmin,
            accessToken: token,
        })
    } catch (err) {
        res.status(500).send({message: err.message})
    }
}




