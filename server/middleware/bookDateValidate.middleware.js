const validateBookData = (req, res, next) => {

    const { author,title,userRole } = req.body;

    if((req?.method === "DELETE" || req?.method === "EDIT" )){
       return next();
    }

    if ((!author || !title || userRole?.length == 0 || !userRole) && req.url != '/') {
        console.log(req.method,userRole)
        return res.status(400).send({ message: "All fields are required" });
    }
    const methodsNotAllow =["POST","PATCH","PUT","DELETE"]
    if(userRole.includes("VIEW_ALL") && methodsNotAllow.includes(req?.method)){
        return res.status(400).send({message:"Not Authorized to perform this action"})
    }
    // Apply the logic here of VIEWER AND CREATOR
   return next();
};

module.exports = validateBookData;
