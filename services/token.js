
import crypto from 'crypto';

const tokenSecret = "q6hE6NIiy5hUhg3pGcw"
const delimiter = "||"

const maxAgeMinutes = 120

export const newToken = (key) => {
    const hash = crypto.createHmac("sha256",tokenSecret);
    const timestamp = Date.now().toString();
    const toHmac = key + timestamp;
    const sha = hash.update(toHmac).digest('hex')
    const toEncode = sha + delimiter + key + delimiter + timestamp
  
    return Buffer.from(toEncode).toString('base64');
}

export const verify = (token) => {
    const decoded = Buffer.from(token, 'base64').toString()
    const [hash, key, timestamp] = decoded.split(delimiter);
    
    if ((Date.now() - timestamp)/1000/60 > maxAgeMinutes) { 
        return {valid:false, key:null}
    }
    
    const toCompare = crypto.createHmac('sha256',tokenSecret).update(key+timestamp).digest('hex');
    const valid = toCompare === hash
    return{valid,key}
}
