const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'data', 'restaurants.json');

function storedRestaurants(){
    const fileData = fs.readFileSync(filePath);
    const storedRestaurants = JSON.parse(fileData);

    return storedRestaurants;
}

function storeRestaurants(storedRestaurants){
    fs.writeFileSync(filePath, JSON.stringify(storedRestaurants));
}

module.exports = {
    storedRestaurants: storedRestaurants,
    storeRestaurants: storeRestaurants
}