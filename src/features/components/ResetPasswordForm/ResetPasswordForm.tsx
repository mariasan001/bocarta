// src/features/auth/components/ResetPasswordForm/ResetPasswordForm.tsx
'use client';

import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import { KeyRound, ArrowLeft, Loader2, CheckCircle2 } from 'lucide-react';

import { useMockPasswordReset } from '../../hooks/useMockPasswordReset';
import s from './ResetPasswordForm.module.css';

type Props = {
  initialToken?: string;
};

export default function ResetPasswordForm({ initialToken }: Props) {
  const router = useRouter();
  const { confirmReset, loading } = useMockPasswordReset();

  const [token, setToken] = useState(initialToken ?? '');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);
  const [serverMessage, setServerMessage] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setServerMessage(null);

    if (!token) {
      setError('Ingresa el código de recuperación.');
      return;
    }
    if (!password || password.length < 8) {
      setError('La nueva contraseña debe tener al menos 8 caracteres.');
      return;
    }
    if (password !== confirm) {
      setError('Las contraseñas no coinciden.');
      return;
    }

    const res = await confirmReset({ token, password });

    if (!res.ok) {
      setError(res.message);
      return;
    }

    setDone(true);
    setServerMessage(res.message);
  }

  if (done) {
    return (
      <div className={s.card}>
        <button
          type="button"
          className={s.backBtn}
          onClick={() => router.push('/login')}
        >
          <ArrowLeft size={14} />
          <span>Ir a iniciar sesión</span>
        </button>

        <div className={s.successState}>
          <CheckCircle2 size={40} className={s.successIcon} />
          <h1 className={s.title}>Contraseña actualizada</h1>
          <p className={s.subtitle}>
            {serverMessage ??
              'Tu contraseña ha sido actualizada. Ya puedes iniciar sesión con tus nuevos datos.'}
          </p>
          <button
            type="button"
            className={s.primaryBtn}
            onClick={() => router.push('/login')}
          >
            Iniciar sesión
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={s.card}>
      <button
        type="button"
        className={s.backBtn}
        onClick={() => router.push('/login')}
      >
        <ArrowLeft size={14} />
        <span>Cancelar y volver</span>
      </button>

      <h1 className={s.title}>Elige una nueva contraseña</h1>
      <p className={s.subtitle}>
        Usa el código de recuperación que te enviamos por correo y escribe tu nueva contraseña.
      </p>

      <form className={s.form} onSubmit={handleSubmit} noValidate>
        <div className={s.field}>
          <label htmlFor="token">Código de recuperación</label>
          <input
            id="token"
            type="text"
            placeholder="ej. 123456"
            value={token}
            onChange={(e) => setToken(e.target.value)}
          />
        </div>

        <div className={s.field}>
          <label htmlFor="pwd">Nueva contraseña</label>
          <div className={s.inputWrapper}>
            <span className={s.icon}>
              <KeyRound size={16} aria-hidden />
            </span>
            <input
              id="pwd"
              type="password"
              placeholder="Mínimo 8 caracteres"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>

        <div className={s.field}>
          <label htmlFor="pwd2">Confirmar contraseña</label>
          <input
            id="pwd2"
            type="password"
            placeholder="Vuelve a escribirla"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
          />
        </div>

        {error && <p className={s.error}>{error}</p>}

        <button type="submit" className={s.submit} disabled={loading}>
          {loading && <Loader2 className={s.spinner} size={16} aria-hidden />}
          {loading ? 'Guardando…' : 'Guardar nueva contraseña'}
        </button>
      </form>
    </div>
  );
}
