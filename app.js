const express = require("express")
const cors = require("cors")
const db = require("./models")
const routes = require("./routes")

const app = express()

// Sync__Questions
// const questions = require("./data/questions")
// const filteredQuestions = questions.map((question) => ({question: question.question}))
// db.sequelize.sync({force: true}).then(() => {
//     db.question.bulkCreate(filteredQuestions)
// })

// Sync__Trainers
// const trainers = require("./data/trainers")
// db.trainer.sync({force: true}).then(() => {
//     db.trainer.bulkCreate(trainers)
// })

// db.sequelize.sync({alter: true})
//     .then(() => {})
//     .catch(console.log)

app.use(cors({origin: "*"}))
app.use(express.json())


app.use("/api", routes.authRoute)
app.get("/api/questions", async (req, res) => {
    const questions = await db.question.findAll()
    res.status(200).json(questions)
})
app.post("/api/answers/user", async (req, res) => {
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

        res.json({message: "inserted successfully"})
    } catch (e) {
        console.log(e)
    }
})

app.post("/api/answers/trainer", async (req, res) => {
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
        res.json({message: "Trainer added successfully"})
    } catch (e) {
        console.log(e)
    }
})


app.get("/api/results", async (req, res) => {
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
})


module.exports = app

