const { Router } = require("express")
const { UserModal } = require("./user.model")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");

const userRouter = Router()

// user registration || POST
userRouter.post('/register-user', async (req, res) => {
    try {
        res.send(req.body)

        // validation 
        if (!req.body.email || !req.body.password) {
            res.status(401).send({
                msg: "Please fill all the fields"
            })
        }

        // existing user or not
        const existingUser = await UserModal.findOne({ email: req.body.email })
        if (existingUser) {
            res.status(200).send({
                msg: "User already exists"
            })
        }

        const hashPassword = await bcrypt.hash(req.body.password, 8);

        const newUser = new UserModal({ email: req.body.email, password: hashPassword });
        await newUser.save();
        res.status(201).send({
            msg: "Registration successfull",
            newUser
        });
    } catch (error) {
        console.log(error);
            res.status(500).send({ error, msg: "Invalid request for registeration." });
    }
});

// user login || POST
userRouter.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        // validation
        if (!email || !password) {
            res.status(401).send({
                msg: "Please fill all the fields"
            })
        }

        // user isn't present
        const user = await UserModal.findOne({ email });
        if (!user) {
            res.status(401).send({
                msg: "Please register first"
            });
        }

        // compare 
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            res.status(401).send({
                msg: "Please enter valid email & password"
            });
        }

        // Generate JWT token
        const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, { expiresIn: '1d' });

        // Set cookie
        res.cookie('token', token, { httpOnly: true }); 


        res.status(200).send({
            msg: "Logged in successfully",
            user
        });

    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
});

module.exports = { userRouter } 