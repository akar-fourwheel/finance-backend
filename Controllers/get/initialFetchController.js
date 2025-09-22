import pool from "../../config/db.js";

const initialFetch = async (req, res) => {
    try {
        const query = `SELECT DISTINCT Model FROM Data_Feed`;
        const rows = await pool.query(query);
        const result = rows[0].map(row => Object.values(row));

        console.log("inital fetch",result);
        res.send(result);

    }
    catch (e) {
        console.log(e);
        res.send("data not found");
    }
}

export default initialFetch;