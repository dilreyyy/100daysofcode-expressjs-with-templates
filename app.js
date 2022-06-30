//run this commands to use this project
//npm install express
//npm install --save-dev nodemon 
//npm install ejs
//npm install uuid
const path = require('path');
const express = require('express');
const { render } = require('ejs');
const defaultRoutes = require('./routes/default');
const restoRoutes = require('./routes/restaurants');

const app = express();

//for ejs templates
app.set('views', path.join(__dirname, 'views')); 
app.set('view engine', 'ejs');

//to use req.body
app.use(express.urlencoded({extended: false})); 

//to use css js requests
app.use(express.static('public'));

//middleware that handles the defaults routes
app.use('/', defaultRoutes); 
//middleware that handles routes for restaurants
app.use('/', restoRoutes);


// handle all not found links
app.use((req, res)=>{ 
    res.status(404).render('404');
});

// handle all server side errors
app.use((error, req, res, next) => {
    res.status(500).render('500');
})
app.listen(3000);