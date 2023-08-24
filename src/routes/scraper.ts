import express, { Router } from 'express';

import scraperController from '../controllers/scraper';

let scraperRouter: Router = express.Router();

/* GET home page. */
scraperRouter.get('/', scraperController.scrapeAll);

export default scraperRouter