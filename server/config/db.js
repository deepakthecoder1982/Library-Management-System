const mongoose = require("mongoose");
require("dotenv").config();
const connection =  mongoose.connect(`${process.env.MONGO_URL}`)
// .then(()=>{
//         console.log("MongoDB connected");
// }).catch((err)=>{
//         console.log(`Error Connecting DB`,err?.message)
// })

module.exports = connection;