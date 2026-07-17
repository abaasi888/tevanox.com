import { useState } from 'react';
import {
  getAgents,
  getAgent,
  createAgent,
  updateAgent,
  deleteAgent,
  toggleAgentStatus,
  getAgentTree,
  getAgentTiers,
  processAgentPayout,
} from '../api/agents';

export const useAgents = () => {
  const [agents, setAgents] = useState([]);
  const [tiers, setTiers] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  const fetchAgents = async (params = {}) => {
    setLoading(true);
    try {
      const response = await getAgents(params);
      setAgents(response.data.data || []);
      setTotal(response.data.total || 0);
    } catch (error) {
      console.error('Error fetching agents:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchAgent = async (id) => {
    setLoading(true);
    try {
      const response = await getAgent(id);
      return response.data;
    } catch (error) {
      console.error('Error fetching agent:', error);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const fetchTiers = async () => {
    try {
      const response = await getAgentTiers();
      setTiers(response.data || []);
    } catch (error) {
      console.error('Error fetching tiers:', error);
    }
  };

  const getAgentTree = async () => {
    try {
      const response = await getAgentTree();
      return response.data;
    } catch (error) {
      console.error('Error fetching agent tree:', error);
      return null;
    }
  };

  const createAgent = async (data) => {
    const response = await createAgent(data);
    return response.data;
  };

  const updateAgent = async (id, data) => {
    const response = await updateAgent(id, data);
    return response.data;
  };

  const deleteAgent = async (id) => {
    await deleteAgent(id);
  };

  const toggleStatus = async (id) => {
    const response = await toggleAgentStatus(id);
    return response.data;
  };

  const processPayout = async (id, data) => {
    const response = await processAgentPayout(id, data);
    return response.data;
  };

  return {
    agents,
    tiers,
    total,
    loading,
    fetchAgents,
    fetchAgent,
    fetchTiers,
    getAgentTree,
    createAgent,
    updateAgent,
    deleteAgent,
    toggleStatus,
    processPayout,
  };
};