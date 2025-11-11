async function apiFetch(city,style) {
    console.log(`Attemplting to query the API with ${city} & ${style}`)
    if (city=="" && style!="")
    {
        const queriedResults = await fetch(`https://jsonplaceholder.typicode.com/users?username=${style}`)
        .then((response) =>{return response.json()})
        .catch((err) =>{console.log(err)})

        console.log("Returned a result for style")
        console.log(JSON.stringify(queriedResults))
        return queriedResults;
    }
    else if (city!="" && style == "")
    {
        const queriedResults = await fetch(`https://jsonplaceholder.typicode.com/users?name=${city}`)
        .then((response) =>{return response.json()})
        .catch((err) =>{console.log(err)})

        console.log("returned a result for just city")
        console.log(JSON.stringify(queriedResults))

        return queriedResults;
    }
    else if(city!="" && style != "")
    {
        const queriedResults = await fetch(`https://jsonplaceholder.typicode.com/users?name=${city}&username=${style}`)
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




module.exports = apiFetch;