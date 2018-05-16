const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const profile = require('./profile');
require('dotenv').config();
const twilio = require('twilio');
const client = new twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);

const app = express();

//Middleware
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Routes
app.use('/profile', profile);

//EJS stuff
app.set('views', './views');
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    const data = {
        person: {
            firstName: 'Yuri',
            lastName: 'Kromsky'
        }
    }
    res.render('index', data);
})

app.get('/contact', (req, res) => {
    res.render('contact');
});
  
app.post('/thanks', (req, res) => {
    var userObj = { 
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email
    };

    client.messages.create({
        body: userObj.email,
        to: process.env.MY_PHONE_NUMBER,
        from: process.env.TWILIO_PHONE_NUMBER
    })
    .then((message) => {
        console.log(message.sid)
        res.render('thanks', { contact: userObj })
    });
});

app.listen(8080, () => {
    console.log('listening at http://localhost:8080');
});