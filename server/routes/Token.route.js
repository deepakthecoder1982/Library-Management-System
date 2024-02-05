const { verifyToken } = require("../utils/jwt");
const dotenv = require('dotenv');
dotenv.config();
const tokenRoute = require("express").Router();

tokenRoute.post("/",(req,res)=>{
    try{
        const token = req?.body?.token;
        console.log(token,process.env.SECRET_KEY);
        if(!token){
            return res.status(204).send({message:"Token is empty"});
        }
        const isTokenValid = verifyToken(token);
        if(!isTokenValid?.username){
            return res.status(401).send({message:"Invalid token"});
        }
        return res.status(200).send({decodeToken:isTokenValid,message:"Token verified succesfully!"})
    }catch(err){
        res.status(400).send({error:err?.message})
    }
    
})
module.exports = tokenRoute