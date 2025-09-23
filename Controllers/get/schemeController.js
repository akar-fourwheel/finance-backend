import pool from "../../config/db.js";

const schemeController = async (req, res) => {

    const { model, bank, tenure} = req.query;

    let query;
    let rows;
    try {
        if (model && !bank && !tenure ) {
            query = `select DISTINCT bank FROM data_feed WHERE model = ?`;
            [rows] = await pool.query(query, [model]);
        }

        if (model && bank && !tenure ) {
            query = `select DISTINCT tenure FROM data_feed WHERE model = ? AND bank= ?`;
            [rows] = await pool.query(query, [model, bank]);
        }

        if (model && bank && tenure) {
            query = `select on_road_price, loan_amount, cashback,cashback_cap, customer_cashback, effective_price , roi , emi_with_roi ,total_outgoing FROM data_feed WHERE model = ? AND bank = ? AND tenure= ?`;
            [rows] = await pool.query(query, [model, bank, tenure]);
        }
        res.json(rows);
    }
    catch (e) {
        console.log("data not found", e);
        res.send("data not found")
    }
}

export default schemeController;