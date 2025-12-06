const express = require('express');
const router = express.Router();
const db = require('../db/database');

router.post('/', (req, res) => {
    const { product_id, name, email, phone, message } = req.body;
    
    if (!name || !email || !message) {
        return res.status(400).json({ "error": "Name, Email, and Message are required." });
    }

    const sql = 'INSERT INTO enquiries (product_id, name, email, phone, message) VALUES (?,?,?,?,?)';
    const params = [product_id, name, email, phone, message];
    
    db.run(sql, params, function (err) {
        if (err) {
            return res.status(400).json({ "error": err.message });
        }
        res.json({
            "message": "Enquiry submitted successfully",
            "id": this.lastID
        });
    });
});

router.get('/', (req, res) => {
    const sql = "SELECT * FROM enquiries ORDER BY created_at DESC";
    db.all(sql, [], (err, rows) => {
        if (err) {
            res.status(400).json({ "error": err.message });
            return;
        }
        res.json({
            "message": "success",
            "data": rows
        });
    });
});

module.exports = router;