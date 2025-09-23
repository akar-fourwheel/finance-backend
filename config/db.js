import mysql from 'mysql2/promise';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const caCert = await fs.readFile(path.join(__dirname, '../certs/ca.pem'));


const pool = mysql.createPool({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        port: process.env.DB_PORT,
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0,
        multipleStatements: true,
        ssl: {
            ca: caCert
        }
    });


export const initDB = async () => {
    try {
        const schemaPath = path.join(__dirname, '../Schema.sql');
        const schema = await fs.readFile(schemaPath, 'utf8');
        const connection = await pool.getConnection();
        await connection.query(schema);
        connection.release();
        console.log('Schema executed successfully');
    } catch (err) {
        console.error('Error initializing database:', err);
    }
};


export default pool; 