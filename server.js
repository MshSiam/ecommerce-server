const express = require("express")
require("dotenv").config()
const cors = require("cors")
const app = express()
const stripe = require("stripe")(process.env.STRIPE_SECRERT_KEY)
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
const imageRoutes = require("./routes/imagesRoute")
const orderRoutes = require("./routes/orderRoute")

app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use("/users", userRoutes)
app.use("/products", productRoutes)
app.use("/images", imageRoutes)
app.use("/orders", orderRoutes)

// payment route
app.post("/create-payment", async (req, res) => {
  const { amount } = req.body

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100,
      currency: "usd",
      payment_method_types: ["card"]
    })
    res.status(200).json(paymentIntent)
  } catch (error) {
    res.status(400).json(error.message)
  }
})

server.listen(5000, () => {
  console.log("server is running")
})
