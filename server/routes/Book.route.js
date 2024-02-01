const bookModels = require("../models/Book.model");

const bookRoute = require("express").Router();

bookRoute.get("/", async (req, res) => {
    try {
        let bookData = await bookModels.find();
        res.status(200).send({ bookData, message: "Fetched Data Sucessfully!!" });
    } catch (err) {
        res.status(400).send({ err: err?.message });
    }
})

bookRoute.post("/create", async (req, res) => {
    try {
        //Before creating book check if it exist or not
        const { title, author } = req?.body;
        let existingBook = await bookModels.findOne({title});
        
        if(existingBook){
            return res.status(400).send({message:"Book already exist!!",existingBook});
        }

        let bookData = new bookModels({ title, author });
        
        await bookData.save();

        res.status(201).send({ bookData, message: "Book added Sucessfully!!" });
    } catch (err) {
        res.status(400).send({ message: err?.message });

    }
})
bookRoute.patch("/update/:id", async (req, res) => {
    // const {title,author} = req?.body;
    const id = req.params?.id;
    try {
        let bookData = await bookModels.findById({ _id: id });
        // console.log(bookData);
        if (!bookData) {
            return res.status(400).send({ message: "Book not available" });
        }
        bookData = await bookModels.findOneAndUpdate({ _id: id, ...req.body });
        res.status(200).send({ bookData, message: "Book Updated Sucessfully!!" });
    } catch (err) {
        res.status(400).send({ message: err?.message });

    }
})
bookRoute.delete("/delete/:id", async (req, res) => {
    const id = req.params?.id;
    try {
        let bookData = await bookModels.findById({ _id: id });
        if (!bookData) {
            return res.status(400).send({ message: "Book not available" });
        }
        bookData = await bookModels.findOneAndDelete({ _id: id });
        // console.log(bookData);

        res.status(200).send({ bookData, message: "Book Deleted Sucessfully!!" });
    } catch (err) {
        res.status(400).send({ message: err?.message });

    }
})

module.exports = bookRoute;