const express = require('express');
const router = express.Router();

//middleware
router.use((req, res, next) => {
    console.log('Time: ', Date.now());
    next();
});

//routes
router.route('/')
  .get((req, res) => {
        res.send('My home page');
    })
  .post((req, res) => {
        res.send('A project was added');
    })
  .put((req, res) => {
        res.send('A project was added')
    })
  .delete((req, res) => {
        res.send('A project was deleted')
    });

router.get('/about', (req, res) => {
    res.send('About me');
});

module.exports = router;