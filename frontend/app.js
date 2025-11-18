//Locates search button on homepage
const searchbtn = document.getElementById("searchbtn");


//sends user search criteria to API 
async function handleSearch(event){
    event.preventDefault()

    //Gets value in search fields
    const citysearch = document.getElementById("citysearch").value;
    //console.log(`Sending for Search ${citysearch}`)
    
    const provsearch = document.getElementById("provincesearch").value;
    //console.log(`Sending for Search ${provsearch}`)
    
    const foodsearch = document.getElementById("foodsearch").value;
    //console.log(`Sending for Search${foodsearch}`)
    
    //searches file/API based on criteria in search fields
    const data = await FetchData(citysearch,provsearch, foodsearch)

    //console.log("Attempting to display the data")
    displayResults(data);
}

//Fetches restaurant Data based on user search criteria 
async function FetchData(city, prov, style){
const destUrl = `https://cityeats.onrender.com/restaurants?city=${city}&prov=${prov}&style=${style}`
//console.log("starting initial await")
const arr = await fetch(destUrl)
        .then((res)=> {
            //console.log(`Recieved a response from backened Backend: ${res}`)
            //console.log(res)
            return res
        })
        .catch((err) => {console.log(err)})
    const data = await arr.json()
    //console.log("parsed the data")
return data;
}

//Displays the results of the data passed in
function displayResults(data){
    const resultsDiv = document.getElementById("search-results");
    //There should be not data in the HTML but removes just in case
    resultsDiv.innerHTML="";

    //console.log(`Here is what im attempting to display! ${data}`)
    
    /*
    console.log("Type of data:", typeof data);
    console.log("Is array?", Array.isArray(data));
    console.log("Data value:", data);
    */

    //normalize the data so its always an array to iterate over
    let results;
    if (Array.isArray(data)){
        results = data;
    }
    else{
        results = [data]
    }
    try {
        for(i=0;i<results.length;i++){
            //Creating html element for display and displaying it
            const card = document.createElement("div");
            card.classList.add("result");
            card.innerHTML=`<h3> ${results[i].name}</h3>
                            <p> ${results[i].style.slice(0,3).join(" - ")|| '<br>'}</p> 
                            <p> Rating:${results[i].rating}/5</p>
                            <p> ${results[i].address}</p>
                            <img src=${results[i].image}>`
                            //`<p>${results[i].address.street}, ${results[i].address.city}, ${results[i].address.zipcode}</p>`                 
            resultsDiv.appendChild(card)
                    }
                }
    catch (err){
        console.log("Given data is neither object or array ERROR", err)
    }


}

function searchOnClick(button){
    button.addEventListener("click", handleSearch)
}


//Adds event listener to search button
searchOnClick(searchbtn)

//debug purposes
console.log("We made it we found the End!")
