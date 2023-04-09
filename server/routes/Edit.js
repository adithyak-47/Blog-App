const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const multer = require('multer');
const upload = multer({dest: 'uploads/'});
const fs = require('fs');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const PostSchema = require('../models/Posts');

dotenv.config();
router.use(cookieParser());
const secretKey = process.env.SECRET_KEY;

router.put('/', upload.single('file'), async (req, res) => {

    let newPath = null;
    if(req.file)
    {
        const {originalname, path} = req.file;
        const parts = originalname.split('.');
        const extension = parts[parts.length - 1];
        newPath = path + '.' + extension;
        fs.renameSync(path, newPath);
    }

    try{
    const {token} = req.cookies;

    jwt.verify(token, secretKey, {}, async (err, info) => {
        if(err) throw err;
        const {id, title, summary, content} = req.body;
        const postDoc = await PostSchema.findById(id);
        const isAuthor = JSON.stringify(postDoc.author) === JSON.stringify(info.id);

        if(!isAuthor)
        {
            res.status(401).json('You are not the author!');
        }

        await postDoc.updateOne(
            {
                title,
                summary,
                content,
                cover: newPath ? newPath : postDoc.cover
            }
        );
        res.status(200).json(postDoc);
    });
    }
    catch(e)
    {
        res.send(e);
    }
});


module.exports = router;