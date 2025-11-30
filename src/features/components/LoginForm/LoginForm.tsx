// src/features/auth/components/LoginForm/LoginForm.tsx
'use client';

import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Mail, Lock, Loader2 } from 'lucide-react';



import s from './LoginForm.module.css';
import { useMockAuth } from '../../hooks/useMockAuth';
import { AuthUser } from '../../auth/types';

export default function LoginForm() {
  const router = useRouter();
  const { login, loading } = useMockAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPwd, setShowPwd] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);

    const result = await login({ email, password });

    if (!result.ok) {
      setError(result.message);
      return;
    }

    redirectByRole(result.user);
  }

  function redirectByRole(user: AuthUser) {
    if (user.role === 'bocartaOwner') {
      router.push('/admin');
      return;
    }
    if (user.role === 'support') {
      router.push('/admin/soporte');
      return;
    }

    const base = '/app';

    if (user.role === 'staff') {
      router.push(`${base}/menu`);
      return;
    }

    // owner + viewer → home del negocio
    router.push(base);
  }

  return (
    <div className={s.card}>
      <h1 className={s.title}>Inicia sesión</h1>
      <p className={s.subtitle}>
        Entra a tu panel para editar tu carta, activar promos y ver cómo se mueve tu menú.
      </p>

      <form className={s.form} onSubmit={handleSubmit} noValidate>
        <div className={s.field}>
          <label htmlFor="email">Correo electrónico</label>
          <div className={s.inputWrapper}>
            <span className={s.icon}>
              <Mail size={16} aria-hidden />
            </span>
            <input
              id="email"
              type="email"
              autoComplete="email"
              placeholder="ej. owner@demo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>

        <div className={s.field}>
          <div className={s.fieldLabelRow}>
            <label htmlFor="password">Contraseña</label>
            <button
              type="button"
              className={s.togglePwd}
              onClick={() => setShowPwd((v) => !v)}
            >
              {showPwd ? 'Ocultar' : 'Mostrar'}
            </button>
          </div>
          <div className={s.inputWrapper}>
            <span className={s.icon}>
              <Lock size={16} aria-hidden />
            </span>
            <input
              id="password"
              type={showPwd ? 'text' : 'password'}
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>

        {error && <p className={s.error}>{error}</p>}

        <button type="submit" className={s.submit} disabled={loading}>
          {loading && <Loader2 className={s.spinner} size={16} aria-hidden />}
          {loading ? 'Entrando…' : 'Iniciar sesión'}
        </button>

        <div className={s.linksRow}>
          <button
            type="button"
            className={s.linkButton}
            onClick={() => router.push('/forgot-password')}
          >
            ¿Olvidaste tu contraseña?
          </button>
          <button
            type="button"
            className={s.linkButton}
            onClick={() => router.push('/register')}
          >
            Crear cuenta
          </button>
        </div>
      </form>

      <div className={s.hint}>
        <span>Usuarios demo:</span>
        <ul>
          <li>Owner negocio → <code>owner@demo.com</code></li>
          <li>Staff → <code>staff@demo.com</code></li>
          <li>Viewer → <code>viewer@demo.com</code></li>
          <li>Bocarta Owner → <code>admin@bocarta.com</code></li>
          <li>Soporte → <code>soporte@bocarta.com</code></li>
        </ul>
        <p>Contraseña para todos: <code>demo1234</code></p>
      </div>
    </div>
  );
}
