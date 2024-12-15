import express, { NextFunction, Request, Response } from 'express';

const router = express.Router();

// Add vacation
router.get(
  '/test',
  async (request: Request, response: Response, next: NextFunction) => {
    const jsonObj = { content: 'Hello' };
    response.send(jsonObj);
  }
);

export default router;
