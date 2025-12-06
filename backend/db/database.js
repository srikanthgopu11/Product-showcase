const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const DBSOURCE = path.resolve(__dirname, 'products.db');

const db = new sqlite3.Database(DBSOURCE, (err) => {
    if (err) {
        console.error(err.message);
        throw err;
    } else {
        console.log('Connected to the SQLite database.');

        db.serialize(() => {
            db.run("DROP TABLE IF EXISTS enquiries");
            db.run("DROP TABLE IF EXISTS products", (err) => {
                if (err) console.error("Error dropping table:", err);
                else console.log("Old tables dropped. Re-creating...");
                createTablesAndSeed();
            });
        });
    }
});

function createTablesAndSeed() {
    db.run(`CREATE TABLE products (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        category TEXT,
        short_desc TEXT,
        long_desc TEXT,
        price REAL,
        image_url TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`, (err) => {
        if (err) {
            console.error("Error creating products table:", err);
        } else {
            console.log('Seeding products with PEXELS images for Kitchen...');
            const insert = 'INSERT INTO products (name, category, short_desc, long_desc, price, image_url) VALUES (?,?,?,?,?,?)';

            const products = [
                // Electronics
                ["Laptop Pro", "Electronics", "High performance laptop", "Powerful laptop for devs and gamers.", 1200.00, "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500&q=80"],
                ["Smartphone X", "Electronics", "Latest model smartphone", "Features a stunning OLED display and 5G.", 899.00, "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500&q=80"],
                ["Wireless Headphones", "Electronics", "Noise cancelling", "Top tier noise cancelling with 20h battery.", 250.00, "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80"],
                ["Smart Watch", "Electronics", "Track your health", "Monitor heart rate, steps, and sleep.", 199.00, "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80"],
                ["4K Monitor", "Electronics", "Ultra HD Display", "27-inch 4K monitor perfect for design work.", 350.00, "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=500&q=80"],
                ["Mechanical Keyboard", "Electronics", "Tactile switches", "RGB backlit mechanical keyboard.", 120.00, "https://images.unsplash.com/photo-1595225476474-87563907a212?w=500&q=80"],
                ["Gaming Mouse", "Electronics", "Precision sensor", "High DPI mouse for gaming.", 60.00, "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500&q=80"],
                ["Tablet Air", "Electronics", "Lightweight tablet", "Perfect for reading and browsing on the go.", 450.00, "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=500&q=80"],
                
                // Furniture
                ["Ergonomic Chair", "Furniture", "Comfortable office chair", "Protect your back with lumbar support.", 350.00, "https://images.unsplash.com/photo-1592078615290-033ee584e267?w=500&q=80"],
                ["Standing Desk", "Furniture", "Adjustable height", "Electric standing desk for better health.", 500.00, "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=500&q=80"],
                ["Modern Sofa", "Furniture", "3-seater sofa", "Grey fabric sofa, minimal design.", 800.00, "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=500&q=80"],
                ["Wooden Bookshelf", "Furniture", "Oak wood finish", "5-tier bookshelf for your library.", 150.00, "https://images.unsplash.com/photo-1594620302200-9a762244a156?w=500&q=80"],
                ["Bed Frame", "Furniture", "Queen size", "Sturdy metal bed frame.", 200.00, "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?w=500&q=80"],
                ["Coffee Maker", "Kitchen", "Brews excellent coffee", "Programmable coffee maker with timer.", 80.00, "https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=500&q=80"],
                ["Power Blender", "Kitchen", "High speed blender", "Perfect for smoothies and fresh juice.", 90.00, "https://images.pexels.com/photos/2097090/pexels-photo-2097090.jpeg?auto=compress&cs=tinysrgb&w=600"],
                ["Rapid Kettle", "Kitchen", "Quick boil technology", "Stainless steel electric kettle, 1.5L capacity.", 40.00, "https://images.pexels.com/photos/5946650/pexels-photo-5946650.jpeg?auto=compress&cs=tinysrgb&w=600"],
                
                ["Stand Mixer", "Kitchen", "Professional mixer", "Perfect for baking cakes and bread.", 250.00, "https://images.unsplash.com/photo-1594385208974-2e75f8d7bb48?w=500&q=80"],
                
                // Footwear
                ["Running Shoes", "Footwear", "Lightweight sneakers", "Perfect for marathons and daily jogging.", 120.00, "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&q=80"],
                ["Hiking Boots", "Footwear", "Waterproof", "Durable boots for rough terrain.", 140.00, "https://images.unsplash.com/photo-1520639888713-7851133b1ed0?w=500&q=80"],
                ["Classic Loafers", "Footwear", "Leather formal shoes", "Elegant shoes for office wear.", 95.00, "https://images.unsplash.com/photo-1614252369475-531eba835eb1?w=500&q=80"],
                ["Sport Sandals", "Footwear", "Breathable design", "Great for summer walking.", 50.00, "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=500&q=80"]
            ];

            products.forEach((prod) => {
                db.run(insert, prod);
            });
        }
    });

    db.run(`CREATE TABLE enquiries (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        product_id INTEGER,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        phone TEXT,
        message TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (product_id) REFERENCES products(id)
    )`);
}

module.exports = db;