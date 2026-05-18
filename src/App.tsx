import { NavLink, Route, Routes } from 'react-router-dom';
import OrdersPage from './pages/OrdersPage';
import OrderDetailPage from './pages/OrderDetailPage';
import DashboardPage from './pages/DashboardPage';
import useCurrentUser from './hooks/useCurrentUser';

export default function App() {
  const user = useCurrentUser();
  return (
    <div className="app">
      <header className="app__header">
        <strong>OrderDesk</strong>
        <nav>
          <NavLink to="/">Pedidos</NavLink> <NavLink to="/dashboard">Panel</NavLink>
        </nav>
        <span className="app__user">{user ? user.usr_nm : '...'}</span>
      </header>
      <Routes>
        <Route path="/" element={<OrdersPage />} />
        <Route path="/orders/:id" element={<OrderDetailPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
      </Routes>
    </div>
  );
}
