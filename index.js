require("dotenv").config()
const http = require("http")
const app = require("./app")


const server = http.createServer(app)
const PORT = process.env.PORT


server.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`)
})

