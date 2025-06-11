// src/pages/ManageOrdersPage.js
import React, { useEffect, useState } from 'react';
import api from '../utils/api';
import './ManageOrdersPage.css';

const ManageOrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');
  const [updatingOrderId, setUpdatingOrderId] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem('authToken');
        const response = await api.get('/order/all', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setOrders(response.data);
      } catch (error) {
        setErrorMsg('Failed to fetch orders.');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handleStatusChange = async (orderId, newStatus) => {
    setUpdatingOrderId(orderId);
    try {
      const token = localStorage.getItem('authToken');
      // Assuming you have a PATCH endpoint to update order status
      await api.patch(`/order/${orderId}`, 
        { status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // Update state locally
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.id === orderId ? { ...order, status: newStatus } : order
        )
      );
    } catch (error) {
      alert('Failed to update status.');
      console.error(error);
    } finally {
      setUpdatingOrderId(null);
    }
  };

  if (loading) return <p>Loading orders...</p>;
  if (errorMsg) return <p>{errorMsg}</p>;

  return (
    <div className="manage-orders-page">
      <h2>Manage Orders</h2>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>User ID</th>
              <th>Status</th>
              <th>Change Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(({ id, userId, status }) => (
              <tr key={id}>
                <td>{id}</td>
                <td>{userId}</td>
                <td>{status}</td>
                <td>
                  <select
                    disabled={updatingOrderId === id}
                    value={status}
                    onChange={(e) => handleStatusChange(id, e.target.value)}
                    aria-label={`Change status for order ${id}`}
                  >
                    <option value="Pending">Pending</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ManageOrdersPage;
