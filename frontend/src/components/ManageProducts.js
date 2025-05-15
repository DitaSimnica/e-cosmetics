import React, { useState, useEffect } from 'react';
import api from '../utils/api';
import './ManageProducts.css';

const ManageProducts = () => {
  const [products, setProducts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [newProduct, setNewProduct] = useState({ name: '', price: '' });

  const fetchProducts = async () => {
    const token = localStorage.getItem('authToken');
    try {
      const response = await api.get('/product', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProducts(response.data);
    } catch (error) {
      console.error('Error loading products:', error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    const token = localStorage.getItem('authToken');
    try {
      await api.delete(`/product/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchProducts();
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const handleAddProduct = async () => {
    const token = localStorage.getItem('authToken');
    try {
      await api.post('/product', newProduct, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setShowForm(false);
      setNewProduct({ name: '', price: '' });
      fetchProducts();
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  return (
    <div className="product-page-cute p-4">
      <h2 className="mb-4">🎀 Manage Products</h2>
      <button className="btn btn-pink mb-3" onClick={() => setShowForm(!showForm)}>
        {showForm ? 'Cancel' : '➕ Add New Product'}
      </button>

      {showForm && (
        <div className="card p-3 mb-4">
          <input
            className="form-control mb-2"
            type="text"
            placeholder="Product Name"
            value={newProduct.name}
            onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
          />
          <input
            className="form-control mb-2"
            type="number"
            placeholder="Price"
            value={newProduct.price}
            onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
          />
          <button className="btn btn-success" onClick={handleAddProduct}>Save Product</button>
        </div>
      )}

      <ul className="list-group cute-list">
        {products.map((product) => (
          <li className="list-group-item d-flex justify-content-between align-items-center" key={product.id}>
            <span>{product.name} - ${product.price}</span>
            <div>
              <button className="btn btn-warning btn-sm me-2">Edit</button>
              <button className="btn btn-danger btn-sm" onClick={() => handleDelete(product.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ManageProducts;
