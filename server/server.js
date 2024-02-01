const express = require("express");
const bookRoute = require("./routes/Book.route");
const dotenv = require("dotenv");
const connection = require("./config/db");
const UserRoute = require("./routes/auth.route");
const validateData = require("./middleware/ValidateData.middleware");
dotenv.config();

const bodyParser = require('body-parser');
const authValidate = require("./middleware/auth.middleware");
const validateBookData = require("./middleware/bookDateValidate.middleware");

const app = express();
//  previously wer were using app.use(express.json()) instead of bodyPraser 
//it's an external library but a good one
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/books/",authValidate,validateBookData,bookRoute)
app.use("/auth/",validateData,UserRoute)


const PORT = process.env.PORT || 8080;

app.listen(PORT,async()=>{
    try{
        await connection;
        console.log('The server is running on port ',PORT)
        console.log('connected to DB')

    }catch(err){
        console.log({"Error Message":err?.message})
    }

})