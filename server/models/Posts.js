const mongoose = require('mongoose');

const PostSchema = mongoose.model(
    "Posts",
    new mongoose.Schema(
        {
            title: {type: String, required: true},
            summary: {type: String, required: true},
            content: {type: String, required: true},
            cover: {type: String, required: true},
            author: {type: mongoose.Schema.Types.ObjectId, ref:'users'}
        },
        {
            timestamps: true
        }
    )
);

module.exports = PostSchema;