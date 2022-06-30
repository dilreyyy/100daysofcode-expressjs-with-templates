const express = require('express');
const router = express.Router();

//index route
router.get('/', function(req, res){
    res.render('index');
});

//about route
router.get('/about', function(req, res){
    res.render('about');
});

module.exports = router;