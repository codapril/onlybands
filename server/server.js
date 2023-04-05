const express = require("express");
const cors = require("cors");
const { MongoClient, ObjectId } = require("mongodb");

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

		app.get("/bands/:id", async (req, res) => {
			const band = await mongoClient.db("bands").collection("bands").findOne({_id: new ObjectId(req.params.id)});
			res.json(band)
		})

		// Update band like counter
		app.post("/likes/:id", (req, res) => {
			const id = req.params.id;

			mongoClient.db('bands').collection('bands').findOneAndUpdate(
				{ _id: new ObjectId(id) },
				{ $inc: { likes: 1 } },
				{ returnOriginal: false },
				(err, res) => {
					if(err) {
						console.log(err);
					} else {
						console.log("Incremented successfully!")
					}
				}
			)
		})

		app.listen(PORT, () => {
			console.log(`Server listening on port ${PORT}`);
		});

  } catch (error) {
    console.error(error);
  }
}

startServer();