/*
    server.js ka kaam server start karna
    Aur database se connect karna  hai
*/

const app = require('./src/app')
const mongoose = require('mongoose')

function connectToDb(){
    mongoose.connect("mongodb://127.0.0.1:27017/day-6")
    .then(()=>{
        console.log("Connected to database")
    })
}
connectToDb()

app.listen(3000,()=>{
    console.log("server is listening to the port 3000")
})