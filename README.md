# OnlyBands

This application is built with Node.js v16.16.0 and Node Package Manager (npm) v8.11.0.

### Setup
- Download MongoDB version 6.0.4 from https://www.mongodb.com/try/download/community
- Follow the installation instructions
- Start MongoDB server by executing `mongod`. MongoDB will be running on mongodb://localhost:27017 by default
- Create a MongoDB collection `bands` in database `bands` and import the data from `/backend/bands.json`. You can use the MongoDB Compass frontend to to so, alternatively you can use the MongoDB Command Line Tools available on https://www.mongodb.com/try/download/database-tools
- Move to `./backend` dir and run `node i` or `node install`
- Move to `./frontend` dir and run `node i` or `node install`

### Start the app
- Move to `./backend` dir and run `node server.js` to start the backend server (running on http://localhost:5000)
- Move to `./frontend` dir and run `npm run start` to start the React frontend
- Open http://localhost:3000
