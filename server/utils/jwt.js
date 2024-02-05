const jwt = require("jsonwebtoken");
const dotenv = require('dotenv');
dotenv.config();

const generateToken = (data={},secretKey=process.env.SECRET_KEY ||'secret',expiresIn="1hr")=>{
    // jwt.sign({ foo: 'bar',...data}, privateKey, { algorithm: 'RS256' }, function(err, token) {
    //     console.log(token);
    //     return token
    //   });   
     let token = jwt.sign({
        ...data
      }, secretKey, { expiresIn });

    return token
}

const verifyToken = (token,secretKey=process.env.SECRET_KEY ||'secret')=>{
    
    if(!token){
        return null
    }

    try{
        var decoded = jwt.verify(token, secretKey);
        return {...decoded};
    }catch(err){
        if(err.name === "TokenExpiredError"){
            console.log('Token has expired')
        }else{
            console.log("Error decoding token: ",err.message)
            return null;
        }
        
    }

}

module.exports = {generateToken,verifyToken};