const { json } = require("express")

const API_url = process.env.API_URL

async function apiFetch(city,style) {
    console.log(`Attemplting to query the API with ${city} & ${style}`)
    if (city=="" && style!="")
    {
        const queriedResults = await fetch(`${API_url}?category=${style}`)
        .then((response) =>{return response.json()})
        .catch((err) =>{console.log(err)})

        console.log("Returned a result for style")
        console.log(JSON.stringify(queriedResults))
        return queriedResults;
    }
    else if (city!="" && style == "")
    {
        const queriedResults = await fetch(`${API_url}?name=${city}`)
        .then((response) =>{return response.json()})
        .catch((err) =>{console.log(err)})

        console.log("returned a result for just city")
        console.log(JSON.stringify(queriedResults))

        return queriedResults;
    }
    else if(city!="" && style != "")
    {
        const queriedResults = await fetch(`${API_url}?name=${city}&category=${style}`)
        .then((response) =>{return response.json()})
        .catch((err) =>{console.log(err)})

        console.log("Returned a result for both city and style")
        console.log(JSON.stringify(queriedResults))
        return queriedResults;
    } 
    else {
        console.log("Error you shouldnt have gotten here!")
    }    
}

function trimAPIData(data){
    let trimmedData =[]
    let tobeTrim;
    if (Array.isArray(data) === true){
        tobeTrim = data;
    }
    else{
        tobeTrim =[data]
    }

    for(let i=0;i< tobeTrim.length;i++)
    {
        let restaurant ={
            name: tobeTrim[i].restaurantName,
            style: tobeTrim[i].type,
            /*address: {
                street: tobeTrim[i].address.street,
                city: tobeTrim[i].address.city,
                zipcode: tobeTrim[i].address.zipcode*/
            address: tobeTrim[i].address
            }
        
        trimmedData.push(restaurant);
    }
        console.log(trimmedData)    

    return trimmedData;
}



module.exports = {apiFetch, trimAPIData};