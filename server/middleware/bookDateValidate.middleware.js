const validateBookData = (req, res, next) => {

    const { author,title,userRole } = req.body;

    console.log(req.method,userRole)

    if (!author || !title || userRole?.lengths == 0 || !userRole) {
        return res.status(400).send({ message: "All fields are required" });
    }
    const methodsNotAllow =["POST","PATCH","PUT","DELETE"]
    if(userRole.includes("VIEW_ALL") && methodsNotAllow.includes(req?.method)){
        return res.status(400).send({message:"Not Authorized to perform this action"})
    }
    // Apply the logic here of VIEWER AND CREATOR
    next();
};

module.exports = validateBookData;
