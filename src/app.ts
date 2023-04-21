import 'dotenv/config';
import express, { Application, json } from 'express';
import cors from 'cors';
import helmet from 'helmet';

// importaciones propias
import router from './routes';
import dbConnection from './database/connection';
import { notFoundHandler } from './middlewares/not-found.middleware';

const PORT: number = parseInt(process.env.PORT as string, 10) || 3000;
const app: Application = express();

app.use(helmet());
app.use(cors());
app.use(json());

app.use('/public', express.static(__dirname + '/public'));

app.use(router);
app.use(notFoundHandler);

app.listen(PORT, () => {
  console.log(`
  ####################################
  servidor corriendo en puerto ${PORT}
  ####################################
  `);
});

dbConnection();
