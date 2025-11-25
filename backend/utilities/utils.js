const API_url = process.env.API_URL
const API_key = process.env.API_KEY


async function apiFetch(city, prov, style) {
    const queriedResults = await fetch(`${API_url}`,
        {
            //Google Place API wants search request as a POST request
            method: 'POST',
            headers:{
                "Content-type": "application/json",
                'X-Goog-Api-Key':`${API_key}`,
                'X-Goog-FieldMask': 'places.displayName,places.formattedAddress,places.types,places.photos,places.rating,places.websiteUri',
            },
            body: JSON.stringify({
                textQuery: `${style} restaurants in ${city} ${prov}`,
                pageSize: 12,
            }),
        }
    )
    const googData = await queriedResults.json()
    //console.log("DATA FROM GOOGLE")
    //console.log(googData)
    return googData;
}

function imgGather(photoReference){
    if (!photoReference) return null;

    return `https://places.googleapis.com/v1/${photoReference}/media?key=${API_key}&maxHeightPx=400&maxWidthPx=560`

}

function trimAPIData(data){
    let trimmedData =[]
    let tobeTrim;
    //ensures data is an array so its easily iterable
    if (Array.isArray(data) === true){
        tobeTrim = data;
    }
    else{
        tobeTrim =[data]
    }

    //rebuild object with only data frontend wants
    for(let i=0;i< tobeTrim.length;i++)
    {
        let imageRef = null
        //gets the first image related to the restaurant if any
        if (tobeTrim[i].photos && tobeTrim[i].photos.length > 0){
            imageRef = tobeTrim[i].photos[0].name
        }
        let restaurant ={
            name: tobeTrim[i].displayName.text || "Unknown",
            style: getRestTypes(tobeTrim[i].types) || 'restaurant',
            rating: tobeTrim[i].rating || null,
            address: tobeTrim[i].formattedAddress || "N/A",
            image: imgGather(imageRef) || null,
            uri: tobeTrim[i].websiteUri || null

            }
        trimmedData.push(restaurant);
    }
        //console.log(trimmedData)


    return trimmedData;
}

function getRestTypes(placeTypes){
    if (!Array.isArray(placeTypes)) return ['restaurant'];

    //Gets all main restaurant types from API data
    const matches = placeTypes.filter(type =>{return type.endsWith("_restaurant")})

        let shortType =[]

    //removes _restaurant from type and capitalizes first letter
    for (let i=0;i<matches.length;i++)
    {
        let cleaned  = matches[i].replace('_restaurant', '')
        cleaned = cleaned.charAt(0).toUpperCase() + cleaned.slice(1)
        shortType.push(cleaned)
    }
    return shortType;
}


module.exports = {apiFetch, trimAPIData};