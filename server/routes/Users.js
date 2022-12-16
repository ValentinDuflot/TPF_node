const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const keys = require("../config/keys");

// Load input validation
const validateRegisterInput = require("../controllers/register");
const validateLoginInput = require("../controllers/login");
// Load User model
const User = require("../models/User")

router.post("/register", (req, res) => {
    // Form validation
    const { errors, isValid } = validateRegisterInput(req.body);
    // Check validation
    if (!isValid) {
        console.log("ERR ", req.body);
        return res.status(400).json(errors);
    }
    User.findOne({ mail: req.body.mail }).then(user => {
        if (user) {
            return res.status(400).json({ mail: "Email already exists" });
        } else {
            const newUser = new User({
                name: req.body.name,
                mail: req.body.mail,
                password: req.body.password,
                role: req.body.role,
                departement: req.body.departement
            });
            // Hash password before saving in database
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {

                    newUser.password = hash;
                    newUser
                        .save()
                        .then(user => res.json(user))
                        .catch(err => console.log(err));
                });
            });
        }
    });
});

router.post("/login", (req, res) => {
    // Form validation
    const { errors, isValid } = validateLoginInput(req.body);
    // Check validation
    if (!isValid) {
        console.log("ERR ", req.body);
        return res.status(400).json(errors);
    }
    const mail = req.body.mail;
    const password = req.body.password;
    // Find user by email
    User.findOne({ mail }).then(user => {
        // Check if user exists
        if (!user) {
            return res.status(404).json({ mailnotfound: "Email not found" });
        }
        // Check password
        bcrypt.compare(password, user.password).then(isMatch => {
            if (isMatch) {
                // User matched
                // Create JWT Payload
                const payload = {
                    id: user.id,
                    name: user.name
                };
                // Sign token
                jwt.sign(
                    payload,
                    keys.secretOrKey,
                    {
                        expiresIn: 31556926 // 1 year in seconds
                    },
                    (err, token) => {
                        res.json({
                            success: true,
                            token: "Bearer " + token
                        });
                    }
                );
            } else {
                return res
                    .status(400)
                    .json({ passwordincorrect: "Password incorrect" });
            }
        });
    });
});

module.exports = router;
