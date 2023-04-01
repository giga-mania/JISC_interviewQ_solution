const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const {v4: uuidv4} = require("uuid")

const db = require("../models")
const config = require("../config/auth.config")
const User = db.user
const RefreshToken = db.refreshToken


exports.register = async (req, res) => {

    try {
        const user = await User.create({
            username: req.body.username,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 10)
        })
        if (user) {
            res.status(200).send({id: user.id, username: user.username, email: user.email})
        }
    } catch (err) {
        res.status(500).send({message: err})
    }

}


exports.login = async (req, res) => {
    if (!(req.body.username && req.body.password)) {
        return res.status(404).send({
            message: "Auth credentials were not provided!"
        })
    }

    try {
        const user = await User.findOne({where: {username: req.body.username}})
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
            expiresIn: config.jwtExpiration
        })
        let refreshToken = await RefreshToken.createToken(user)


        return res.status(200).send({
            id: user.id,
            username: user.username,
            email: user.email,
            accessToken: token,
            refreshToken
        })
    } catch (err) {
        res.status(500).send({message: err.message})
    }
}


exports.refresh = async (req, res) => {
    const requestToken = req.body.refreshToken

    if (!requestToken) {
        return res.status(403).send({message: "Refresh token is required!"})
    }

    try {
        const token = await RefreshToken.findOne({where: {token: requestToken}})
        if (!token) {
            return res.status(403).send({message: "Refresh token not in database!"})
        }

        if (RefreshToken.verifyExpiration(token)) {
            return res.status(403).send({message: "Refresh token is expired. Login in again!"})
        }

        const user = await token.getUser()
        let newAccessToken = jwt.sign({id: user.id}, config.privateKey, {
            expiresIn: config.jwtExpiration
        })

        return res.status(200).send({
            accessToken: newAccessToken,
            refreshToken: await RefreshToken.createToken(user)
        })

    } catch (err) {
        res.stat(500).send({message: err})
    }
}



