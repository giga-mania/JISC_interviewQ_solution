const express = require("express")
const cors = require("cors")
const db = require("./models")
const routes = require("./routes")

const app = express()

// db.sequelize.sync({force: true}).then(() => {
//     db.user.create({
//         username: "salyut",
//         email: "salyut@mail.com",
//         password: "superPass"
//     })
// })

app.use(cors({origin: "*"}))
app.use(express.json())


app.use("/api", routes.authRoute)


module.exports = app