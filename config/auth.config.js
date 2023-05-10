module.exports = {
    privateKey: process.env.JWT_SECRET_KEY,
    jwtExpiration: 3600,
    jwtRefreshExpiration: 8400
}