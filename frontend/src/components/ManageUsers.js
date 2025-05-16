import React, { useEffect, useState } from 'react';
import api from '../utils/api';
import { useNavigate } from 'react-router-dom';
import './ManageUsers.css';

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem('authToken');
        const response = await api.get('/user', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
        if (error.response?.status === 401 || error.response?.status === 403) {
          navigate('/login');
        }
      }
    };

    fetchUsers();
  }, [navigate]);

  const handleEdit = (userId) => {
    alert(`Edit user with ID: ${userId}`);
    // Future: navigate to edit user page or open modal
  };

  const handleDelete = async (userId) => {
    const confirm = window.confirm("Are you sure you want to delete this user?");
    if (!confirm) return;

    try {
      const token = localStorage.getItem('authToken');
      await api.delete(`/user/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Remove deleted user from UI
      setUsers((prev) => prev.filter((user) => user.id !== userId));
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return (
    <div className="page-wrapper">
      <h2 className="page-title">👩‍💼 Manage Users</h2>
      {users.length === 0 ? (
        <p className="text-center text-muted">No users found 💔</p>
      ) : (
        <div className="table-cute-wrapper">
          <table className="table-cute">
            <thead>
              <tr>
                <th>ID</th>
                <th>Username</th>
                <th>Email</th>
                <th>Role</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>
                    <span className="badge-cute">
                      {user.role === 'Admin' ? '💼 Admin' : '👤 Customer'}
                    </span>
                  </td>
                  <td className="text-center">
                    <button className="btn-edit" onClick={() => handleEdit(user.id)}>Edit</button>
                    <button className="btn-delete" onClick={() => handleDelete(user.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ManageUsers;
