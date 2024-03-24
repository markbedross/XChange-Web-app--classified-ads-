const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const User = require("./models/User")
const jwt = require('jsonwebtoken')
require('dotenv').config()

const PORT = 8000

app.use(express.json())
app.use(cors())

mongoose.connect(process.env.connection)
.then(()=>{
    app.listen(PORT, ()=>console.log(`Listening on ${PORT}`))
})

const createToken = _id => jwt.sign({_id}, process.env.jwtSecret, { expiresIn: '5d' })

app.get('/home', (req, res)=>{

    const {authorization} = req.headers
    console.log(authorization)

    res.json({"test": "test"})
})

app.post('/register', async (req, res)=>{

    const {name, email, password} = req.body

    try{
        const user = await User.register(name, email, password)
        const token = createToken(user._id)
        res.json({name, email, token})
    } catch (err) {
        res.status(500).json({error: err.message})
    }

    console.log("post")
})

app.post('/login', async (req, res)=>{

    const {email, password} = req.body

    try{
        const user = await User.login(email, password)
        const name = user.name
        const token = createToken(user._id)
        res.json({name, email, token})
    } catch (err) {
        res.status(500).json({error: err.message})
    }

    console.log("post")
})