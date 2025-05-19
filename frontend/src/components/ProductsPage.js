import React, { useEffect, useState } from 'react';
import api from '../utils/api';
import './ProductsPage.css';

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = localStorage.getItem('authToken');
        const response = await api.get('/product', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setProducts(response.data);
        setFilteredProducts(response.data);

        // Extract unique categories (for now we can base it on product name or add a 'category' field later)
        const allCategories = [...new Set(response.data.map(p => p.category || 'All'))];
        setCategories(['All', ...allCategories]);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    let filtered = products;

    if (searchTerm) {
      filtered = filtered.filter(p =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategory && selectedCategory !== 'All') {
      filtered = filtered.filter(p => p.category === selectedCategory);
    }

    setFilteredProducts(filtered);
  }, [searchTerm, selectedCategory, products]);

  return (
    <div className="products-page">
      <h2 className="products-title">🛍️ Browse Our Cute Collection</h2>

      <div className="filters">
        <input
          type="text"
          placeholder="Search for products..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className="search-bar"
        />

        <select
          className="category-select"
          value={selectedCategory}
          onChange={e => setSelectedCategory(e.target.value)}
        >
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      {filteredProducts.length === 0 ? (
        <p className="no-products">No products found 🥺</p>
      ) : (
        <div className="product-grid">
          {filteredProducts.map(product => (
            <div className="product-card" key={product.id}>
              <img src={product.imageUrl} alt={product.name} className="product-img" />
              <h3 className="product-name">{product.name}</h3>
              <p className="product-desc">{product.description}</p>
              <p className="product-price">${product.price.toFixed(2)}</p>
              <button className="add-to-cart-btn">Add to Cart 💖</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductsPage;
