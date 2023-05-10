const router = require("express").Router()
const {checkDuplicateUsernameOrEmail} = require("../middleware")
const {register, login} = require("../controllers");


router.post("/register", checkDuplicateUsernameOrEmail, register)
router.post("/login", login)


module.exports = router





