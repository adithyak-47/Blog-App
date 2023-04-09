const express = require('express');
const router = express.Router();
const cookieParser = require('cookie-parser');
const multer = require('multer');
const upload = multer({dest: 'uploads/'});
const fs = require('fs');
const PostSchema = require('../models/Posts');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

secretKey = process.env.SECRET_KEY;
router.use(cookieParser());

router.post('/', upload.single('file'), async(req,res) =>{
    const {originalname, path} = req.file;
    const parts = originalname.split('.');
    const extension = parts[parts.length - 1];
    const newPath = path + '.' + extension;
    fs.renameSync(path, newPath);

    const {title, summary, content} = req.body;

    const {token} = req.cookies;
    
    jwt.verify(token, secretKey, {}, async (err, info) =>{
        if(err) throw err;
        const PostDoc = await PostSchema.create(
            {
                title,
                summary,
                content,
                cover: newPath,
                author: info.id
            }
        )
        res.json(PostDoc);

    });
});

module.exports = router;