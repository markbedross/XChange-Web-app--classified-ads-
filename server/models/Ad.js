const mongoose = require('mongoose')

const adSchema = new mongoose.Schema({
    owner: {type:mongoose.Schema.Types.ObjectId, ref:'User'},
    title: String,
    location: String,
    photos: [String],
    description: String,
    price: Number
})

const Ad = mongoose.model('Ad', adSchema)

module.exports = Ad