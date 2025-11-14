const express = require('express')
const router = express.Router();

const {apiFetch, trimAPIData} =require('../utilities/utils.js')

router.get("/", async (req,res)=>{
    try{
    //Querying url for the search params to make request to API only for desire results
    const cityparam = req.query.name
    const styleparam = req.query.username


    console.log("recieved request from /restaurants")
    console.log(`Query parameters are City: ${cityparam} and Style: ${styleparam}`)

    const resultarr = await apiFetch(cityparam,styleparam)
    
    const trimmedData = trimAPIData(resultarr.places)



    console.log("about to return api results")
    
    res.json(trimmedData)
    console.log(trimmedData)
    console.log("returned the results")
    }
    catch (err){
        console.log("There is an error in the /restuarants route", err)
       
    }
    
})

module.exports = router;