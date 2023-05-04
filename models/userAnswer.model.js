module.exports = (sequelize, Sequelize) => {
    return sequelize.define("UserAnswer", {
            answer: {
                type: Sequelize.BOOLEAN,
                allowNull: false
            }
        },
        {
            timestamps: false
        })
}