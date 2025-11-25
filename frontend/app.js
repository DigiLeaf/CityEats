
//Locates buttons on webpage
const searchbtn = document.getElementById("searchbtn");
const loadingdiv = document.getElementById("loading");
const faileddiv = document.getElementById("failedsearch")

const createbtn = document.getElementById("createbtn")
const loginbtn = document.getElementById("loginbtn")
const logoutbtn = document.getElementById("logoutbtn")
const deletebutton = document.getElementById("deletebtn")
const showfavbutton = document.getElementById("showfavbtn")

//sends user search criteria to API 
async function handleSearch(event){
    try{    
        event.preventDefault()
        //Makes sure to always hide failed search on a new query
        faileddiv.style.display ="none"

        //Gets value in search fields
        const citysearch = document.getElementById("citysearch").value;
        //console.log(`Sending for Search ${citysearch}`)
        
        const provsearch = document.getElementById("provincesearch").value;
        //console.log(`Sending for Search ${provsearch}`)
        
        const foodsearch = document.getElementById("foodsearch").value;
        //console.log(`Sending for Search${foodsearch}`)
        
        loadingdiv.style.display = "block"
        //searches file/API based on criteria in search fields
        const data = await FetchData(citysearch,provsearch, foodsearch)

        if (data || (data.length > 0)){
            //console.log("Attempting to display the data")
            displayResults(data);
            
        }
        else{
            //displays if search returns no results
            faileddiv.style.display ="block"   
        }
    }
    catch (err){
        console.log(err)
    }
    finally{
        loadingdiv.style.display = "none"
    }


}

//Fetches restaurant Data based on user search criteria 
async function FetchData(city, prov, style){
const destUrl =  `https://cityeats-backend.onrender.com/restaurants?city=${city}&prov=${prov}&style=${style}`

//console.log("starting initial await")
const arr = await fetch(destUrl)
        .then((res)=> {
            //console.log(`Recieved a response from backened Backend: ${res}`)
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

    //normalize the data so its always an array to iterate over
    let results;
    if (Array.isArray(data)){
        results = data;
    }
    else{
        results = [data]
    }
    try {
        for(let i=0;i<results.length;i++){
            //Creating html element for display and displaying it
            const card = document.createElement("div");
            card.classList.add("result");
            card.innerHTML=`<a class='rest_uri' href=${results[i].uri}></a>
                            <h3 class="rest_name" >${results[i].name}</h3>
                            <p class="rest_style" >${results[i].style.slice(0,3).join(" - ")|| '<br>'}</p> 
                            <p class="rest_rating" >Rating:${results[i].rating}/5</p>
                            <p class="rest_address">${results[i].address}</p>
                            <img class="rest_img"  src=${results[i].image || "./Resources/MissingImg.jpg"}>
                            <input id="fav-rest" type="submit" value="Favorite" style="z-index:10">`
                
            //Adds event listener to entire card so entire card is clickable.
            card.addEventListener('click', () =>{
                window.open(`${results[i].uri}`,'_blank')
            })
            //adds event listener to favorite button and removes website popup from button.
            card.querySelector('#fav-rest').addEventListener('click', function (e) {
                e.preventDefault();
                e.stopPropagation();
                console.log(this.querySelector('#rest_name'.textContent))
                sendPUTRequest("/addFav",card) })
            
        resultsDiv.appendChild(card)
        }
        }
        
    catch (err){
        console.log("Given data is neither object or array ERROR", err)
    }
}

//handles login/ user creation
async function sendPOSTRequest(route){
    //gets user inputted fields
    const name = document.getElementById('name').value
    const password = document.getElementById('password').value
    const display = document.getElementById('displayresult');
    
    try {
        const response = await fetch(`https://cityeats-backend.onrender.com/users${route}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, password })
        });

        const data = await response.json()
        if (!response.ok) {
            display.textContent = data.message || "Invalid request.";
        }
        else{
            //if creating a user, notifies user was created. prompts user to log in
            if(route ==='/create-user'){
            display.textContent = data.message ||`User ${data.name} successfully created. Please login to access more features.`
            }
            else{
            // if logging in, notifies of successful login and shows user only features.
            display.textContent = data.message ||`User ${data.name} successfully logged in`
            deletebutton.style.display="inline-block"
            showfavbutton.style.display="inline-block"
            logoutbtn.style.display="inline-block"
            loginbtn.style.display="none"
            createbtn.style.display = "none"

            }
        }
    }
    catch (err) {
        console.log(err);
        document.getElementById("displayresult").textContent="Server Error"
        }
}

//handles deleting user data
async function sendDELRequest(route, card = undefined){
    const name = document.getElementById('name').value
    const display = document.getElementById('displayresult');
    let response;
    try {
        if (!card){
            //if not called by unfavorite button its called by the delete account button and wipes all of the user's data
        response = await fetch(`https://cityeats-backend.onrender.com/users${route}/${name}`, {
            method: "DELETE",
        })}
        else{

           //console.log("CARD:", card); 
           const favToRemove = {
                rest_address: card.querySelector('.rest_address').textContent,
                //rest_uri: card.querySelector('.rest_uri').href,

            };
            //called by unfavorite button and removes only specified favorite
            response = await fetch(`https://cityeats-backend.onrender.com/users${route}/${name}`, {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(favToRemove)  
            });
        }

        const data = await response.json()
        console.log(data)
        if (!response.ok) {
            display.textContent = data.message || "Invalid request.";
        }
        else{
            //called by delete account button; hides all registered user functions
            if (!card){
            display.textContent = `${name}'s data successfully deleted`
            deletebutton.style.display = "none"
            showfavbutton.style.display = "none"
            }
            //called by unfavorite; registered user acitons still available
            else{
                display.textContent = `Favorite successfully removed`
            }
        }

    }
    catch (err) {
        console.log(err);
        document.getElementById("displayresult").textContent="Server Error"
        }
}


//Handles updating Favorites list
async function sendPUTRequest(route, card){
    //get all fields needed to send to backend
    const user = document.getElementById('name').value
    const newFav ={
        rest_name: card.querySelector('.rest_name').textContent,
        rest_style: card.querySelector('.rest_style').textContent,
        rest_rating: card.querySelector('.rest_rating').textContent,
        rest_address: card.querySelector('.rest_address').textContent,
        rest_image: card.querySelector('.rest_img').src,
        rest_uri: card.querySelector('.rest_uri').href,
    }

    const display = document.getElementById('displayresult');

    try {
        console.log("attempting to add to favs", newFav) 
        const response = await fetch(`https://cityeats-backend.onrender.com/users${route}/${user}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newFav)
        });

        const data = await response.json()
        console.log(data)
        if (!response.ok) {
            display.textContent = data.message || "Invalid request.";
        }
        else{
            display.textContent = `${user}'s favorites successfully updated`
        }

    }
    catch (err) {
        console.log(err);
        document.getElementById("displayresult").textContent="Server Error"
        }
}

function displayFavorites(data){
    const resultsDiv = document.getElementById("search-results");
    //There should be not data in the HTML but removes just in case
    resultsDiv.innerHTML="";

    //console.log(`Heres favorites im attempting to display! ${data}`)

    //normalize the data so its always an array to iterate over
    let results;
    if (Array.isArray(data)){
        results = data;
    }
    else{
        results = [data]
    }
    try {
        for(let i=0;i<results.length;i++){
            //Creating html element for display and displaying it
            const card = document.createElement("div");
            card.classList.add("result");
            card.innerHTML=`<a class='rest_uri' href=${results[i].rest_uri}></a>
                            <h3 class="rest_name" >${results[i].rest_name}</h3>
                            <p class="rest_style" >${results[i].rest_style || '<br>'}</p> 
                            <p class="rest_rating" >${results[i].rest_rating}</p>
                            <p class="rest_address">${results[i].rest_address}</p>
                            <img class="rest_image"  src=${results[i].rest_image || "./Resources/MissingImg.jpg"}>
                            <input id="unfav-rest" type="submit" value="unFavorite" style="z-index:10">`
                
            //Adds event listener to entire card so entire card is clickable.
            card.addEventListener('click', () =>{
                window.open(`${results[i].rest_uri}`,'_blank')
            })
            //adds event listener to unfavorite button and removes website popup from button.
            card.querySelector('#unfav-rest').addEventListener('click', function (e) {
                e.preventDefault();
                e.stopPropagation();
                console.log(this.querySelector(('.rest_name').textContent))
                sendDELRequest("/delFav",card) })

        resultsDiv.appendChild(card)
        }
    }   
    catch (err){
        console.log("Given data is neither object or array ERROR", err)
    }
}

async function fetchFavorites(route){
    const user = document.getElementById('name').value
    const display = document.getElementById('displayresult')
    try {
        console.log("attempting to get to favs") 
        const response = await fetch(`https://cityeats-backend.onrender.com/users/${user}${route}`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        });

        const data = await response.json()
        console.log(data)
        
        if (!response.ok) {
            display.textContent = data.message || "No favorites found.";
        }
        else{
            display.textContent = `Found ${user}'s favorites successfully`
            
        }
        displayFavorites(data)
    }
    catch (err) {
        console.log(err);
        document.getElementById("displayresult").textContent="Server Error"
        }
}


//Event Listener functions
function createUserOnClick(button){
    button.addEventListener('click', async (e) =>{
        e.preventDefault();
        sendPOSTRequest("/create-user")
    })
}

function loginUserOnClick(button){
    button.addEventListener('click', async (e) =>{
        e.preventDefault();
        sendPOSTRequest("/login")
    })
}

function logoutUserOnClick(button){
    button.addEventListener('click', async (e) =>{
        e.preventDefault();
        const display=document.getElementById("displayresult");
        display.textContent = "Logged out successfully"
        showfavbutton.style.display="none"
        deletebutton.style.display="none"
        logoutbtn.style.display="none"
        loginbtn.style.display="inline-block"
        createbtn.style.display="inline-block"
        
    })
}

function deleteUserOnClick(button){
    button.addEventListener('click', async (e) =>{
        e.preventDefault();
        sendDELRequest("/delete")
    })
}

function favOnClick(button){
    button.addEventListener('click', async (e) =>{
        e.preventDefault();
        sendPUTRequest("/addFav")
    })
}
function showFavOnClick(button){
    button.addEventListener('click', async (e) =>{
        e.preventDefault();
        fetchFavorites("/favorites")
    })
}

function searchOnClick(button){
    button.addEventListener("click", handleSearch)
}

//Adds event listener to buttons
searchOnClick(searchbtn)
createUserOnClick(createbtn)
loginUserOnClick(loginbtn)
logoutUserOnClick(logoutbtn)
deleteUserOnClick(deletebutton)
showFavOnClick(showfavbutton)


//debug purposes
console.log("We made it we found the End!")
