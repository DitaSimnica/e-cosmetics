// src/pages/MyOrdersPage.js
import React, { useEffect, useState } from 'react';
import api from '../utils/api';
import './MyOrdersPage.css';

const MyOrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await api.get('/order/my-orders');
        setOrders(response.data);
      } catch (error) {
        console.error('Failed to fetch orders:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="orders-page">
      <h2 className="orders-title">📦 Your Orders</h2>
      {loading ? (
        <p className="loading-text">Loading your adorable orders... 💌</p>
      ) : orders.length === 0 ? (
        <p className="empty-text">You haven’t placed any orders yet. Let’s fix that! 🛍️</p>
      ) : (
        <ul className="order-list">
          {orders.map((order) => (
            <li key={order.id} className="order-card">
              <h3 className="order-id"># {order.id}</h3>
              <p><strong>Status:</strong> {order.status}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MyOrdersPage;
