const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const router = express.Router();

const salt = bcrypt.genSaltSync(10);

router.post('/', async(req,res) => {
    try
    {
        const {username, password} = req.body;
        const userDoc = await User.create({
            username,
            password: bcrypt.hashSync(password, salt)
        });
        res.status(200).json(userDoc);
    }
    catch(e)
    {
        res.status(400).json(e)
    }
});

module.exports = router;