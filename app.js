//run this commands to use this project
//npm install express
//npm install --save-dev nodemon 
//npm install ejs
//npm install uuid
const path = require('path');
const fs = require('fs');
const express = require('express');
const uuid = require('uuid');
const { render } = require('ejs');

const app = express();

//for ejs templates
app.set('views', path.join(__dirname, 'views')); 
app.set('view engine', 'ejs');

//to use req.body
app.use(express.urlencoded({extended: false})); 

//to use css js requests
app.use(express.static('public'));

//index route
app.get('/', function(req, res){
    res.render('index');
});

//about route
app.get('/about', function(req, res){
    res.render('about');
});

//confirm route
app.get('/confirm', function(req, res){
    res.render('confirm');
});

//recommend route
app.get('/recommend', function(req, res){
    res.render('recommend');
});

//handle post request from recommend form data
app.post('/recommend', function(req, res){
    const restaurants = req.body;
    restaurants.id = uuid.v4();
    const filePath = path.join(__dirname, 'data', 'restaurants.json');
    const fileData = fs.readFileSync(filePath);

    const storedRestaurants = JSON.parse(fileData);

    storedRestaurants.push(restaurants);
    fs.writeFileSync(filePath, JSON.stringify(storedRestaurants));
    res.redirect('/confirm');
});

//restaurant route, display dyanmic data from json file
app.get('/restaurants', function(req, res){

    const filePath = path.join(__dirname, 'data', 'restaurants.json');
    const fileData = fs.readFileSync(filePath);
    const storedRestaurants = JSON.parse(fileData);

    res.render('restaurants', { numOfRestaurants: storedRestaurants.length, restaurants: storedRestaurants});
});

//display resto details with using dynamic id
app.get('/restaurants/:rid', function(req, res){
    const restoID = req.params.rid;

    const filePath = path.join(__dirname, 'data', 'restaurants.json');
    const fileData = fs.readFileSync(filePath);
    const storedRestaurants = JSON.parse(fileData);

    for ( const restaurant of storedRestaurants){
        if( restaurant.id === restoID){
            return res.render('restaurant-details', {restaurant: restaurant });
        }
    }

    res.status(404).render('404');
});

// handle all not found links
app.use((req, res)=>{ 
    res.status(404).render('404');
});

// handle all server side errors
app.use((error, req, res, next) => {
    res.status(500).render('500');
})
app.listen(3000);