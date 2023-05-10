const router = require("express").Router()
const {getQuestions} = require("../controllers/index")

router.get("/questions", getQuestions)


module.exports = router