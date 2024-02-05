const bookModels = require("../models/Book.model");

const bookRoute = require("express").Router();

bookRoute.get("/", async (req, res) => {
    try {
        const Old = req?.query?.old;
        const New = req?.query?.new;

        let bookData;
        
        if(Old){
            const tenMinutesAgo = new Date(Date.now() - 10 * 60 * 1000 );
            bookData = await bookModels.find({createdAt:{$lt:tenMinutesAgo}})
            
        }else if(New){
            const tenMinutesAgo = new Date(Date.now() - 10 * 60 * 1000 );
            bookData = await bookModels.find({createdAt:{$gte:tenMinutesAgo}})
        }else{
            bookData = await bookModels.find(); 
        }

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
            return res.status(200).send({message:"Book already exist!!",existingBook});
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
    console.log(id)
    try {
        let bookData = await bookModels.findById({ _id: id });
        // console.log(bookData);
        if (!bookData) {
            return res.status(200).send({ message: "Book not available" });
        }
        bookData = await bookModels.findByIdAndUpdate(id,{...req.body });
        let updatedBooksData = await bookModels.find();
        res.status(200).send({ bookData, message: "Book Updated Sucessfully!!",updatedBooksData });
    } catch (err) {
        res.status(400).send({ message: err?.message });

    }
})
bookRoute.delete("/delete/:id", async (req, res) => {
    const id = req.params?.id;
    console.log("id",id)
    try {
        let bookData = await bookModels.findById({ _id: id });
        if (!bookData) {
            return res.status(200).send({ message: "Book not available" });
        }
        bookData = await bookModels.findOneAndDelete({ _id: id });
        // console.log(bookData);
        let remainingData = await bookModels.find();

        res.status(200).send({ bookData, message: "Book Deleted Sucessfully!!",remainingData});
    } catch (err) {
        res.status(400).send({ message: err?.message });

    }
})

module.exports = bookRoute;