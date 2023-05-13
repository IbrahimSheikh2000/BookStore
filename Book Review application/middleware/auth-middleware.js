import jwt from 'jsonwebtoken'
import userModel from '../models/userSchema.js'
import bookModel from '../models/bookSchema.js'

const checkUserAuth = async(req, res, next)=>{
    let token
    const {authorization} = req.headers
    if(authorization && authorization.startsWith('Bearer')){
        try{
            token = authorization.split(' ')[1]

            //verify token
            const {userID} = jwt.verify(token, process.env.JWT_SECRET_KEY)
            req.user = await userModel.findById(userID).select("-password")
            next()
        }catch(error){
            res.send({"status": "failed", "message":"unauthorized user"})
        }
    } if( ! token){
        res.status(401).send({"status":"error", "message":"No token"})
    }

    }
export default checkUserAuth
