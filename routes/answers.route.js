const router = require("express").Router()
const {postUserAnswers, postTrainerAnswers} = require("../controllers")

router.post("/user", postUserAnswers)
router.post("/trainer", postTrainerAnswers)


module.exports = router