import bcrypt from "bcrypt"
import queryer  from '../storage/queryer.js'

export default class User { 

  constructor(firstName, lastName, email, password) { 
    this.firstName = firstName
    this.lastName = lastName
    this.email = email
    this.password = password
  }

  hashPassword = textPlain => { 
    return bcrypt.hashSync(textPlain, 8)
  }

  values = () => { 
    return [this.firstName, this.lastName, this.email, this.hashPassword(this.password)]
  }

  save = async () => { 
    try { 
      const res = await queryer.exec('INSERT INTO monroy_user(first_name, last_name, email, password) VALUES($1, $2, $3,$4) RETURNING *', ...this.values())
       return User.hydrate(res.rows).pop()
    }catch(err) { 
      return err
    }
  }

  static hydrate = rows => { 
    return rows.map(r => {
      return {id:r.id, firstName:r.first_name, lastName:r.last_name, email:r.email, modified:r.modified, created:r.created, emailVerified:r.email_verified}
    })
  }
  
  static isPasswordValid = async (password, hash) => { 
    try { 
      const valid = await bcrypt.compare(password, hash)
      return valid
    } catch(err) { 
      return err 
    }
  }

  static deleteById = async id => { 
    
  }

  static findByEmailAndComparePassword = async (email, password) => { 
    try { 
      const res = await queryer.exec('SELECT * FROM monroy_user WHERE email = $1', email)
      if(res.rowCount === 0) return {valid: false, found:false, user:null};
       const valid = this.isPasswordValid(password, res.rows[0].password)
       return {valid:valid, found:true, user:this.hydrate(res.rows).pop()}
    } catch (err) { 
      return err
    }
  }
}