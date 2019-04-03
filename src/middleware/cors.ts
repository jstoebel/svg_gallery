import express from 'express'

const {uri, port} = process.env

const enableCORSMiddleware = (req: express.Request, res: express.Response, next: express.NextFunction) => {
  // You could use * instead of the url below to allow any origin, 
  // but be careful, you're opening yourself up to all sorts of things!
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  next()
}

export default enableCORSMiddleware;