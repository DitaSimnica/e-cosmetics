import React, { useEffect, useState } from 'react';
import api from '../utils/api';
import './ProductsPage.css'; // CSS for styling

const ProductsPage = () => {
  const [products, setProducts] = useState([]);

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
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  if (products.length === 0) return <p className="no-products">No products available 🥺</p>;

  return (
    <div className="products-page">
      <h2 className="products-title">🛍️ Browse Our Cute Collection</h2>
      <div className="product-grid">
        {products.map(product => (
          <div className="product-card" key={product.id}>
            <img src={product.imageUrl} alt={product.name} className="product-img" />
            <h3 className="product-name">{product.name}</h3>
            <p className="product-desc">{product.description}</p>
            <p className="product-price">${product.price.toFixed(2)}</p>
            <button className="add-to-cart-btn">Add to Cart 💖</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductsPage;
