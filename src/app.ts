/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
import express from 'express';
import * as dotenv from 'dotenv';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import router from './routes/index';

const app = express();

dotenv.config();

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/api/v1', router);

app.listen(3000, () => console.log(''));
