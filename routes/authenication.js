const User = require("../models/userModel");
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const emailvalidator = require('email-validator');

// Register
router.post("/signUp", async (req, res) => {
    try {
        const { firstName, lastName, username, email, password } = req.body;
        if (!(email && password && firstName && lastName && username)) {
            res.status(400).send('All input required');
        }
        const oldUser = await User.findOne({ email });
        if (oldUser) {
            return res.status(409).send("User Already Exists");
        }
        encryptedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            firstName,
            lastName,
            username,
            email: email.toLowerCase(),
            password: encryptedPassword
        });
        console.log(req.body);
        const token = jwt.sign(
            { user_id: user._id, email },
            process.env.TOKEN_KEY,
            { expiresIn: "2h" },
        );
        user.token = token;
        res.status(201).json(user);
        console.log(token);
    } catch (error) {
        console.error(error);
    }
});

// Login
router.post("/SignIn", async (req, res) => {

    try {
        const { emailOrUsername, password } = req.body;
        if (!(emailOrUsername && password)) {
            res.status(400).send('All input is required');
        }
        const email = emailvalidator.validate(emailOrUsername);
        if (email) {
            const user = await User.findOne({ email: emailOrUsername });
            if (user && (await bcrypt.compare(password, user.password))) {
                // Create token
                const token = jwt.sign(
                    { user_id: user._id, email },
                    process.env.TOKEN_KEY,
                    {
                        expiresIn: "2h",
                    }
                );
                user.token = token;
                res.status(200).json(user);
            } else {
                res.status(403).send('wrong Password');
            }
        } else {
            const user = await User.findOne({ username: emailOrUsername });
            console.log(user);
            if (user && (await bcrypt.compare(password, user.password))) {
                // Create token
                const token = jwt.sign(
                    { user_id: user._id, email },
                    process.env.TOKEN_KEY,
                    {
                        expiresIn: "2h",
                    }
                );
                user.token = token;

                res.status(200).json(user);
            } else {
                res.status(400).send('wrong Password');
            }
        }
    } catch (error) {
        console.log(error);
    }
});


// FOLLOW AND UNFOLLOW USER
router.patch('/:id/follow', async (req, res) => {
    const id = req.params.id;
    const userId = req.body.id;
    if (userId != id) {
        const user = await User.findbyId(id);
        const currentUser = await User.findbyId(userId);
        try {

            if (currentUser.following.includes(id)) {
                //UNFOLLOW
                await user.UpdateOne(
                    {
                        $pull: {
                            followers: userId,
                        }
                    }

                )
                await currentUser.UpdateOne(
                    {
                        $pull: {
                            following: id,
                        }
                    }
                )
                res.status(200).send('user has been unfollowed');
            } else {
                //FOLLOW   
                await user.UpdateOne(
                    {
                        $push: {
                            followers: userId,
                        }
                    }

                )
                await currentUser.UpdateOne(
                    {
                        $push: {
                            following: id,
                        }
                    }
                )
                res.status(200).send('your has been followed');
            }
        } catch (error) {
            res.status(500).json({ err: error });
        }

    } else {
        res.status(403).send('Can\'t follow yourself');
    }

});

module.exports = router;