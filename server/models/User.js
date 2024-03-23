const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const validator = require('validator')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})

userSchema.statics.register = async function(name, email, password) {

    if (!name || !email || !password) throw Error("All fields must be included")

    if (!validator.isEmail(email)) throw Error("Not a valid email")
    if (!validator.isStrongPassword(password)) throw Error("Password not strong enough")

    const exists = await this.findOne({ email })

    if (exists) throw Error("Email already in use")

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    const user = await this.create({name, email, password: hash})

    return user
}

const UserModel = mongoose.model('User', userSchema)

module.exports = UserModel