
'use client';

import { useSearchParams } from 'next/navigation';
import Registration from './registration';
import Login from './login';

export default function AuthSwitcher({ initialMode }) {
  const searchParams = useSearchParams();
  const mode = searchParams.get('mode') || initialMode;

  return mode === 'login' ? <Login /> : <Registration />;
}
