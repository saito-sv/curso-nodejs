import User from '../models/user.js'

import {sendVerificationEmail} from '../services/mailer.js'
import { newAuthToken } from '../services/token.js'

  
export const refreshToken = (req, res) => { 
  return res.json({})
} 

export const register  = async (req, res) => {
    const {firstName, lastName, email, password} = req.body;
    const userToSave = new User(firstName, lastName, email, password)
    try { 
      const savedUser = await userToSave.save();
      sendVerificationEmail(savedUser)
      return res.send({user:savedUser, token:newAuthToken(savedUser.id)})
    } catch (err) { 
      return res.status(500).send({status:"error", message:"Something went wrong"})
    }
} 

  export const login = async (req,res)=>{
    const {email, password} = req.body;
    if(email === "" || password === ""){
     return res.status(400).send({message:"Invalid Credentials"})
     
    }

    try { 
      const {valid, found, user} = await User.findByEmailAndComparePassword(email, password)
      if(!valid) return res.status(400).send({status:"error", message:"Invalid credentials"});
      if(!found) return res.status(404).send({status:"error", message:"User not found"});
      return res.send({user:user, token:newAuthToken(user.id)})

    } catch( err) { 
      return res.status(500).send({status:"error", message:"Something went wrong"})
    }
  }

  export const verifyEmail = (req, res) => { 
   
  }

  export default { register, login, verifyEmail}
