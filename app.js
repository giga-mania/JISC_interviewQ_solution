const express = require("express")
const cors = require("cors")
const routes = require("./routes")

const app = express()


app.use(cors({origin: "*"}))
app.use(express.json())


app.use("/api", routes.authRoute)
app.use("/api", routes.questionsRoute)
app.use("/api", routes.ratingsRoute)
app.use("/api/answers", routes.answersRoute)



module.exports = app

