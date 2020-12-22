import {User} from '../models/user.js'

export const renderRegister = (req, res) => {
    res.render("registration.ejs", { path: "Registration" });
  }

  export const renderLogin = (req, res) => {
    res.render("registration.ejs", { path: "Registration" });
  }
  
  export const register =(req, res) => {
    const {fullname, email, password} = req.body;
    const [firstName, lastName]  = fullname.split(' ')
    const newUser = new User({firstName, lastName, email, password})
    newUser.save().then((user) => {
       res.direct('/');
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({message:{message: "Invalid Email"}});
    })
  }
  
  export const login = (req,res)=>{}

  export default { renderRegister, renderLogin, register, login }