const express = require('express');
const Post = require('../models/postmodel');
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const post = await Post.find();
        res.status(200).json(post);
    } catch (error) {
        res.json({ message: error });
    }
});

// GET SPECIFIC POST
router.get('/:PostId', async (req, res) => {
    try {
        const post = await Post.findById(req.params.Postid);
        res.status(200).json(post);
    } catch (error) {
        res.json({ message: error });
    }
});

router.delete('/:PostId', async (req, res) => {
    try {
        const deleted = await Post.findByIdAndDelete(req.params.PostId);
        res.json({ status: Deleted });
    } catch (error) {
        res.json({ mesage: error });
    }
});

router.patch('/:PostId', async (req, res) => {
    try {
        const update = await Post.updateOne(
            { _id: req.params.PostId },
            { $set: { content: res.body.content } }
        );
        res.json(update);
    } catch (err) {
        res.json({ message: err });
    }
});

router.post('/', async (req, res) => {
    // DEBUG AND WATCH USER 
    const post = new Post(
        {
            content: req.body.content,
            user: req.body.user
        }
    )
    try {
        const savedPost = await post.save();
        res.status(200).json(savedPost);
    } catch (err) {
        res.json({ message: err });
    }
});

exports.module = router;