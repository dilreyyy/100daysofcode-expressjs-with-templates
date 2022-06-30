const express = require('express');
const router = express.Router();
const restoData = require('../util/restaurant-data');
const uuid = require('uuid');


//confirm route
router.get('/confirm', function(req, res){
    res.render('confirm');
});

//recommend route
router.get('/recommend', function(req, res){
    res.render('recommend');
});

//handle post request from recommend form data
router.post('/recommend', function(req, res){
    const restaurants = req.body;
    restaurants.id = uuid.v4();

    const restaurantsDB = restoData.storedRestaurants();

    restaurantsDB.push(restaurants);
    restoData.storeRestaurants(restaurantsDB);

    res.redirect('/confirm');
});

//restaurant route, display dyanmic data from json file
router.get('/restaurants', function(req, res){
    let order = req.query.order; 
    let nextOrder = 'desc';

    if(order !== 'asc' && order !== 'desc'){ //catch any other values
        order = 'asc';
    }

    if(order === 'desc'){ //for next order
        nextOrder = 'asc';
    }

    const storedRestaurants = restoData.storedRestaurants();

    storedRestaurants.sort(function(resA, resB){
        if(order === 'asc' && resA.name > resB.name || order === 'desc' && resB.name > resA.name){
            return 1;
        }

        return -1;
    });

    res.render('restaurants', { numOfRestaurants: storedRestaurants.length, restaurants: storedRestaurants, nextOrder: nextOrder});
});

//display resto details with using dynamic id
router.get('/restaurants/:rid', function(req, res){
    const restoID = req.params.rid;

    const storedRestaurants = restoData.storedRestaurants();

    for ( const restaurant of storedRestaurants){
        if( restaurant.id === restoID){
            return res.render('restaurant-details', {restaurant: restaurant });
        }
    }

    res.status(404).render('404');
});

module.exports = router;