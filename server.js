import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import 'dotenv/config'
import dataSheetRoute from "./routes/dataSheet.js";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.get('/', (req, res) => {
    res.json({
        message: 'Finance app Server',
        version: '2.0.0'
    });
});

app.use('/', dataSheetRoute);

app.listen(PORT, () => console.log(`Backend running on http://localhost:${PORT}`));
