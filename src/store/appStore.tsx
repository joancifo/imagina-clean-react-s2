import { createContext, ReactNode, useContext, useState } from 'react';
import type { Filters, Order, User } from '../shared/types';

type Store = {
  orders: Order[];
  setOrders: (orders: Order[]) => void;
  filters: Filters;
  setFilters: (filters: Filters) => void;
  user: User | null;
  setUser: (user: User | null) => void;
  selectedOrderId: string | null;
  setSelectedOrderId: (id: string | null) => void;
  toast: string | null;
  setToast: (toast: string | null) => void;
};

const Ctx = createContext<Store | null>(null);

// Un único store para datos de servidor, filtros de una pantalla, sesión y avisos visuales.
export function AppStoreProvider({ children }: { children: ReactNode }) {
  const [orders, setOrders] = useState<Order[]>([]);
  const [filters, setFilters] = useState<Filters>({ text: '', status: 'all', onlyMine: false });
  const [user, setUser] = useState<User | null>(null);
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  return (
    <Ctx.Provider value={{ orders, setOrders, filters, setFilters, user, setUser, selectedOrderId, setSelectedOrderId, toast, setToast }}>
      {children}
    </Ctx.Provider>
  );
}

export function useAppStore() {
  const store = useContext(Ctx);
  if (!store) throw new Error('useAppStore fuera del provider');
  return store;
}
