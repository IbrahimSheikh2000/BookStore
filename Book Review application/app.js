import express from 'express'
import connectDB from './config/connectdb.js'
import dotenv from 'dotenv'
dotenv.config()
import web from './routes/web.js'
const app = express()
const port = process.env.PORT
const DATABASE_URL = process.env.DATABASE_URL

connectDB(DATABASE_URL)

app.use(express.json())

app.use('/', web)

app.listen(port, ()=>{
    console.log(`Server listening on port ${port}`)
})