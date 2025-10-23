import dotenv from "dotenv"
dotenv.config()
import express from "express"
import mongoose from "mongoose"
import userRoutes from "./routes/users.js"

const app = express()
const port = 5000
const users = new Map([
	["rickL", "rickLpass"]
])
console.log(process.env.MONGO_URL)
console.log(process.env.PORT)
const mongoDB = process.env.MONGO_URL

async function main() {
	try {
		await mongoose.connect(mongoDB);
		console.log("connected to mongoDB");
		console.log("mongoose db name:", mongoose.connection.name);
	} catch (err) {
		console.error("mongodb connection error:", err);
	}
}
main();


app.use(express.json())

app.use("/api", userRoutes)

app.get('/', (req, res) => {
	res.send('hello world')
})

app.listen(port, () => {
	console.log(`example app listening on port ${process.env.PORT}`)
})

