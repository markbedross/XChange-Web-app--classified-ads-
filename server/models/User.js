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

userSchema.statics.register = async function(name, email, password) { // static method for registering a new user

    if (!name || !email || !password) throw Error("All fields must be included")
    if (!validator.isEmail(email)) throw Error("Invalid email")
    if (!validator.isStrongPassword(password)) throw Error("Password not strong enough") // checks

    const exists = await this.findOne({ email }) // sees if email exists in db already

    if (exists) throw Error("Email already in use")

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt) // creates hash for password

    const user = await this.create({name, email, password: hash}) // creates user in db

    return user
}

userSchema.statics.login = async function(email, password) { // static method for logging a user in

    if (!email || !password) throw Error("All fields must be included")

    const user = await this.findOne({ email }) // sees if user exists

    if (!user) throw Error("Incorrect email")

    const match = await bcrypt.compare(password, user.password) // if exists, compares password

    if (!match) throw Error("Incorrect password") // if password doesn't match, throws error

    return user
}

const UserModel = mongoose.model('User', userSchema)

module.exports = UserModel