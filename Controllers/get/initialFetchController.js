import pool from "../../config/db.js";

const initialFetch = async (req, res) => {
    try {
        const query = `SELECT DISTINCT model FROM Data_Feed`;
        const [rows] = await pool.query(query);

        res.json(rows);

    }
    catch (e) {
        console.log(e);
        res.send("data not found");
    }
}

export default initialFetch;