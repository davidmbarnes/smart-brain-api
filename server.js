const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
const {
    json
} = require('body-parser');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = knex({
    client: 'pg',
    connection: {
        host: '127.0.0.1',
        user: 'postgres',
        password: 'test',
        database: 'smart-brain'
    }
});

db.select('*').from('users').then(data => {
    console.log(data);
});

const app = express();

app.use(cors())
app.use(express.json()); // latest version of exressJS now comes with Body-Parser!

app.get('/', (req, res) => {
    res.send(db.users)
})
app.post('/signin', signin.handleSignin(db, bcrypt))
app.post('/register', (req, res) => {
    register.handleRegister(req, res, db, bcrypt)
})
app.get('/profile/:id', (req, res) => {
    profile.handleProfileGet(req, res, db)
})
app.put('/image', (req, res) => {
    image.handleImage(req, res, db)
})
app.post('/imageurl', (req, res) => {
    image.handleApiCall(req, res)
})

app.listen(3000, () => {
    console.log('app is running on port 3000');
})