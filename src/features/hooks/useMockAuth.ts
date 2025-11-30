// src/features/auth/hooks/useMockAuth.ts
'use client';

import { useState } from 'react';
import { LoginPayload, LoginResult } from '../auth/types';
import { mockUsers } from '../user/users';


export function useMockAuth() {
  const [loading, setLoading] = useState(false);

  async function login({ email, password }: LoginPayload): Promise<LoginResult> {
    setLoading(true);

    return new Promise((resolve) => {
      setTimeout(() => {
        const user = mockUsers.find(
          (u) =>
            u.email.toLowerCase() === email.toLowerCase() &&
            u.password === password,
        );

        setLoading(false);

        if (!user) {
          resolve({ ok: false, message: 'Correo o contraseña incorrectos.' });
        } else {
          const { password: _pw, ...safe } = user;
          resolve({ ok: true, user: safe });
        }
      }, 600);
    });
  }

  return { login, loading };
}
