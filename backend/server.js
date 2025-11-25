require('dotenv').config()
const express = require('express')
const {connectDB, getDB} = require("./database/connection.js")


const app = express();

const cors = require('cors')
const port = process.env.PORT || 5000;

const restRoute = require('./routes/restaurant.js')
const userRoutes = require('./routes/user.js')

//middleware
app.use(cors())
app.use(express.json())

//routes
app.use('/restaurants', restRoute)
app.use('/users', userRoutes)


app.get("/", (req,res)=>{
    res.send("Hello World!")
})


try{
connectDB()
} catch (err){
    console.log("failed to connect to DB", err)
}

app.listen(port), () =>{
    console.log(`CityEats backend is listening at http://localhost:${port}`)}




