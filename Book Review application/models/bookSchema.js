import mongoose from 'mongoose'
import { boolean } from 'webidl-conversions'

const  bookSchema = new mongoose.Schema({
    title: ({type: String, required: true, trim: true}),
    author: ({type: String, required: true, trim: true}),
    isbn:({type: String, required: true}),
    genre:({type: String}),
    reviews: ({type: String}),
    avalible: ({type:Boolean}),
    amount: ({type:Number, required: true})
})

const bookModel = mongoose.model('Book', bookSchema)

export default bookModel