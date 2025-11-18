# CityEats
CityEats is a lightweight restaurant-recommendation application that helps users quickly find popular places to eat in any city. 
The app provides restaurant names, ratings, primary cuisine styles, and addresses using data from Google Places.

## Features
 - Search restaurants by city and cuisine/style
 - View restaurant names, ratings, addresses
 - Uses Google Places API for accurate real-time data
 - Simple, responsive frontend and lightweight backend.
## Tech Stack
- **Frontend:**
  - HTML
  - CSS
  - JavaScript

- **Backend**
  - Node.js
  - Express

- **External APIs** 
  - Google Places
    
- **Hosting Services**
  - Unavailable


## How it Works
1. Enter a city, province, and style of food.
2. The frontend sends the request to the backend.
3. The backend formats your search request and queries Google Places API.
4. Search results are cleand and trimmed down to only the data you care about (Name, Styles, Address, Rating).
5. Frontend cleanly displays the search results.

## Setup & Install
1. Clone the repository
2. Navigate into the project folder
3. Install backend dependencies
 - express, dotenv, cors
4. Set up environment variables (i.e. API_KEY, etc.)
5. Open the frontend CityEats.html in your browser

## Future Improvement
- Improve search accuracy with location bias
- Add mobile layout improvements
- Add search result sorting/filtering capabilities