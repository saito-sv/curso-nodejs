import {User} from '../models/user.js'
import bcrypt from 'bcrypt'
import {sendVerificationEmail} from '../services/mailer.js'

  
export const refreshToken = (req, res) => { 
  return res.json({})
} 

export const register =(req, res) => {
    const {firstName, lastName, email, password} = req.body;

    hashPassword(password, res, (hash)=> {
      const newUser = new User({firstName:firstName, lastName:lastName, email:email, password:hash})
      newUser.save().then(user => {
        req.session.userId = user._id
        req.session.save(err =>{
           if(!err) { 
            sendVerificationEmail(user)
           }
        });
      
     })
     .catch(err => {
         res.status(500).json({message:{message: "Invalid Email"}});
     })
    })

} 

  export const login = (req,res)=>{
    const {email, password} = req.body;
    if(email === "" || password === ""){
     return res.status(400).send({message:"Invalid Credentials"})
     
    }

    User.findByEmailAndComparePassword(email, password).then(({isValid, user}) =>{
      if (isValid) { 
        res.json({success:true})
      }
    })
    .catch(err => {
        return res.status(400).json({message:"Invalid Credentials"});
    })

  }

  export const verifyEmail = (req, res) => { 
   
  }

  export default { register, login, verifyEmail}
