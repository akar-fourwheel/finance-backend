import pool from "../../config/db.js";

const schemeController = async (req, res) => {

    const { Model, bank, tenure} = req.query;

    let query;
    let rows;
    try {

        if (!Model && !bank && !tenure ) {
            query = `SELECT DISTINCT Model FROM Data_Feed`;
            rows = await pool.query(query);
        }

        if (Model && !bank && !tenure ) {
            query = `select DISTINCT Bank FROM Data_Feed WHERE Model = ?`;
            rows = await pool.query(query, [Model]);
        }

        if (Model && bank && !tenure ) {
            query = `select DISTINCT Tenure FROM Data_Feed WHERE Model = ? AND Bank= ?`;
            rows = await pool.query(query, [Model, bank]);
        }

        if (Model && bank && tenure) {
            query = `select On-Road Price, Loan Amount, Cashback,Cashback Cap, Customer Cashback, Effective Price,ROI,EMI with ROI,Total Outgoing   FROM Data_Feed  WHERE Model = ? AND PPL = ? AND FUEL= ? AND Variant = ?`;
            rows = await pool.query(query, [Model, bank, tenure]);
        }
        const result = rows[0].map(row => Object.values(row));
        res.send(result)
    }
    catch (e) {
        console.log("data not found", e);
        res.send("data not found")
    }
}

export default schemeController;