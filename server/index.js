const dotenv = require('dotenv');
dotenv.config();
const PORT = 4000;
const express = require('express');
const cors = require('cors');
const Login = require('./routes/Login');
const Register = require('./routes/Register');
const Profile = require('./routes/Profile');
const Logout = require('./routes/Logout');
const Post = require('./routes/Post');
const Display = require('./routes/Display');
const Edit = require('./routes/Edit');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const app = express();


app.use(cors({credentials: true, origin: 'http://localhost:3000'}));
app.use(express.json());
app.use('/uploads', express.static(__dirname + '/uploads'));
// app.use(cookieParser());

const URL = process.env.MONGODB_URL;
mongoose.connect(URL);


app.use('/api/register', Register);
app.use('/api/login', Login);
app.use('/api/profile', Profile);
app.use('/api/logout', Logout);
app.use('/api/post', Post);
app.use('/api/posts', Display);
app.use('/api/edit', Edit);

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});

module.exports = app;