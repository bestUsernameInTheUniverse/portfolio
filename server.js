const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const profile = require('./profile');
const sgMail = require('@sendgrid/mail');
require('dotenv').config();

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

    sgMail.setApiKey(process.env.SENDGRID_API_KEY);

    const msg = {
      to: process.env.MY_EMAIL,
      from: userObj.email,
      subject: 'Sending with SendGrid is Fun',
      text: 'and easy to do anywhere, even with Node.js',
      html: '<strong>and easy to do anywhere, even with Node.js</strong>',
    };    
    
    sgMail.send(msg, function(err, data) {
        res.render('thanks', { contact: userObj })
    });
});

app.listen(8080, () => {
    console.log('listening at http://localhost:8080');
});