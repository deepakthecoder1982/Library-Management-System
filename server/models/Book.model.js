const mongoose = require("mongoose")

const bookSchema = new mongoose.Schema({
    title:{type:String,required:true},
    author:{type:String,required:true},
    createdAt:{type:Date,default:Date.now}
})


const bookModels = mongoose.model('Books',bookSchema)

module.exports = bookModels;