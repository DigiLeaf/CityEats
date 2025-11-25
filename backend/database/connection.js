require('dotenv').config({path: __dirname+'/../.env'});
const mongoose = require("mongoose")
const connectionURI = process.env.MONGO_URI//"mongodb+srv://Admin:Admin@cluster0.pxyp7oh.mongodb.net/?appName=Cluster0"


async function connectDB() {
  try {
    console.log(connectionURI)
    await mongoose.connect(connectionURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error("MongoDB connection failed:", err);
  }
}



module.exports = { connectDB };