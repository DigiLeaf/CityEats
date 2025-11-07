const express = require('express')
const app = express();

const cors = require('cors')
const axios = require ('axios')
const jsondata = require ('./rest.json')
const port =5000;

app.use(cors())
app.get("/", (req,res)=>{
    res.send("Hello World!")
})

app.get("/restaurants", (req,res)=>{
    console.log("recieved request fro /restaurants")
    res.send(JSON.stringify(jsondata))
    
})

app.listen(port, () =>{
    console.log(`CityEats backend is listening at http://localhost:${port}`)
})

