import data_feed from '../Controllers/data_feed.js';
import googleSecurityHeader from '../services/googleSecurityHeader.js';

const SHEET_CSV_ID = process.env.DATA_FEED;

const updateschemeController = async (req, response, bulk) => {

    const token = await googleSecurityHeader();
    const csvExportUrl = `https://docs.google.com/spreadsheets/d/${SHEET_CSV_ID}/gviz/tq?sheet=Data_Feed&export?format=csv&access_token=${token}`;

    try {
        const res = await fetch(csvExportUrl);
        const text = await res.text();

        const jsonText = text.replace(/^.*?\(/, "").slice(0, -2).replace(/\/\*.*?\*\//g, "").replace(/google.visualization.Query.setResponse\(/, "");
        const data = JSON.parse(jsonText);
        const rows = data.table.rows.map(row => row.c.map(cell => (cell ? cell.v : null)));

        const result = await data_feed.uploadToSQL(rows);

        if (bulk === false) {
            response.send(result);
        }

    } catch (error) {
        console.error('Controller error:', error);
        throw error;
    }
};

export default updateschemeController;
