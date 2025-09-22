import express from 'express'

import initialFetch from '../Controllers/data/initialFetchController.js'
import dataController from '../Controllers/data/schemeController.js';

const dataSheetRoute = express.Router();

dataSheetRoute.get('/data', initialFetch);
dataSheetRoute.get('/fetch-scheme', dataController);

export default dataSheetRoute;
