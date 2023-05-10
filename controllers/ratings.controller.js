const db = require("../models");


exports.getRatings = async(req, res) => {
    const {userid} = req.query

    try {
        const userAnswers = await db.userAnswer.findAll({where: {UserId: userid}, order: [["QuestionId", "ASC"]]})
        const trainersAnswers = await db.trainerAnswer.findAll({order: [["TrainerId", "ASC"], ["QuestionId", "ASC"]]})

        function getUserAnswer(userAnswers, index) {
            return userAnswers[index].answer
        }

        function groupTrainers(trainerAnswers) {
            let result = []
            // trainerAnswers is an Array of Objects each representing answer on one of ten questions by each trainer.
            // Questions are fixed length of ten. Answers are ordered by TrainerId and QuestionId.
            // Creating two-dimensional array, each nested array representing grouped answers by same trainer.
            // In each group answers are ordered by QuestionId.
            for(let i = 0; i < trainerAnswers.length - 1; i+=10) {
                result.push((trainerAnswers.slice(i, i+10)))
            }
            return result
        }
        const grouped = groupTrainers(trainersAnswers)

        function calculateTrainerPoints(grouped) {
            const result = []
            for (let i = 0; i < grouped.length; i++) {
                let point = 0
                for (let j = 0; j < grouped[i].length - 1; j++) {
                    if(grouped[i][j].answer === getUserAnswer(userAnswers, j)) {
                        point++
                    }
                }
                result.push({trainerId: grouped[i][0].TrainerId, point})
            }
            return result
        }
        const pointed = calculateTrainerPoints(grouped)

        function orderByPoint(pointed) {
            return pointed.sort((a, b) => b.point - a.point)
        }
        const ordered = orderByPoint(pointed)

        res.json(ordered)
    } catch (e) {
        console.log(e)
    }
}