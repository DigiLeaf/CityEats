const express = require('express')
require('dotenv').config()

const app = express();

const cors = require('cors')
const port = process.env.PORT || 5000;

const restRoute = require('./routes/restaurant.js')


app.use(cors())
app.use('/restaurants', restRoute)


app.get("/", (req,res)=>{
    res.send("Hello World!")
})


app.listen(port, () =>{
    console.log(`CityEats backend is listening at http://localhost:${port}`)
})

