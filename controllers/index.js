const {login, register} = require("./auth.controller")
const {postTrainerAnswers, postUserAnswers} = require("./answers.controller")
const {getQuestions} = require("./questions.controller")
const {getRatings} = require("./ratings.controller")

module.exports = {
    login,
    register,
    getRatings,
    getQuestions,
    postUserAnswers,
    postTrainerAnswers
}