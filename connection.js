require("dotenv").config()

const mongoose = require("mongoose")

const connectionStr = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.woosd.mongodb.net/newEcommerce?retryWrites=true&w=majority`

mongoose
  .connect(connectionStr, { useNewUrlParser: true })
  .then((data) => console.log("db connected"))
  .catch((err) => console.log(err))

mongoose.connection.on("error", (err) => {
  console.log(err)
})
