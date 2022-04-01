const User = require("../models/User.model");
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const mailer = require('nodemailer')
const emailValidator = require('deep-email-validator');

async function isEmailValid(email) {
    return emailValidator.validate(email)
}


exports.signUp = async (req, res) => {

    try {
        const { name, email, password } = req.body;

        const user = await User.findOne({ email })
        if (user) return res.status(400).json({ msg: "The email already exists." })
        
        const { valid, reason, validators } = await isEmailValid(email);

        if (valid) {
             res.send({ message: "OK" });
        }
        else {
             res.status(400).send({
                message: "Please provide a valid email address.",
                reason: validators[reason].reason
            })
        }

      

        if (password.length < 6)
            return res.status(400).json({ msg: "Password is at least 6 characters long." })

        // Password Encryption
        const passwordHash = await bcrypt.hash(password, 10)
        const newUser = new User({
            name, email, password: passwordHash
        })

        // Save mongodb
        const response = await newUser.save();

        res.send({ response: response, message: "user is saved" });
    } catch (error) {
        res.status(500).send("can not save it");
    }

},

    exports.login = async (req, res) => {
        try {
            const { email, password } = req.body;

            const user = await User.findOne({ email })
            if (!user) return res.status(400).json({ msg: "User does not exist." })

            const isMatch = await bcrypt.compare(password, user.password)
            if (!isMatch) return res.status(400).json({ msg: "Incorrect password." })

            // If login success , create access token 
            const token = jwt.sign({ user }, process.env.JWT_SECRET, {
                expiresIn: "7d",
            });
            res.cookie("jwt", token, {
                httpOnly: true,
                maxAge: 2 * 60 * 60 * 1000, // 3hrs in ms
            });

            res.json({ token })
            let tranporter = mailer.createTransport({
                service: "outlook",
                auth: {
                    user: "yassine.beno@outlook.fr",
                    pass: "yasouna3"
                }
            })
            let mailOption = {
                from: "yassine.beno@outlook.fr",
                to: "yassinebenromdane@gmail.com",
                subject: "Logged In",
                html: "<h1> you are logged in </h1>"
            }
            tranporter.sendMail(mailOption, function (err, success) {
                if (err) {
                    console.log("err", err);
                }
                else {
                    console.log('success')
                }
            })

        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },

    exports.getAll = async (req, res) => {
        try {
            const result = await User.find();
            res.send({ response: result, message: "getting users succefuly" });
        } catch (error) {
            res.status(400).send({ message: "can not get contacts" });


        }

    }