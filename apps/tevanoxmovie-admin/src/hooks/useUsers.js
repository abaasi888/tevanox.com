import { useState } from 'react';
import { getUsers, getUser, createUser, updateUser, deleteUser, toggleUserStatus } from '../api/users';

export const useUsers = () => {
  const [users, setUsers] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  const fetchUsers = async (params = {}) => {
    setLoading(true);
    try {
      const response = await getUsers(params);
      setUsers(response.data.data || []);
      setTotal(response.data.total || 0);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchUser = async (id) => {
    setLoading(true);
    try {
      const response = await getUser(id);
      return response.data;
    } catch (error) {
      console.error('Error fetching user:', error);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const createUser = async (data) => {
    const response = await createUser(data);
    return response.data;
  };

  const updateUser = async (id, data) => {
    const response = await updateUser(id, data);
    return response.data;
  };

  const deleteUser = async (id) => {
    await deleteUser(id);
  };

  const toggleStatus = async (id) => {
    const response = await toggleUserStatus(id);
    return response.data;
  };

  return {
    users,
    total,
    loading,
    fetchUsers,
    fetchUser,
    createUser,
    updateUser,
    deleteUser,
    toggleStatus,
  };
};