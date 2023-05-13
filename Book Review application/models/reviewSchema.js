import mongoose from 'mongoose'


const reviewSchema = new mongoose.Schema({
    review_by:({type: String, required: true}),
    isbn: ({type: String, required: true}),
    review:({type: String}),
    date:({type: Date, default: Date.now()})
})

const reviewModel = mongoose.model("review", reviewSchema)

export default reviewModel