const db = require("../models");


exports.postUserAnswers = async (req, res) => {
    const {userAnswers, userId} = req.body
    try {
        await db.userAnswer.bulkCreate(
            userAnswers.map((userAnswer) => ({
                UserId: userId,
                QuestionId: userAnswer.question,
                answer: userAnswer.answer
            }))
        )
        const user = await db.user.findOne({where: {id: userId}})
        await user.update({hasAnswered: true})

        res.json({message: "Answers has been submitted!"})
    } catch (e) {
        console.log(e)
    }
}


exports.postTrainerAnswers = async (req, res) => {
    const {trainerAnswers, trainerName} = req.body
    try {
        const newTrainer = await db.trainer.create({
            name: trainerName
        })
        await db.trainerAnswer.bulkCreate(
            trainerAnswers.map((trainerAnswer) => ({
                TrainerId: newTrainer.id,
                QuestionId: trainerAnswer.question,
                answer: trainerAnswer.answer
            }))
        )

        res.json({message: "Trainer answers has been submitted!"})
    } catch (e) {
        console.log(e)
    }
}