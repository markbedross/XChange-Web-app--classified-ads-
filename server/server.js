const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
require('dotenv').config()

const PORT = 8000

app.use(express.json())
app.use(cors())

mongoose.connect(process.env.connection)
.then(()=>{
    app.listen(PORT, ()=>console.log(`Listening on ${PORT}`))
})

app.get('/test', (req, res)=>{
    res.json({"test": "test"})
})

app.post('/register', (req, res)=>{
    const {name, email, password} = req.body
    console.log("post")
    res.json({name, email, password})
})