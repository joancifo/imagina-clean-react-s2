import { useEffect, useState } from 'react';
import { getOrders } from '../services/api';
import { useAppStore } from '../store/appStore';
import { mapOrderForTable } from '../shared/mappers';
import { trackEvent } from '../shared/utils';

// Mezcla red, transformación, store global, analytics y lectura de la URL.
export default function useOrders() {
  const { orders, setOrders } = useAppStore();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const debug = window.location.search.includes('debug');
    getOrders()
      .then((data) => {
        setOrders(data.map(mapOrderForTable));
        if (debug) console.table(data);
        trackEvent('orders_loaded', {});
      })
      .finally(() => setLoading(false));
  }, []);
  return { orders, setOrders, loading };
}
