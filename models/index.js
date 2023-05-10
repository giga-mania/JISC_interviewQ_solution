const Sequelize = require("sequelize");
const config = require("../config/db.config")


const sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
    host: config.HOST,
    dialect: config.DIALECT,
})


sequelize.authenticate().then(() => {
    console.log('Sequelize connection has been established successfully!');
}).catch(error => {
    console.error('Unable to connect to the database:', error);
})


const db = {}

db.Sequelize = Sequelize
db.sequelize = sequelize

db.user = require("../models/user.model")(sequelize, Sequelize)
db.trainer = require("../models/trainer.model")(sequelize, Sequelize)
db.question = require("../models/question.model")(sequelize, Sequelize)
db.trainerAnswer = require("../models/trainerAnswer.model")(sequelize, Sequelize)
db.userAnswer = require("../models/userAnswer.model")(sequelize, Sequelize)

db.trainer.belongsToMany(db.question, {through: db.trainerAnswer})
db.question.belongsToMany(db.trainer, {through: db.trainerAnswer})

db.user.belongsToMany(db.question, {through: db.userAnswer})
db.question.belongsToMany(db.user, {through: db.userAnswer})


module.exports = db