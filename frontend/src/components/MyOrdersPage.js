import React, { useEffect, useState } from 'react';
import api from '../utils/api';
import './MyOrdersPage.css';

const statusColors = {
  Pending: '#fbbf24',    // yellow
  Processing: '#3b82f6', // blue
  Delivered: '#10b981',  // green
  Cancelled: '#ef4444',  // red
};

const MyOrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

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

  // Filtering by order ID search
  const filteredOrders = orders.filter(order =>
    order.id.toString().includes(searchTerm.trim())
  );

  // Summary stats
  const deliveredCount = orders.filter(o => o.status === 'Delivered').length;
  const pendingCount = orders.filter(o => o.status === 'Pending').length;

  return (
    <div className="orders-page">
      <h2 className="orders-title">📦 Your Orders</h2>

      {/* Summary Panel */}
      <div className="orders-summary">
        <div><strong>Total Orders:</strong> {orders.length}</div>
        <div><strong>Delivered:</strong> {deliveredCount}</div>
        <div><strong>Pending:</strong> {pendingCount}</div>
      </div>

      {/* Search only */}
      <div className="orders-controls">
        <input
          type="text"
          placeholder="Search by Order ID..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="order-search"
        />
      </div>

      {/* Loading, Empty, Orders List */}
      {loading ? (
        <div className="loading-container">
          <p className="loading-text">Loading your adorable orders... 💌</p>
        </div>
      ) : filteredOrders.length === 0 ? (
        <div className="empty-container">
          <p className="empty-text">You haven’t placed any orders yet. Let’s fix that! 🛍️</p>
        </div>
      ) : (
        <ul className="order-list">
          {filteredOrders.map((order) => (
            <li key={order.id} className="order-card">
              <h3 className="order-id"># {order.id}</h3>
              <span
                className="order-status"
                style={{ backgroundColor: statusColors[order.status] || '#ccc' }}
              >
                {order.status}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MyOrdersPage;
