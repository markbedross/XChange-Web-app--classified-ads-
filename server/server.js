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
.catch (err => console.log(err))

const createToken = _id => jwt.sign({_id}, process.env.jwtSecret, { expiresIn: '5d' })

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

    try{
        const {authorization} = req.headers
    
        if(!authorization) throw Error("Authorization token required")
    
        const token = authorization.split(' ')[1] // gets token from authorization header
        const {_id} = jwt.verify(token, process.env.jwtSecret)
        const user = await User.findOne({_id})
    
        if (!user) throw Error("Not authorized")

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
    } catch(err){
        res.status(500).json({error: err.message})
    }
})

app.get('/createAd/:id', async(req, res)=>{

    const adId = req.params.id

    try{
        const {authorization} = req.headers
    
        if(!authorization) throw Error("Authorization token required")
    
        const token = authorization.split(' ')[1] // gets token from authorization header
        const {_id} = jwt.verify(token, process.env.jwtSecret)
        const user = await User.findOne({_id})
    
        if (!user) throw Error("Not authorized")

        const ad = await Ad.findOne({_id: adId})

        if (user._id.toString() !== ad.owner.toString()) throw Error("Not authorized")

        res.json(ad)

    } catch (err) {
        console.log(err.message)
        res.status(500).json({error: err.message})
    }

})

app.post('/createAd', async(req, res)=>{
    try{
        const ad = await Ad.createAd(req.headers, req.body)
        res.json(ad)
    } catch (err) {
        console.log(err.message)
        res.status(500).json({error: err.message})
    }
})

app.put('/createAd/:id', async(req, res)=>{
    try{
        const ad = await Ad.updateAd(req.headers, req.body)
        res.json(ad)
    } catch (err) {
        console.log(err.message)
        res.status(500).json({error: err.message})
    }
})

app.get('/userAds', async(req, res)=>{

    try {
    const {authorization} = req.headers
    
    if(!authorization) throw Error("Authorization token required")

    const token = authorization.split(' ')[1] // gets token from authorization header
    const {_id} = jwt.verify(token, process.env.jwtSecret)
    const user = await User.findOne({_id})

    if (!user) throw Error("Not authorized")

    const ads = await Ad.find({owner: _id})

    res.json(ads)

    } catch (err) {
        res.status(500).json({error: err.message})
    }
})

app.get('/ads', async (req, res) => {
    res.json(await Ad.find({}))
})

app.get('/ads/:id', async (req, res) => {
    const {id} = req.params
    res.json (await Ad.find({_id: id}))
})

app.delete('/delete/:id', async (req, res) => {
    const {id} = req.params
    const deletedAd = await Ad.deleteAd(req.headers, id)
    res.json(deletedAd)
})