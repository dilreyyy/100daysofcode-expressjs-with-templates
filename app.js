//run this commands to use this project
//npm install express
//npm install --save-dev nodemon 
//npm install ejs
//npm install uuid
const path = require('path');
const fs = require('fs');
const express = require('express');
const uuid = require('uuid');

const app = express();

app.set('views', path.join(__dirname, 'views')); //for ejs templates
app.set('view engine', 'ejs');

app.use(express.urlencoded({extended: false})); //to use req.body

app.use(express.static('public'));//to use css js requests

app.get('/', function(req, res){//index route
    res.render('index');
});

app.get('/about', function(req, res){//about route
    res.render('about');
});
app.get('/confirm', function(req, res){//confirm route
    res.render('confirm');
});
app.get('/recommend', function(req, res){//recommend route
    res.render('recommend');
});

app.post('/recommend', function(req, res){//handle post request from recommend form data
    const restaurants = req.body;
    restaurants.id = uuid.v4();
    const filePath = path.join(__dirname, 'data', 'restaurants.json');
    const fileData = fs.readFileSync(filePath);

    const storedRestaurants = JSON.parse(fileData);

    storedRestaurants.push(restaurants);
    fs.writeFileSync(filePath, JSON.stringify(storedRestaurants));
    res.redirect('/confirm');
});

app.get('/restaurants', function(req, res){//restaurant route, display dyanmic data from json file

    const filePath = path.join(__dirname, 'data', 'restaurants.json');
    const fileData = fs.readFileSync(filePath);
    const storedRestaurants = JSON.parse(fileData);

    res.render('restaurants', { numOfRestaurants: storedRestaurants.length, restaurants: storedRestaurants});
});

app.get('/restaurants/:rid', function(req, res){//display resto details with using dynamic id
    const restoID = req.params.rid;

    const filePath = path.join(__dirname, 'data', 'restaurants.json');
    const fileData = fs.readFileSync(filePath);
    const storedRestaurants = JSON.parse(fileData);

    for ( const restaurant of storedRestaurants){
        if( restaurant.id === restoID){
            return res.render('restaurant-details', {restaurant: restaurant });
        }
    }

    
});

app.listen(3000);