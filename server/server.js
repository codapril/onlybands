const express = require("express");
const cors = require("cors");
const { MongoClient } = require("mongodb");

const mongoClient = new MongoClient("mongodb://localhost:27017", {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

const PORT = 5000

const app = express();
app.use(cors());

async function startServer() {
	try {
		await mongoClient.connect();
		console.log("Connected to MongoDB");

		// Retrieve all bands
		app.get("/bands", async (req, res) => {
			const bands = await mongoClient.db("bands").collection("bands").find().toArray();
			res.json(bands);
		});

		app.listen(PORT, () => {
			console.log(`Server listening on port ${PORT}`);
		});

  } catch (error) {
    console.error(error);
  }
}

startServer();