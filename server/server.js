const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const multer = require('multer')
const fs = require('fs')
require('dotenv').config()

const User = require("./models/User")
const Ad = require('./models/Ad')

const PORT = 8000

app.use(express.json())
app.use(cors())

app.use('/uploads', express.static(__dirname+'/uploads'))

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
        console.log(user)
        res.json({name, email, token})
    } catch (err) {
        res.status(500).json({error: err.message})
    }

    console.log("post")
})

const photoMiddlware = multer({dest: 'uploads'})

app.post('/upload', photoMiddlware.array('photos', 100), async(req, res)=>{

    const {authorization} = req.headers

    if(!authorization) res.status(500).json({error: "Authorization token required"})
    
    const {_id} = jwt.verify(token, process.env.jwtSecret)
    const user = await User.findOne({_id})

    if (!user) res.status(500).json({error: "Not authorized"})

    const uploadedFiles = []
    for (let i = 0; i < req.files.length; i++){
        const {path, originalname} = req.files[i]
        const parts = originalname.split('.')
        const ext = parts[parts.length - 1]
        const newPath = path + '.' + ext
        fs.renameSync(path, newPath)
        uploadedFiles.push(newPath.replace('uploads\\', ''))
    }

    res.json(uploadedFiles)
})

app.post('/createAd', async(req, res)=>{
    console.log("Create ad", req.body)

    try{
        const ad = await Ad.createAd(req.headers, req.body)
        res.json(ad)
    } catch (err) {
        console.log(err.message)
        res.status(500).json({error: err.message})
    }

})

/*
    title,
    location,
    photos,
    description,
    price
*/