
const express = require("express")
const noteModel = require('./models/notes.model')
const path = require('path')
const cors = require('cors')
const app = express()

app.use(express.json())
app.use(cors())
app.use(express.static('./public'));

app.post('/Api/notes',async (req,res) =>{
    const {title,description} = req.body
    const note = await noteModel.create({
        title,description
    })
    res.status(201).json({
        message:"note created!",
        note
    })
})
app.get('/Api/notes',async (req,res) =>{
    const note = await noteModel.find()

    res.status(200).json({
        message:"note fetched!",
        note
    })
})
app.delete('/Api/notes/:id',async (req,res) =>{
    const id = req.params.id
    await noteModel.findByIdAndDelete(id)

    res.status(200).json({
        message:"note deleted successfully!"
    })
})

app.patch('/Api/notes/:id',async (req,res) =>{
    const id = req.params.id
    const {description} = req.body

    await noteModel.findByIdAndUpdate(id,{description})

    res.status(200).json({
        message:"note updated successfully!"
    })
})
app.use('*name',(req,res)=>{
    res.sendFile(path.join(__dirname,"..","/public/index.html"))
})
module.exports = app