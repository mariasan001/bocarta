// src/features/auth/hooks/useMockRegister.ts
'use client';

import { useState } from 'react';
import { RegisterFormState, RegisterResult } from '../auth/types';

let counter = 1;

export function useMockRegister() {
  const [loading, setLoading] = useState(false);

  async function register(data: RegisterFormState): Promise<RegisterResult> {
    setLoading(true);

    return new Promise((resolve) => {
      setTimeout(() => {
        setLoading(false);

        // Validaciones mínimas
        if (!data.account.email || !data.account.password || !data.account.name) {
          resolve({ ok: false, message: 'Completa los datos de la cuenta.' });
          return;
        }

        if (!data.business.businessName) {
          resolve({ ok: false, message: 'Agrega el nombre de tu negocio.' });
          return;
        }

        if (!data.plan) {
          resolve({ ok: false, message: 'Elige un plan para comenzar.' });
          return;
        }

        const id = `u-new-${counter++}`;
        const bizId = `biz-new-${counter}`;

        resolve({
          ok: true,
          user: {
            id,
            email: data.account.email,
            name: data.account.name,
            role: 'owner',
            businessId: bizId,
          },
        });
      }, 900);
    });
  }

  return { register, loading };
}
