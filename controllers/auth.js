import {User} from '../models/user.js'
import bcrypt from 'bcrypt'
import {sendVerificationEmail} from '../services/mailer.js'


export const renderRegister = (req, res) => {
    res.render("registration.ejs", { path: "Registration" });
  }

  export const renderLogin = (req, res) => {
    res.setHeader('Set-Cookie',"loggedIn=true;");
    res.render("login.ejs", { path: "Login" });
  }
  
  const hashPassword = (password, res, callback) => { 
      bcrypt.hash(password,10, (error, hash) => {
        if (error) {
          console.log(err); 
          return res.status(500).send({error: "Something went wront"})
        }else { 
            console.log(hash)
             callback(hash); 
        }
     
      });
  }
  
export const register =(req, res) => {
    const {fullname, email, password} = req.body;
    const [firstName, lastName]  = fullname.split(' ')
    hashPassword(password, res, (hash)=> {
      const newUser = new User({firstName:firstName, lastName:lastName, email:email, password:hash})
      newUser.save().then(user => {
        req.session.userId = user._id
        req.session.save(err =>{
           if(!err) { 
            sendVerificationEmail(user)
            return res.redirect('/');
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
        res.redirect('/')
      }
    })
    .catch(err => {
        return res.status(400).json({message:"Invalid Credentials"});
    })

  }

  export default { renderRegister, renderLogin, register, login }
