import bcrypt from "bcrypt"
import queryer  from '../storage/queryer.js'

export const User = { 
        userId:"",
        firstName:"",
        lastName:"",
        email:"",
        emailVerified:false,
        password:"",
        imageUrl:""
      }

User.isPasswordValid = async function(plainText) { 
        const isValid = await bcrypt.compare(textPassword, this.password)
        return isValid
}

User.values = () => { 
    return [this.firstName, this.lastName, this.email, this.password, this.emailVerified]
}

User.save = () => {
    queryer.exec('INSERT INTO user(firstname, lastname, email, password, email_verified) VALUES($1,$2,$3,$4,$5) RETURNING *',
     [...this.values]).then(res => {}).catch(err =>{})
}

User.hashPassword = (password, res, callback) => { 
    bcrypt.hash(password,10, (error, hash) => {
      if (error) {
        return res.status(500).send({error: "Something went wront"})
      }else { 
           callback(hash); 
      }
   
    });
  }

const findByEmailAndComparePassword = (email,textPassword) => {
    return new Promise((resolve, reject) => {
        this.findOne({ email: email })
            .then((user) => {
                bcrypt.compare(textPassword, user.password).then(isValid => {
                resolve({isValid:isValid, user: user});     
                }).catch(err => {
                    reject(err);
                })
            })
            .catch((err) => {
                reject(err)
            });
    });
};


