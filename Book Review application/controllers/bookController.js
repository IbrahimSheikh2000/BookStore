import bookModel from "../models/bookSchema.js";

class bookController{

    static getBook = async (req, res)=>{
        const result = await bookModel.find().select("title")
        res.send(result)
    }

    static addBooktoDatabase = async (req, res)=>{
        const {title, author, isbn, amount, reviews, genre} = req.body
        const book = await bookModel.findOne({title: title})
        if(title && author && isbn && amount){
            const new_book = new bookModel({
                title: title,
                author: author,
                reviews: reviews,
                isbn: isbn,
                genre: genre,
                amount: amount
            })
            await new_book.save()
            res.send({"status": "Success", "message":"Book Added"})
        }else{
            res.send("All fields are required")
        }
    }
    
    static getBookbyISBN = async(req, res)=>{
        const isbn = req.params.isbn
        const book = await bookModel.findOne({isbn: isbn}).select('-amount')
        if (book){
            res.send(book)
        }else{
            res.status(401).send({"status":"error", "message":"Book not found"})
        }
    }
    static getBookbyAuthor = async(req, res)=>{
        const author = req.params.author
        const book = await bookModel.find({author: author}).select('-amount')
        if(book.length == 0){
            res.send({"status":"error", "message":"Cannot find author"})
            
        }else{
            res.send(book)
        }
    }

    static getBookbytitle = async(req, res)=>{
        const title = req.params.title
        const book = await bookModel.findOne({title: title}).select('-amount')
        if (book){
            res.send(book)
        }else{
            res.status(401).send({"status":"error", "message":"Book not found"})
        }
    }

    static getbookbyGenre = async(req, res)=>{
        const genre = req.body.genre
       if(genre){
            try{
                const book = await bookModel.find({genre: genre})
                if(book.length == 0){
                    res.json({"status":"Failed", "message":"We couldn't find a book of your entered genre"})
                }else{
                   const result = await bookModel.find({genre: genre}).select('title author isbn genre')
                   res.json({"status":"Success", "books": result})
                }
            }catch(error){
                res.json({"error": error})
            }
        }else{
            res.json({"status":"Failed", "message":"Please enter genre"})
        }
        }
    }
  

export default bookController