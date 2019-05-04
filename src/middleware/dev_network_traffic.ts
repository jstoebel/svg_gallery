import express from 'express'

const devNetworkTrafficMiddleware = (req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.log('simulating network traffic');
  setTimeout(next, 1000)
}

export default devNetworkTrafficMiddleware;