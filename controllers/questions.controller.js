const db = require("../models");

exports.getQuestions = async (req, res) => {
    try {
        const questions = await db.question.findAll()
        res.status(200).json(questions)
    } catch (err) {
        console.log(err)
    }
}