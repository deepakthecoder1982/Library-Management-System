const userModels = require("../models/User.model");
const { generateToken, verifyToken } = require("../utils/jwt");
const bcrypt = require("bcrypt");
const UserRoute = require("express").Router();


UserRoute.post("/register", async (req, res) => {
    try {
        const { username, password, role } = req.body;

        // checking for existing user in the database
        let existingUser = await userModels.findOne({ username });
        
        if (existingUser) {
            return res.status(200).send({ message: "Username already exist!!" });
        }

        // Encrypt the password
        let hashedPassword = bcrypt.hashSync(password, 10);

        // Generate user
        const userData = new userModels({ username, password: hashedPassword, role });
        await userData.save();


        // Generate JWT token
        const token = generateToken({ username: userData?.username, role: userData?.role });

        res.status(201).send({ message: "User Logged in sucessfully!", token: token });

    } catch (error) {
        res.status(400).send({ err: error?.message })
    }
})

UserRoute.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body;

        const existingUser = await userModels.findOne({ username });
        if (!existingUser) {
            return res.status(200).send({ message: "User not exist, Please register first!!" });
        }
        let hashedPassword = bcrypt.compareSync(password, existingUser?.password);

        if (!hashedPassword) {
            return res.status(200).send({ message: 'Invalid password or username' });
        }
       
        const token = generateToken({ username: existingUser?.username, role: existingUser?.role });
        res.status(200).send({ message: 'User logged in sucessfully!!!', token });
    } catch (err) {
        res.status(400).send({ err: err?.message })
    }

})
module.exports = UserRoute;