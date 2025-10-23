import express from 'express'
import User from '../models/User.js';

const router = express.Router()

router.post('/login', async (req, res) => {
	// i get the login information from the json that will be sent over
	// plan to expect login or email
	try {
		const user = await User.findOne({
			$or: [
				{ email: req.body.identifier },
				{ login: req.body.identifier }
			]
		})
		if (!user) return res.status(404).json({ message: "user not found" })
		if (req.body.password === user.password) {
			return res.json({ "message": "login success" })
		} else {
			return res.json({ "message": "login failed" })
		}
		res.json(user)
	} catch (err) {
		res.status(500).json({ error: err.message })
	}
})
router.post('/register', async (req, res) => {
	// register api should expect 
	// {
	//	"login":"johndoe",
	//	"email":"johndoe@domain.xyz",
	//	"password":"johnpassword"
	// }
	try {
		const newUser = new User({
			login: req.body.login,
			email: req.body.email,
			password: req.body.password
		})
		await newUser.save()
		res.json({ "message": "user added" })
	} catch (err) {
		if (err.code === 11000) {
			return res.status(409).json({ "message": "User already exists" })
		}
		res.status(500).json({ error: err.message })
	}
})
export default router
