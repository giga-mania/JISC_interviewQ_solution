const router = require("express").Router()
const {getRatings} = require("../controllers")


router.get("/ratings", getRatings)


module.exports = router