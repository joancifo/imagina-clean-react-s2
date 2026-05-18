import { useEffect } from 'react';
import { getMe } from '../services/api';
import { useAppStore } from '../store/appStore';

// Dependencia oculta: el "usuario actual" depende de localStorage, del store y de la red.
export default function useCurrentUser() {
  const { user, setUser } = useAppStore();
  useEffect(() => {
    if (!localStorage.getItem('userId')) localStorage.setItem('userId', 'u2');
    getMe().then(setUser);
  }, []);
  return user;
}
