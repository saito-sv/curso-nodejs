import { verifyAuthToken} from '../services/token.js'

export const parseBody = (req, res, next) => {
  let datos = ''
  req.on('data', pedazoDeDatos => {
    datos += pedazoDeDatos
  })
  req.on('end', () => {
    const jsonBody = JSON.parse(datos)
    req.body = jsonBody
    next()
  })

}

export const protectedMid = (req, res, next) => { 
  const {token} = req.headers
  if(!token) return res.status(401).send({status:"error", message:"Not authorized to perform this action"});
  const {error, decoded} = verifyAuthToken(token);
  if (error)return res.status(401).send({status:"error", message:"Not authorized to perform this action"});
  const {userId} = decoded;
  req.userId = userId
  next();
}