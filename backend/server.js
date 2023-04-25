const express = require("express");
const cors = require("cors");
const bodyParser = require('body-parser'); // Needed to parse json in body
const mongoose = require("mongoose");
require("dotenv").config({ path: "./config.env" });

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("./models/user");
const Band = require("./models/band");

const port = process.env.SERVER_PORT;

const app = express();
app.use(cors());
app.use(bodyParser.json());

function verifyJWT(req, res, next) {

	const token = req.headers["x-access-token"]?.split(' ')[1]; // to remove "Bearer "

	if (token) {
		jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => { // Verify using my token
			if (err) return res.json({
				isLoggedIn: false,
				message: "Failed to authenticate"
			});
			req.user = {};
			req.user.id = decoded.id;
			req.user.username = decoded.username;
			next()		
		})
	} else {
		res.json({
			isLoggedIn: false,
			message: "Incorrect token given"
		});
	}
}

async function startServer() {
	try {
		await mongoose.connect(process.env.MONGODB_URI, {
			dbName: "bands",
			useNewUrlParser: true,
			useUnifiedTopology: true
		});

		console.log("Connected to MongoDB");

		// Registration
		app.post("/register", async (req, res) => {
			const user = req.body;

			const takenUsername = await User.findOne({username: user.username});

			if (takenUsername) {
				res.json({message: "Username already taken"})
			} else {
				user.password = await bcrypt.hash(req.body.password, 10);

				const dbUser = new User({
					username: user.username.toLowerCase(),
					password: user.password
				});

				dbUser.save();
				res.json({message: "Success"})
			}

		});

		// Login
		app.post("/login", async (req, res) => {
			const userLoggingIn = req.body;

			User.findOne({username: userLoggingIn.username}).then(
				dbUser => {
					if (!dbUser) {
						return res.json({
							message: "Invalid username or password"
						})
					}

					bcrypt.compare(userLoggingIn.password, dbUser.password).then(
						isCorrect => {

							if (!isCorrect) {
								return res.json({
									message: "Invalid username or password"
								})
							}

							const payload = {
								id: dbUser._id,
								username: dbUser.username
							}
							jwt.sign(
								payload,
								process.env.JWT_SECRET, // Sign using my token
								{expiresIn: 86400},
								(err, token) => {
									if (err) return res.json({message: err});
									return res.json({
										message: "Success",
										token: "Bearer " + token
									});
								}
							);
						}
					);
				}
			)

		});

		// Get current user
		app.get("/getUsername", verifyJWT, (req, res) => {
			return res.json({isLoggedIn: true, username: req.user.username});	
		})

		// Retrieve all bands
		app.get("/bands", async (req, res) => {
			const bands = await Band.find({});
			res.json(bands);
		});

		// Retrieve specific brand by ID
		app.get("/bands/:id", async (req, res) => {
			const band = await Band.findOne({_id: req.params.id})
			res.json(band)
		});

		// Increment band like counter
		app.post("/likes/:id", async (req, res) => {
			await Band.findOneAndUpdate(
				{ _id: req.params.id },
				{ $inc: { likes: 1 } },
				{ returnOriginal: false }
			)
		});

		app.listen(port, () => {
			console.log(`Server listening on port ${port}`);
		});

  } catch (error) {
    console.error(error);
  }
}

startServer();