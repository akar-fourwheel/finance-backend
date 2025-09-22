import express from 'express'

import initialFetch from '../Controllers/get/initialFetchController.js'
import dataController from '../Controllers/get/schemeController.js';
import updateschemeController from '../Controllers/updateschemeController.js'

const dataSheetRoute = express.Router();

dataSheetRoute.get('/data', initialFetch);
dataSheetRoute.get('/fetch-scheme', dataController);
dataSheetRoute.get('/update-db',(req,res)=>{
    updateschemeController(req,res,false);
});

export default dataSheetRoute;
