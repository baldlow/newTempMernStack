import mongoose from "mongoose"

const Schema = mongoose.Schema

const UserSchema = new Schema({
	login: { type: String, required: true, unique: true },
	password: { type: String, required: true },
	email: { type: String, required: true, unique: true }
})

const User = mongoose.model("User", UserSchema, "users")
export default User
