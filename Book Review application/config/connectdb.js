import mongoose from 'mongoose'

const connectDB = async (DATABASE_URL)=>{
    try{
        const DB_options = {
            dbName: 'Book-Users'
        }
        await mongoose.connect(DATABASE_URL, DB_options)
        console.log('connected successfully')
    }catch(error){
        console.log('Couldnt connect to database')
    }
}

export default connectDB