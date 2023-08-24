import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import scraperRouter from './src/routes/scraper';
import authRouter from './src/routes/auth';
import logger from 'morgan';
import { MongoClient, ServerApiVersion } from "mongodb"
import mongoose from 'mongoose';

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

const mongoDBURI = `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@cluster0.lugqjjz.mongodb.net/?retryWrites=true&w=majority`;
mongoose.connect(mongoDBURI);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', scraperRouter);
app.use('/auth', authRouter)

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});