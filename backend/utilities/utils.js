const API_url = process.env.API_URL
const API_key = process.env.API_KEY
/*
THIS is the original way NON-POST Request
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
*/

//GOOGLE PLACES API NEEDS POST REQUEST
async function apiFetch(city, style) {
    const queriedResults = await fetch(`${API_url}`,
        {
            method: 'POST',
            headers:{
                "Content-type": "application/json",
                'X-Goog-Api-Key':`${API_key}`,
                'X-Goog-FieldMask': 'places.displayName,places.formattedAddress,places.types',
            },
            body: JSON.stringify({
                textQuery: `${style} restaurants in ${city}`
            }),
        }
    )
    const googData = await queriedResults.json()
    //console.log("DATA FROM GOOGLE")
    //console.log(googData)
    return googData;
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
        let place = tobeTrim[i]
        let reststyle = null;

        //Search types array for only restaurant main styles not all offered
        if (Array.isArray(place.types)){
            reststyle = place.types.find((mainStyles)=>mainStyles.endsWith("_restaurant"))
        }


        let restaurant ={
            name: tobeTrim[i].displayName.text || "Unknown",
            style: reststyle || 'restaurant',
            address: tobeTrim[i].formattedAddress || "N/A"
            }
        trimmedData.push(restaurant);
    }
        console.log(trimmedData)    

    return trimmedData;
}



module.exports = {apiFetch, trimAPIData};