//run this commands to use this project
//npm install express
//npm install --save-dev nodemon 
//npm install ejs
const path = require('path');
const fs = require('fs');
const express = require('express');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.urlencoded({extended: false}));

app.use(express.static('public'));

app.get('/', function(req, res){
    res.render('index');
});

app.get('/about', function(req, res){
    res.render('about');
});
app.get('/confirm', function(req, res){
    res.render('confirm');
});
app.get('/recommend', function(req, res){
    res.render('recommend');
});

app.post('/recommend', function(req, res){
    const restaurants = req.body;
    const filePath = path.join(__dirname, 'data', 'restaurants.json');
    const fileData = fs.readFileSync(filePath);

    const storedRestaurants = JSON.parse(fileData);

    storedRestaurants.push(restaurants);
    fs.writeFileSync(filePath, JSON.stringify(storedRestaurants));
    res.redirect('/confirm');
});
app.get('/restaurants', function(req, res){

    const filePath = path.join(__dirname, 'data', 'restaurants.json');
    const fileData = fs.readFileSync(filePath);
    const storedRestaurants = JSON.parse(fileData);

    res.render('restaurants', { numOfRestaurants: storedRestaurants.length, restaurants: storedRestaurants});
});

app.listen(3000);