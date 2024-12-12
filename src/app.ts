import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import { globalErrorHandelar } from './app/middlewares/globalErrorHandelar';
import { NOtfound } from './app/middlewares/NotFound';
import router from './app/routes';
import { promise } from 'zod';

const app: Application = express();

//parsers
app.use(express.json());
app.use(cors());

// application routes
app.use('/api/v1', router);

const getAController = (req: Request, res: Response) => {
  const a = 10;
  res.send(a);
};

app.get('/', getAController);

app.use(globalErrorHandelar);
app.use(NOtfound);

export default app;
