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
  if (!req.session) { 
    return res.status(401).redirect('/');
  }

  if (req.session.userId !== "") { 
      next();
  }
  
}