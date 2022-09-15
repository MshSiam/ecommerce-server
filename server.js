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
const Product = require("./models/Product")
const userRoutes = require("./routes/userRoutes")
const productRoutes = require("./routes/productRoute")

app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use("/users", userRoutes)
app.use("/products", productRoutes)

server.listen(5000, () => {
  console.log("server is running")
})
