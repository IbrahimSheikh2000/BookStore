import userModel from '../models/userSchema.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'


class studentController{

    static registerUser = async(req, res)=>{
        const {name, email, password, password_conf} = req.body
        const user = await userModel.findOne({email: email})
        if(user){
            res.send({"status": "failed", "message": "User is already registered on this email"})
        }else{
            if(name && email && password && password_conf){
                if(password != password_conf){
                    res.send({"status":"failed", "message":"password and confirmed password dont match"})
                }else{
                    const salt = await bcrypt.genSalt(10)
                    const hashedpassword = await bcrypt.hash(password, salt)
                    const doc = new userModel({
                        name: name,
                        email: email,
                        password: hashedpassword
                    })
                    await doc.save()
                    const new_user = await userModel.findOne({email: email})
                    const token = jwt.sign({userId: new_user._id}, process.env.JWT_SECRET_KEY, 
                        {expiresIn:"5d" })
                        res.send({"status": "Success", "message":"User registered Successfully",
                    "token": token})
                }
            }else{
                res.send({"status":"failed", "message":"All fields are required"})
            }
        }
    }

    static userLogin = async (req, res)=>{
        const {email, password} = req.body
        if(email && password){
        const user = await userModel.findOne({email: email})
        if(user != null){
            const isMatch = bcrypt.compare(password, user.password)
            if(user.email == email && isMatch){
                const token = jwt.sign({userID: user._id}, process.env.JWT_SECRET_KEY,
                    {expiresIn:"5d"})
                    res.send({"status": "success", "message":"Login success", "token": token})
            }else{
                res.send("Status: failed", "message: Email or Password are invalid")
            }
        }else{
            res.send({"status": "failed", "message": "Email is not registered"})
        }
    }else{
        res.send({"status": "failed", "message": "All fields are required"})
    }
    }

}
export default studentController