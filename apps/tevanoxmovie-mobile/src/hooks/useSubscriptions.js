import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getPlans as getPlansAPI,
  getStatus as getStatusAPI,
  activateSubscription as activateAPI,
} from '../api/subscriptions';
import {
  setPlans,
  setSubscription,
  setLoading,
  setError,
} from '../store/subscriptionSlice';

export const useSubscriptions = () => {
  const dispatch = useDispatch();
  const [loading, setLoadingState] = useState(false);
  const plans = useSelector((state) => state.subscription.plans);
  const subscription = useSelector((state) => state.subscription.subscription);

  const fetchPlans = async () => {
    try {
      setLoadingState(true);
      dispatch(setLoading(true));
      const response = await getPlansAPI();
      dispatch(setPlans(response.data));
    } catch (error) {
      dispatch(setError(error.message));
    } finally {
      setLoadingState(false);
      dispatch(setLoading(false));
    }
  };

  const fetchStatus = async () => {
    try {
      setLoadingState(true);
      dispatch(setLoading(true));
      const response = await getStatusAPI();
      dispatch(setSubscription(response.data));
    } catch (error) {
      dispatch(setError(error.message));
    } finally {
      setLoadingState(false);
      dispatch(setLoading(false));
    }
  };

  const activateSubscription = async (planId) => {
    try {
      setLoadingState(true);
      dispatch(setLoading(true));
      const response = await activateAPI({ plan_id: planId });
      await fetchStatus();
      return response.data;
    } catch (error) {
      dispatch(setError(error.message));
      return null;
    } finally {
      setLoadingState(false);
      dispatch(setLoading(false));
    }
  };

  return {
    plans,
    subscription,
    loading,
    fetchPlans,
    fetchStatus,
    activateSubscription,
  };
};