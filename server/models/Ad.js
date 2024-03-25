const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')

const adSchema = new mongoose.Schema({
    owner: {type:mongoose.Schema.Types.ObjectId, ref:'User'},
    title: String,
    location: String,
    photos: [String],
    description: String,
    price: Number
})

adSchema.statics.createAd = async function(headers, data){

    const {authorization} = headers
    const {title, location, photos, description, price} = data

    console.log("got")

    if (!title || !location || !price) throw Error("Title, Location, and Price are required")
    if (isNaN(price)) throw Error("Price must be a number")

    console.log("got past")

    if (!authorization) throw Error("Authorization needed")

    const token = authorization.split(' ')[1] // gets token from authorization header

    try{
        const {_id} = jwt.verify(token, process.env.jwtSecret)

        const ad = await this.create({
            owner: _id,
            title,
            location,
            photos,
            description,
            price
        })

        return ad

    } catch (err) {
        console.log(err)
        throw Error("Not authorized")
    }

}

const Ad = mongoose.model('Ad', adSchema)

module.exports = Ad