const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const user = require('../models/userModel');
const nodemailer = require('nodemailer');
const bcrypt = require('bcryptjs');

var salt = crypto.randomBytes(128).toString('hex');
encryptedsalt = await bcrypt.hash(salt, 10);
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.LOVER
    }
});

router.post('/', async (req, res) => {
    var email = req.body.email;
    const User = await user.findOne({ email });
    if (User) {
        User.resetpassord = encryptedsalt;
        var mailOptions = {
            to: email,
            from: 'QANDA APP',
            subject: 'QANDA APP RESET PASSWORD',
            text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
                'Please copy the following code to complete the process:\n\n' +
                + salt + '\n\n' +
                'If you did not request this, please ignore this email and your password will remain unchanged.\n'
        };
        smtpTransport.sendMail(mailOptions, function (err) {
            if (err) throw err;
        });

    } else {
        res.status(403).send('User not Found');
    }

});



router.patch('', async (req, res) => {
    const { password, confirmpassword, email, token } = req.body;

    const user = await User.findOne({ email });
    if (!user.resetpassword) {
        res.status(403).send('invalid token or expired token');
    }

    if (await bcrypt.compare(token, user.resetpassword)) {

        if (password == confirmpassword) {
            encryptedPassword = await bcrypt.hash(password, 10);

            const User = await user.updateOne(
                { email },
                { password: encryptedPassword }
            );
            res.status(200).json(User);

        } else {
            res.status(400).send('confirmpassword must match password');
        }

    } else {
        res.status(400).send('invalid token');
    }
});





module.exports = router;