const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const bodyParser = require('body-parser');

const adRoutes = require('./routes/adRoutes.js')
const userRoutes = require('./routes/userRoutes.js')

const PORT = 8000

// setting transfer limit to 50mb
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

app.use(cors())

app.use('/ad', adRoutes)
app.use('/user', userRoutes)

mongoose.connect(process.env.MONGODB_URI)
.then(()=>{
    app.listen(PORT, ()=>console.log(`Listening on ${PORT}`))
})
.catch (err => console.log(err))
