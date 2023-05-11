const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const config = require("../config/auth.config")

const createToken = (user) => {
    if (!user) {
        throw new Error("No user info provided")
    }

    return jwt.sign(
        {
            id: user.id,
            email: user.email,
            iss: 'api.jisc',
            aud: 'api.jisc'
        },
        config.privateKey,
        {algorithm: "HS256", expiresIn: "1h"}
    )
}


const hashPassword = (password) => {
    return new Promise((resolve, reject) => {
        bcrypt.genSalt(12, (err, salt) => {
            if(err) reject(err)

            bcrypt.hash(password, salt, (err, hash) => {
                if(err) reject(err)

                resolve(hash)
            })
        })
    })
}


const verifyPassword = (passwordAttempt, hashedPassword) => {
    return bcrypt.compare(passwordAttempt, hashedPassword)
}


module.exports = {
    createToken,
    hashPassword,
    verifyPassword
}