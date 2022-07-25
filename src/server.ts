import express, { Application, Request, Response } from 'express';

const app: Application = express();

app.get('/', (_: Request, res: Response) => {
  res.send('Hello world');
});

app.listen('3000', () => {
  console.log('Server starting on port 3000');
});
