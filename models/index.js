const Sequelize = require("sequelize");
const config = require("../config/db.config")


const sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
    host: config.HOST,
    dialect: config.DIALECT,
})

const db = {}

db.Sequelize = Sequelize
db.sequelize = sequelize

db.user = require("../models/user.model")(sequelize, Sequelize)
db.refreshToken = require("../models/refreshToken.model")(sequelize, Sequelize)

db.refreshToken.belongsTo(db.user, {
    foreignKey: 'userId',
    targetKey: 'id'
});
db.user.hasOne(db.refreshToken, {
    foreignKey: 'userId',
    targetKey: 'id'
})

module.exports = db