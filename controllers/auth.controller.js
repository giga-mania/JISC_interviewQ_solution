const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const db = require("../models")
const config = require("../config/auth.config")
const User = db.user


exports.register = (req, res) => {
    User.create({
        username: req.body.username,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 10)
    }).then((user) => {
        if (user) {
            res.status(200).send({id: user.id, username: user.username, email: user.email})
        }
    }).catch((err) => {
        res.status(500).send({message: err})
    })
}


exports.login = (req, res) => {
    if (!(req.body.username && req.body.password)) {
        return res.status(404).send({
            message: "Auth credentials were not provided!"
        })
    }

    User.findOne({where: {username: req.body.username}})
        .then((user) => {
            if (!user) {
                return res.status(404).send({message: "User not found!"})
            }

            let passwordIsValid = bcrypt.compareSync(req.body.password, user.password)

            if (!passwordIsValid) {
                return res.status(401).send({
                    message: "Invalid password!"
                })
            }

            let token = jwt.sign({id: user.id}, config.privateKey, {
                expiresIn: 86400
            })

            res.status(200).send({
                id: user.id,
                username: user.username,
                email: user.email,
                accessToken: token
            })
        })
        .catch((err) => {
            res.status(500).send({message: err})
        })
}


exports.refresh = (req, res) => {

}
