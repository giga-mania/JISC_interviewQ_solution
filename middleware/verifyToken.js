const jwt = require("jsonwebtoken")
const config = require("../config/auth.config.js")


const catchError = (err, res) => {
    const {TokenExpiredError} = jwt
    if(err instanceof TokenExpiredError) {
        return res.status(401).send({message: "Unauthorized! Access token is expired"})
    }

    return res.status(401).send({message: "Unauthorized!"})
}


exports.verifyToken = (req, res, next) => {
    const token = req.headers["x-access-token"];

    if(!token) {
        return res.status(400).send({
            message:"No token provided!"
        })
    }

    jwt.verify(token, config.privateKey, (err, decoded) => {
        if(err) {
            return catchError(err, res)
        }

        req.userId = decoded.id
        next()
    })
}


