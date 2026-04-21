const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
const port = 3000;

app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
app.use(express.static(__dirname));

app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*');
    next();
});
app.use(express.static(__dirname));

const pool = new Pool({
    user: 'postgres',
    password: '1703',  
    host: 'localhost',
    port: 5432,
    database: 'Song'
});

app.get('/api/songs', async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT s.*, a.title as album_title, a.release_year
            FROM songs s
            JOIN albums a ON s.album_id = a.id
            ORDER BY a.release_year, s.id
        `);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get('/api/albums', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM albums ORDER BY release_year');
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.listen(port, () => {
    console.log(`Сервер запущен: http://localhost:${port}`);
});