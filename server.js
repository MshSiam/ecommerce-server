const express = require("express")
const cors = require("cors")
const app = express()
const http = require("http")
const server = http.createServer(app)
const { Server } = require("socket.io")
require("./connection")

const io = new Server(server, {
  cors: "*",
  methods: "*"
})

const User = require("./models/User")
const userRoutes = require("./routes/userRoutes")

app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use("/users", userRoutes)

server.listen(5000, () => {
  console.log("server is running")
})
