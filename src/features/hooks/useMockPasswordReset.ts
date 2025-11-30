// src/features/auth/hooks/useMockPasswordReset.ts
'use client';

import { useState } from 'react';
import type {
  RequestResetPayload,
  RequestResetResult,
  ConfirmResetPayload,
  ConfirmResetResult,
} from '../auth/types';
import { mockUsers } from '../user/users';


const DEMO_TOKEN = '123456'; // token fijo para demos

export function useMockPasswordReset() {
  const [loading, setLoading] = useState(false);

  async function requestReset(
    payload: RequestResetPayload,
  ): Promise<RequestResetResult> {
    setLoading(true);

    return new Promise((resolve) => {
      setTimeout(() => {
        setLoading(false);

        const exists = mockUsers.some(
          (u) => u.email.toLowerCase() === payload.email.toLowerCase(),
        );

        // En un sistema real, aunque no exista el correo se devuelve el mismo mensaje.
        if (!exists) {
          resolve({
            ok: true,
            message:
              'Si tu correo está registrado, te enviaremos un enlace para recuperar tu contraseña.',
          });
          return;
        }

        // Para demo, devolvemos el token para que el back vea el flujo completo.
        resolve({
          ok: true,
          message:
            'Te enviamos un enlace de recuperación. Para pruebas, usa el código de abajo.',
          token: DEMO_TOKEN,
        });
      }, 800);
    });
  }

  async function confirmReset(
    payload: ConfirmResetPayload,
  ): Promise<ConfirmResetResult> {
    setLoading(true);

    return new Promise((resolve) => {
      setTimeout(() => {
        setLoading(false);

        if (!payload.token || payload.token !== DEMO_TOKEN) {
          resolve({
            ok: false,
            message: 'El código no es válido o ha expirado.',
          });
          return;
        }

        if (!payload.password || payload.password.length < 8) {
          resolve({
            ok: false,
            message: 'La nueva contraseña debe tener al menos 8 caracteres.',
          });
          return;
        }

        // Aquí el back actualizaría la contraseña y quemaría el token
        resolve({
          ok: true,
          message: 'Tu contraseña ha sido actualizada. Ya puedes iniciar sesión.',
        });
      }, 800);
    });
  }

  return { requestReset, confirmReset, loading };
}
