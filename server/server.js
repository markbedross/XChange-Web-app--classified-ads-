const express = require('express')
const app = express()
const cors = require('cors')

const PORT = 8000

app.use(express.json())
app.use(cors())

app.get('/test', (req, res)=>{
    res.json({"test": "test"})
})

app.post('/register', (req, res)=>{
    const {name, email, password} = req.body
    console.log("post")
    res.json({name, email, password})
})

app.listen(PORT, ()=>console.log(`Listening on ${PORT}`))