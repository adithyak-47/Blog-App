const express = require('express');
const router = express.Router();
const PostSchema = require('../models/Posts');

router.get('/', async(req, res) => {

    res.json(await PostSchema.find()
    .populate('author',['username'])
    .sort({createdAt: -1})
    .limit(20));
});

router.get('/:id', async(req,res) => {
    const {id} = req.params
    const postDoc = await PostSchema.findById(id).populate('author',['username']);
    res.json(postDoc);
})

module.exports = router;