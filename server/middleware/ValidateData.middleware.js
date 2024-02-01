const validateData = (req, res, next) => {
    
    const { username, password, role } = req.body;

    if (!username || !password || !role) {
        return res.status(400).send({ message: "All fields are required" });
    }

    next();
};

module.exports = validateData;
