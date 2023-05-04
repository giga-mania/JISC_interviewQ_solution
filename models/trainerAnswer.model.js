module.exports = (sequelize, Sequelize) => {
    return sequelize.define("TrainerAnswer", {
            answer: {
                type: Sequelize.BOOLEAN,
                allowNull: false
            }
        },
        {
            timestamps: false
        })
}