const express = require('express');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const bcrypt = require('bcrypt');
const User = require('../models/User');
dotenv.config();
const secretKey = process.env.SECRET_KEY;

const router = express.Router();


router.post('/', async(req,res) => {
    let {username, password} = req.body;
    let data = await User.findOne({username});
    const passOk = bcrypt.compareSync(password, data.password);
    if(passOk)
    {
        jwt.sign({username, id: data._id}, secretKey, {}, (err, token) =>{
            if(err) throw err;
            res.cookie('token', token).status(200).json({
                id: data._id,
                username
        });
        });
    }
    else
    {
        res.status(401).json('Invalid credentials.');
    }
});

module.exports = router;