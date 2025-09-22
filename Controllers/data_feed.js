import pool from '../config/db.js'
import mysql from 'mysql2';

class data_feed {

    async uploadToSQL(rows) {
        // Delete all existing data before inserting new data
        await pool.query('DELETE FROM data_feed');

        try {

            const filteredRows = rows.filter(row => row[2] !== 0);

            if(filteredRows.length===0){
                return "Check google sheet";
            }
            const valuesString = filteredRows
                .map(row => `(${row.map(value => mysql.escape(value != null ? value : null)).join(', ')})`)
                .join(', ');
            const columns = [
                "model",
                "bank",
                "tenure",
                "on_road_price",
                "loan_amount",
                "cashback",
                "cashback_cap",
                "customer_cashback",
                "effective_price",
                "roi",
                "emi_with_roi",
                "total_outgoing"
            ];

            const query = `INSERT INTO data_feed (${columns.join(", ")}) VALUES ${valuesString}`;
            await pool.query(query);

            return 'data_feed table updated successfully.'
        } catch (err) {
            console.error('SQL insert error:', err);
            throw err;
        }
    }
}

export default new data_feed();
