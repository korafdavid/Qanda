const express = require('express');
const Post = require('../models/postmodel');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/userModel');
const fromNow = require('fromnow');

// GET ALL POSTS
router.get('/', async (req, res) => {
    try {
        const post = await Post.find();
        const allPost = await Promise.all(
            post.map((p) => {
                prettydate = fromNow(p.date);
                p.prettydate = prettydate;
               
            }))
            res.status(200).json(post);
    } catch (error) {
        res.status(500).json({ message: error });
    }
});

// GET TIMELINE POST
router.get('/timeline', async (req, res) => {
    const id = req.body.id;
    const user = await User.findbyId(id);
    try {
        const userpost = await Post.find({ 'user': id });
        const friendsPost = await Promise.all(
            user.followers.map((friendsId) => {
                Post.find({ 'user': friendsId });
            })
        )
        res.status(200).json(userpost.concat(...friendsPost));
    } catch (error) {
        res.status(500).json(error);
    }
});

// GET SPECIFIC POST
router.get('/:PostId', async (req, res) => {
    try {
        const post = await Post.findById(req.params.Postid);
        prettydate = fromNow(post.date);
        post.prettydate = prettydate;
        res.status(200).json(post);
    } catch (error) {
        res.json({ message: error });
    }
});

// DELETE POST
router.delete('/:PostId', async (req, res) => {
    try {
        const deleted = await Post.findByIdAndDelete(req.params.PostId);
        res.json({ status: Deleted });
    } catch (error) {
        res.json({ mesage: error });
    }
});

// EDIT POST
router.patch('/:PostId', async (req, res) => {
    ///WRONG
    // try {
    //     const update = await Post.updateOne(
    //         { _id: req.params.PostId },
    //         { $set: { content: res.body.content } }
    //     );
    //     res.json(update);
    // } catch (err) {
    //     res.json({ message: err });
    // }
});

// CREATE POST
router.post('/:posterId', async (req, res) => {
    const id = mongoose.Types.ObjectId(req.params.posterId);
    if (mongoose.Types.ObjectId.isValid(id)) {
        const getposter = await User.findOne({ '_id': id });
        try {
            const post = new Post(
                {
                    text: req.body.text,
                    user: getposter
                }
            )
            const savedPost = await post.save();
            res.status(200).json(savedPost);
            console.log(savedPost);
        } catch (err) {
            console.log(err._message);
            res.status(500).send({ error: err._message });
        }
    } else {
        res.json({ success: "false", data: "Please provide correct id" });
    }
});

// LIKE/ UNLIKE POST
router.patch('/:userid/like', async (req, res) => {
    const id = req.params.userid;
    const postId = req.body.postId;
    try {
        const post = await Post.findById(postId);
        if (post.like.includes(id)) {
          await  Post.findByIdAndUpdate(postId,{ $pull: { like: id } });
            res.status(200).send('unliked post');
        } else {
          await  Post.findByIdAndUpdate(postId,{ $push: { like: id } });
            res.status(200).send('like post')
        }
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }

});



// COMMENT ON A POST
router.patch('/:id/comment', async (req, res) => {
    const userId = req.params.id;
    const postId = req.body.postId;
    const text = req.body.text;
    try {
        console.log(userId);
        const user = await User.findById(userId);
        const mainPost = await Post.findById(postId);
        console.log(mainPost);
        //  console.log(user);
        const post = new Post({
            content: text,
            user: user
        });
        //  console.log(post);
        const newcomment = await Post.findByIdAndUpdate(postId,
            { $push: { comment: post } }
        )
        
        console.log(newcomment);
        res.status(200).json(newcomment);
    } catch (err) {
        console.log(err);
        res.status(500).json(err._message);
    }
});

module.exports = router;