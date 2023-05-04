module.exports = (sequelize, Sequelize) => {
    return sequelize.define("Question", {
        question: {
            type: Sequelize.STRING,
            allowNull: false
        }
    }, {
        timestamps: false
    })
}