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
app.get("/api/questions", async  (req, res) => {
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
        res.json({message: "inserted successfully"})
    } catch (e) {
        console.log(e)
    }
})

app.post("/api/answers/trainer", async (req, res) => {
    const {trainerAnswers, trainerId} = req.body
    try {
        await db.trainerAnswer.bulkCreate(
            trainerAnswers.map((trainerAnswer) => ({
                TrainerId: trainerId,
                QuestionId: trainerAnswer.question,
                answer: trainerAnswer.answer
            }))
        )
        res.json({message: "inserted successfully"})
    } catch (e) {
        console.log(e)
    }
})



module.exports = app

