import bookModel from "../models/bookSchema.js";
import reviewModel from "../models/reviewSchema.js";
import userModel from "../models/userSchema.js";

class reviewController {

static getReview = async (req, res)=>{
    const {isbn} = req.body
    const book = await reviewModel.find({isbn: isbn}).select("review")
    if(book.length == 0){
        res.status(401).send({"status":"failed", "message":"Either isbn is invalid or book has no reviews"})
    }else{
            res.send(book)
        }
    }


static addReview = async (req, res)=>{
    try{
        const email = req.user.email
        const {isbn, review} = req.body
        if(isbn && review){
            const user = await userModel.findOne({email: email})
            if(user){
                const book = await bookModel.findOne({isbn: isbn})
                if(book){
                  const result = await reviewModel.find({$and: [{isbn:isbn}, {review_by: user.email}]}) 
                   if(result.length == 0){
                    const doc = new reviewModel({
                        review_by: user.email,
                        isbn: isbn,
                        review: review,
                        date: Date.now()
                     })
                    await doc.save()
                     res.send({"status":"Success", "message":"Review added"})
                   }else{
                    res.send({"status":"failed", "message":"You have already added review for this book"})              
                        }
            }else{
                res.send({"status":"failed", "message":"Enter valid ISBN number"})
                }
            }else{
                res.send({"status":"failed", "message":"Only registered users can add a review"})
            }
        }else{
            res.send({"status":"failed", "message":"All fields required"})
        }
    }catch(error){
        res.send(error)
    }
}

static modifyReview = async (req, res)=>{
    try{
        const {isbn, up_review} = req.body
            if(isbn && up_review){
                const book = await bookModel.findOne({isbn: isbn})
                if(book){
                const result = await reviewModel.findOne({$and: [{isbn:book.isbn}, {review_by: req.user.email}]})
                if(result){
                    await reviewModel.updateOne({review: up_review})
                    res.json({status: "success", message:"Review updated"})
                }else{
                res.json({status: "failed", message:"Add a review to modify it"})
                }
            }else{
                res.json({status: "failed", message:"Enter a valid isbn"})
            }
            }else{
                res.json({status:"failed", message:"All fields are required"})
            }
        
    }catch(error){
        res.send(error)
    }
}
    
    static deleteReview = async (req, res)=>{
        const {isbn} = req.body
       if(isbn){
        try{
            const book = await bookModel.findOne({isbn: isbn})
            if(book){
                const result = await reviewModel.findOne({$and: [{isbn: isbn}, {review_by: req.user.email}]})
                if(result){
                    const new_result = await reviewModel.deleteOne({_id: result._id})
                    res.json({"status":"success", "message":"Review deleted successfully"})
                }else{
                    res.json({"status":"error", "message": "We couldn't find a review by you"})
                }
            }else{
                res.json({"status":"failed", "message":"Please enter a valid isbn"})
            }
        }catch(error){
            res.json({"error": error})
        }
       }else{
        res.json({"status":"error", "message":"Please enter isbn"})
       }

    }
}
export default reviewController