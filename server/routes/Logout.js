const express = require('express');
const router = express.Router();

router.post('/', (req,res) =>{
    res.cookie('token', '').json('Logged out.');
})

module.exports = router;