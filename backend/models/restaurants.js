const mongoose = require('mongoose')
const {Schema} = mongoose

const restaurantSchema = new mongoose.Schema({
    name: String,
    address: String,
    photos: String,
    description: String,
    ratings: String,
    timings: String,
    menu_items: Array,
})

const RestaurantModel = mongoose.model('Restaurant', restaurantSchema)

module.exports = RestaurantModel