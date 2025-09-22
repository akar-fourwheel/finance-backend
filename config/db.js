import mysql from 'mysql2/promise';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const createPool = () => {
    return mysql.createPool({
        host: process.env.DB_HOST || 'localhost',
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD || 'root',
        database: process.env.DB_NAME || 'akar_db',
        port: process.env.DB_PORT || 3306,
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0,
        multipleStatements: true
    });
};

export const initDB = async () => {
    try {
        const schemaPath = path.join(__dirname, '../models/Schema.sql');
        const schema = await fs.readFile(schemaPath, 'utf8');
        const connection = await pool.getConnection();
        await connection.query(schema);
        connection.release();
        console.log('Schema executed successfully');
    } catch (err) {
        console.error('Error initializing database:', err);
    }
};

const pool = createPool();

export default pool; 