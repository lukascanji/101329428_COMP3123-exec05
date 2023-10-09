const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const router = express.Router();

// Task 1: /home route
router.get('/home', (req, res) => {
    res.sendFile(path.join(__dirname, 'home.html'));
});

// Task 2: /profile route
router.get('/profile', (req, res) => {
    const userJsonPath = path.join(__dirname, 'user.json');
    fs.readFile(userJsonPath, 'utf8', (err, data) => {
        if (err) {
            console.error('Failed to read user.json:', err);
            res.status(500).send('Internal Server Error');
            return;
        }
        res.json(JSON.parse(data));
    });
});

// Task 3: /login route
router.get('/login', (req, res) => {
    const { username, password } = req.query;
    const userJsonPath = path.join(__dirname, 'user.json');
    fs.readFile(userJsonPath, 'utf8', (err, data) => {
        if (err) {
            console.error('Failed to read user.json:', err);
            res.status(500).send('Internal Server Error');
            return;
        }
        const user = JSON.parse(data);
        if (username !== user.username) {
            res.json({
                status: false,
                message: "Username is invalid"
            });
        } else if (password !== user.password) {
            res.json({
                status: false,
                message: "Password is invalid"
            });
        } else {
            res.json({
                status: true,
                message: "User is valid"
            });
        }
    });
});

// Task 4: /logout route
router.get('/logout', (req, res) => {
  const { username } = req.query;
  if (!username) {
    res.status(400).send('Bad Request: Username is required');
    return;
  }
  res.send(`<b>${username} successfully logged out.</b>`);
});

app.use('/', router);

app.listen(process.env.port || 8081);

console.log('Web Server is listening at port '+ (process.env.port || 8081));
