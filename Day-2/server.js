
const express = require('express')

const app = express()

app.get('/',(req,res)=>{
    res.send("Hello")
})

app.get('/home',function (req,res){
    res.send("This is home page")
})
app.get('/about',(req,res)=>{
    res.send("This is about page")
})
app.listen(3000)