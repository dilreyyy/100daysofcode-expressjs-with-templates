//run this commands to use this project
//npm install express
//npm install --save-dev nodemon 
const path = require('path');

const express = require('express');

const app = express();

app.get('/', function(req, res){
    const htmlfilePath = path.join(__dirname, 'views', 'index.html');
    res.sendFile(htmlfilePath);
});

app.get('/about', function(req, res){
    const htmlfilePath = path.join(__dirname, 'views', 'about.html');
    res.sendFile(htmlfilePath);
});
app.get('/confirm', function(req, res){
    const htmlfilePath = path.join(__dirname, 'views', 'confirm.html');
    res.sendFile(htmlfilePath);
});
app.get('/recommend', function(req, res){
    const htmlfilePath = path.join(__dirname, 'views', 'recommend.html');
    res.sendFile(htmlfilePath);
});
app.get('/restaurants', function(req, res){
    const htmlfilePath = path.join(__dirname, 'views', 'restaurants.html');
    res.sendFile(htmlfilePath);
});

app.listen(3000);