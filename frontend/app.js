//Locates search button on homepage
const searchbtn = document.getElementById("searchbtn");


//sends user search criteria to API 
async function handleSearch(event){
    event.preventDefault()

    //Gets value in search fields
    const citysearch = document.getElementById("citysearch").value;
    const foodsearch = document.getElementById("foodsearch").value;

    //searches file/API based on criteria in search fields
    const data = await FetchData(citysearch,foodsearch)

    displayResults(data);
}


//Fetches restaurant Data based on user search criteria 
async function FetchData(city, style){
let arr = await fetch('http://localhost:5000/restaurants')
        .then((res)=>res.json())
        .then((data)=> {console.log(data)
            return data;
        })
        .catch((err) => {console.log(err)})

return arr;
}

//Displays the results of the data passed in
function displayResults(data){
    const resultsDiv = document.getElementById("search-results");
    //There should be not data in the HTML but removes just in case
    resultsDiv.innerHTML="";

    //Dynamically generate div based on search result
    data.forEach((place) => {
        const card = document.createElement("div");
        card.classList.add("result");
        card.innerHTML=`<h3> ${place.name}</h3>
                        <p> ${place.style}</p>`
        resultsDiv.appendChild(card)
    });

}

function searchOnClick(button){
    button.addEventListener("click", handleSearch)
}




//Adds event listener to search button
searchOnClick(searchbtn)

//debug purposes
console.log("We made it we found the End!")
