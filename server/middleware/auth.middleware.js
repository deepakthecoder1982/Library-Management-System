const { verifyToken } = require("../utils/jwt");
const dotenv = require("dotenv")
dotenv.config();

const authValidate = (req, res, next) => {
    const token = req.headers?.token;
    console.log(token)
    let secretKey = process.env.SECRETKEY;

    console.log("token",verifyToken(token,secretKey));

    if (!token) {
        return res.status(400).send({ message: "Token is missing, or expired!, Please sign in again" });
    }
    if(!verifyToken(token,secretKey)){
        return res.status(400).send({ message: "Token is invalid!" });
    }
    let userDataInToken = verifyToken(token,secretKey)
    req.body["userRole"] = userDataInToken?.role;
    req.body["userName"] = userDataInToken?.name;

    next();
};

module.exports = authValidate;
