const express = require('express');
const router = express.Router();
const db = require('../db/database');

// GET /api/products
router.get('/', (req, res) => {
    const { search, category, page = 1, limit = 5 } = req.query;
    const offset = (page - 1) * limit;

    let sql = "SELECT * FROM products WHERE 1=1";
    let params = [];

    if (search) {
        sql += " AND name LIKE ?";
        params.push(`%${search}%`);
    }
    if (category) {
        sql += " AND category = ?";
        params.push(category);
    }

    // Pagination
    sql += " LIMIT ? OFFSET ?";
    params.push(limit, offset);

    db.all(sql, params, (err, rows) => {
        if (err) {
            res.status(400).json({ "error": err.message });
            return;
        }
        res.json({
            "message": "success",
            "data": rows,
            "page": parseInt(page),
            "limit": parseInt(limit)
        });
    });
});

// GET /api/products/:id
router.get('/:id', (req, res) => {
    const sql = "SELECT * FROM products WHERE id = ?";
    db.get(sql, [req.params.id], (err, row) => {
        if (err) {
            res.status(400).json({ "error": err.message });
            return;
        }
        res.json({
            "message": "success",
            "data": row
        });
    });
});

module.exports = router;