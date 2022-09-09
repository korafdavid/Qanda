const User = require('../models/userModels.mjs');
const express = require('express');
const router = express.Router;
const fs = require('fs');
const path = require('path');
const AWS = require('aws-sdk');
require('dotenv/config');
const multer = require('multer');
const multers3 = require('multer-s3');


const ID = process.env.KEY_ID;
const SECRET_KEY = process.env.SECRET_KEY;
const BUCKET_NAME = process.env.BUCKET_NAME;

const s3 = new AWS.S3({
    accessKeyId: ID,
    secretAccessKey: SECRET_KEY,
    region: 'us-east-2'
});

const upload = multer({
    storage: multers3({
        s3: s3,
        bucket: BUCKET_NAME,
        contentType: function (req, file, cb) {
            cb(null, file.mimetype);
        },
        metadata: (req, file, cb) => {
            cb(null, { fieldName: file.fieldname });
        },
        key: function (req, file, cb) {
            cb(null, new Date().toISOString() + '-' + file.originalname)
        },
            //throwMimeTypeConflictErrorIf: (contentType, mimeType, file) => ![mimeType, 'application/octet-stream'].includes(contentType)
    }),
    fileFilter: (req, file, cb) => {
        if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
            cb(null, true)
        } else {
            cb(null, false)
        }
    },
    limits: { fileSize: 1024 * 1024 * 5 },
});

router.patch('/verifyUser', async (req, res) => {
    const userId = req.user['user_id'];
    const ds = User.findByIdAndUpdate(
        userId,
        { $set: { verified: true } }
    )
})



router.post('/uploadProfileImage', upload.single('image'), async (req, res) => {
    const userId = req.user['user_id'];
    const user = await User.findOne({ _id: userId });
    if (user.profilephoto === null) {
        const update = await User.updateOne(
            { _id: userId },
            { $set: { profilephoto: req.file['key'] } }
        );
    } else {
        const params = { bucket: BUCKET_NAME, key: user.profilephoto }
        s3.deleteObject(params, function (err, data) {
            if (err) console.log(err, err.stack);
            else console.log('delete', data);
        }).promise();
        const update = await User.updateOne(
            { _id: userId },
            { $set: { profilephoto: req.file['key'] } }
        );
    }
    res.status(201).json(req.file)
});



function getPresignedUrl(key) {
    var presignedUrlparams = { Bucket: BUCKET_NAME, Key: key, Expires: 120 };
    var url =  s3.getSignedUrl('getObject', presignedUrlparams);
    return url;
}

router.get('/getUser', async (req, res) => {
    const userId = req.user['user_id'];
    const user = await User.findOne({ _id: userId }).select('-password -__v').exec();
    if (user.profilephoto != null) {
        user.profilephoto = getPresignedUrl(user.profilephoto);
    }
    user.followers = user.followers.length;
    user.following = user.following.length;
    res.status(200).send(user);
});



router.get('/ProfileImage',async(req,res) => {
    const userId = req.user['user_id'];
    const user = await User.findOne({ _id: userId});
    if (user.profilephoto != null) {
        const url = getPresignedUrl(user.profilephoto);
        res.status(200).send(url);
    } else {
        res.status(404).send('User Profile Image Not Found');
    }
})
 
router.put('/editProfile', async (req, res) => {
    const userId = req.user['user_id'];
    const user = await User.findOne({ _id: userId });
});


module.exports = router;