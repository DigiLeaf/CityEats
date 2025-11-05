//Locates search button on homepage
const searchbtn = document.getElementById("searchbtn");


//Locates all results loaded on page and makes a collection
const resultlist = document.getElementsByClassName("result");


function handleSearch(event){
    event.preventDefault()
    //testing/sanity check
    console.log("button clicked!")
    const citysearch = document.getElementById("citysearch").value;
    const foodsearch = document.getElementById("foodsearch").value;

    const data = mockFetchData(citysearch,foodsearch)
    displayResults(data);
}

//Test objects to generate mock data
let restuarant ={name:"Angelos",style:"Italian"}
let restuarant2 ={name:"Bop's",style:"Custard"}
let restuarant3 ={name: "El Ranchito",style:"Mexican"}

function mockFetchData(city,style){
    let arr = [restuarant,restuarant2, restuarant3]
    return arr;
}


function displayResults(data){
    const resultsDiv = document.getElementById("search-results");
    //There should be not data in the HTML but removes just in case
    resultsDiv.innerHTML="";
    //Dynamically generate div based on search result
    data.forEach(place =>{
        const card = document.createElement("div");
        card.classList.add("result");
        card.innerHTML=`<h3>${place.name}</h3>
                        <p>${place.style}</p>`
        resultsDiv.appendChild(card)
    })

}

function searchOnClick(button){
    button.addEventListener("click", handleSearch)
}


//Adds event listener to search button
searchOnClick(searchbtn)





//debug purposes
console.log("We made it we found the End!")
