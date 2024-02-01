const mongoose = require("mongoose")
const userSchema = new mongoose.Schema({
    username:{type:String,required:true},
    password:{type:String,required:true},
    role:[{type:String,required:true}]
});


const userModels = mongoose.model('User',userSchema)

module.exports = userModels;