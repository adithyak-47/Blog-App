const dotenv = require('dotenv');
dotenv.config();
const jwt = require('jsonwebtoken');
const express = require('express');
const cookieParser = require('cookie-parser');
const router = express.Router();
router.use(cookieParser());


const secretKey = process.env.SECRET_KEY;

router.get('/', async(req, res) => {
try
{

    const {token} = req.cookies;
    jwt.verify(token, secretKey, {}, (err, info) =>{
        if(err) throw err;
        res.json(info);
    });
}
catch(e)
{
    res.send(e);
}
});


module.exports = router;
