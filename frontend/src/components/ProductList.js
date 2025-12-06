import React, { useState, useEffect } from 'react';
import { fetchProducts } from '../api';
import EnquiryForm from './EnquiryForm';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState('');
    const [category, setCategory] = useState('');
    const [page, setPage] = useState(1);
    const [selectedProduct, setSelectedProduct] = useState(null);

    const loadProducts = async () => {
        try {
            const res = await fetchProducts(page, search, category);
            setProducts(res.data.data);
        } catch (err) {
            console.error("Error loading products", err);
        }
    };

    useEffect(() => {
        loadProducts();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page, category]); 

    const handleSearch = (e) => {
        e.preventDefault();
        setPage(1); 
        loadProducts();
    };

    return (
        <div className="container">
            <h1>Product Showcase</h1>
            
            <div className="filters">
                <form onSubmit={handleSearch}>
                    <input 
                        type="text" 
                        placeholder="Search products..." 
                        value={search} 
                        onChange={(e) => setSearch(e.target.value)} 
                    />
                    <button type="submit">Search</button>
                </form>
                
                <select onChange={(e) => { setCategory(e.target.value); setPage(1); }}>
                    <option value="">All Categories</option>
                    <option value="Electronics">Electronics</option>
                    <option value="Furniture">Furniture</option>
                    <option value="Footwear">Footwear</option>
                    <option value="Kitchen">Kitchen</option>
                </select>
            </div>

            <div className="product-grid">
                {products.length > 0 ? products.map(p => (
                    <div key={p.id} className="product-card">
                        <img 
                            src={p.image_url} 
                            alt={p.name} 
                            onError={(e) => { 
                                e.target.onerror = null; 
                                e.target.src = "https://placehold.co/600x400?text=Image+Not+Available"; 
                            }}
                        />
                        <h3>{p.name}</h3>
                        <p className="price">${p.price}</p>
                        <p>{p.short_desc}</p>
                        <button onClick={() => setSelectedProduct(p)}>View Details / Enquire</button>
                    </div>
                )) : <p>No products found.</p>}
            </div>

            <div className="pagination">
                <button disabled={page === 1} onClick={() => setPage(page - 1)}>Prev</button>
                <span>Page {page}</span>
                <button onClick={() => setPage(page + 1)}>Next</button>
            </div>

            {selectedProduct && (
                <div className="modal-overlay">
                    <div className="modal-content product-details-modal">
                        <h2>{selectedProduct.name}</h2>
                        <p>{selectedProduct.long_desc}</p>
                        <p><strong>Category:</strong> {selectedProduct.category}</p>
                        <p className="price">${selectedProduct.price}</p>
                        <div className="modal-actions">
                            <button onClick={() => setSelectedProduct(null)}>Close</button>
                        </div>
                        <hr />
                        <h4>Interested? Send us a message:</h4>
                        <EnquiryForm productId={selectedProduct.id} onClose={() => setSelectedProduct(null)} />
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductList;