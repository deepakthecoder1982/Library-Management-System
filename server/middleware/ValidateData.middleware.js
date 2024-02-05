const validateData = (req, res, next) => {
    
    const { username, password, role } = req.body;
    
    if ( req.url != "/login" && (!username || !password || !role)) {
        return res.status(400).send({ message: "All fields are required" });
    }
    if(req.url === "/login" && (!username||!password)){
        return res.status(400).send({ message: "All fields are required" });
    }
    
    next();
};

module.exports = validateData;
