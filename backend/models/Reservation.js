const mongoose = require('mongoose')

const reservationSchema = new mongoose.Schema({
    restaurant: {type:mongoose.Schema.Types.ObjectId, required: true, ref: 'Restaurant'},
    user: {type:mongoose.Schema.Types.ObjectId, required: true},
    dineDate: {type: Date, required: true},
    dineTime: {type: String, required: true},
    reservationName: {type: String, required: true},
    phomeNumber: {type: String, required: true}, 
    reservationPeople: {type: Number, required: true},
})

const ReservationModel = mongoose.model('Reservation', reservationSchema)

module.exports = ReservationModel