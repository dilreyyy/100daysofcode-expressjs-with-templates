//run this commands to use this project
//npm install express
//npm install --save-dev nodemon 

const express = require('express');

const app = express();

app.get('/', function(req, res){
    res.send("Hello world!");
});

app.listen(3000);