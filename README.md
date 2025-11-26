# CityEats
CityEats is a lightweight restaurant-recommendation application that helps users quickly find popular places to eat in any city. 
The app provides restaurant names, ratings, primary cuisine styles, and addresses using data from Google Places.

## Live Demo
Check it out here:
 - https://cityeats.onrender.com

## Features
 - Search restaurants by city and cuisine/style
 - View restaurant names, ratings, addresses
 - Uses Google Places API for accurate real-time data
 - User favorites system with full CRUD

## Tech Stack
- **Frontend:**
  - HTML
  - CSS
  - JavaScript 

- **Backend**
  - Node.js
  - Express

- **Database**
  - MongoDB (Cloud Atlas Cluster)
  - Mongoose (ODM)

- **External APIs** 
  - Google Places
    
- **Deployment**
  - Render (Backend & Frontend hosting)
  - MongoDB Atlas (cloud database)


## How it Works
1. Enter a city, province, and style of food.
2. The frontend sends the request to the backend.
3. The backend formats your search request and queries Google Places API.
4. Search results are cleaned and trimmed down to only the data you care about (Name, Styles, Address, Rating).
5. Frontend cleanly displays the search results.
6. Create an account to save restaurants to your favorites list

### Optional Create an Account to save favorites
1. Enter a username & password then click Create Account
2. Once logged in you can search normally.
3. Each result will include a Favorite button — clicking it saves the restaurant to your account.
4. Click Show Favorites to view all restaurants you have saved.
5. You can Unfavorite restaurants or Delete your account at any time.

## Setup & Install
1. Clone the repository
2. Navigate into the project folder
3. Install backend dependencies
```npm install express, dotenv, cors```

4. Set up environment variables (API_KEY, API_URL, MONGO_URI, PORT) within the backend directory.
5. Update the frontend Fetch Urls. In the frontend JavaScript files, there are comments showing where you can switch between the deployed endpoint and a localhost version.
Make sure the port number matches your backend.
6. Start the server
```node server.js```

7. Open the frontend index.html in your browser

## Future Improvement
- Add mobile layout improvements
- Add search result sorting/filtering capabilities
- Add improved user sessions / user authenication
- Hash passwords
