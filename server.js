const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');

app.use(express.json());
require('dotenv').config();

const posts = [
    { name: "Hyderabad", title: "Welcome to Hyderabad" },
    { name: "Mumbai", title: "Welcome to Mumbai" },
    { name: "Banglore", title: "Welcome to Banglore" }
];

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) return res.sendStatus(401);

    jwt.verify(token, process.env.ACCESS_TOKEN, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
};

app.post('/login', (req, res) => {
    const username = req.body.username;
    const user = { name: username };

    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN);
    console.log('Generated Token:', accessToken);
    res.json({ accessToken: accessToken }); // Updated key name for clarity
});

app.use(authenticateToken);

app.get('/posts', (req, res) => {
    console.log('Authenticated user:', req.user);
    console.log('Filtering for:', req.user.name);
    
    const filteredPosts = posts.filter(post => post.name.toLowerCase() === req.user.name.toLowerCase());
    console.log('Filtered posts:', filteredPosts);
    res.json(filteredPosts);
});

app.listen(3000, () => console.log('Server running on port 3000'));
