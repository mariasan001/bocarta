// src/features/auth/components/ForgotPasswordForm/ForgotPasswordForm.tsx
'use client';

import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Mail, ArrowLeft, ArrowRight, Loader2 } from 'lucide-react';

import { useMockPasswordReset } from '../../hooks/useMockPasswordReset';
import s from './ForgotPasswordForm.module.css';

export default function ForgotPasswordForm() {
  const router = useRouter();
  const { requestReset, loading } = useMockPasswordReset();

  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [serverMessage, setServerMessage] = useState<string | null>(null);
  const [demoToken, setDemoToken] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setServerMessage(null);
    setDemoToken(null);

    if (!email) {
      setError('Ingresa el correo con el que te registraste.');
      return;
    }

    const res = await requestReset({ email });

    if (!res.ok) {
      setError(res.message);
      return;
    }

    setSubmitted(true);
    setServerMessage(res.message ?? null);
    if ('token' in res && res.token) {
      setDemoToken(res.token);
    }
  }

  return (
    <div className={s.card}>
      <button
        type="button"
        className={s.backBtn}
        onClick={() => router.push('/login')}
      >
        <ArrowLeft size={14} />
        <span>Volver a iniciar sesión</span>
      </button>

      <h1 className={s.title}>¿Olvidaste tu contraseña?</h1>
      <p className={s.subtitle}>
        Te enviaremos un enlace al correo para que puedas elegir una nueva contraseña.
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
              disabled={loading || submitted}
            />
          </div>
        </div>

        {error && <p className={s.error}>{error}</p>}

        {!submitted && (
          <button type="submit" className={s.submit} disabled={loading}>
            {loading && <Loader2 className={s.spinner} size={16} aria-hidden />}
            {loading ? 'Enviando enlace…' : 'Enviar enlace de recuperación'}
          </button>
        )}
      </form>

      {submitted && (
        <div className={s.successBox}>
          <p className={s.successTitle}>Revisa tu correo</p>
          <p className={s.successText}>
            {serverMessage ??
              'Si tu correo está registrado, te enviaremos un enlace para que puedas crear una nueva contraseña.'}
          </p>

          {demoToken && (
            <div className={s.demoBox}>
              <p className={s.demoLabel}>Para modo demo:</p>
              <p className={s.demoText}>
                Código de recuperación: <code>{demoToken}</code>
              </p>
              <button
                type="button"
                className={s.linkButton}
                onClick={() => router.push(`/reset-password?token=${demoToken}`)}
              >
                Ir a escribir nueva contraseña
                <ArrowRight size={14} />
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
