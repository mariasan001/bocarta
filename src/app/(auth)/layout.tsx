// src/app/(auth)/layout.tsx
import type { Metadata } from 'next';
import React from 'react';
import s from './AuthLayout.module.css';

export const metadata: Metadata = {
  title: 'Acceso | Bocarta',
  description: 'Inicia sesión para editar tu menú digital Bocarta.',
};

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={s.shell}>
      <div className={s.panel}>
        <header className={s.brand}>
          <div className={s.logoDot} />
          <div className={s.brandText}>
            <span className={s.brandName}>Bocarta</span>
            <span className={s.brandTagline}>Menú digital en vivo</span>
          </div>
        </header>

        <main className={s.content}>{children}</main>

        <footer className={s.footer}>
          <span>© {new Date().getFullYear()} Bocarta</span>
          <span className={s.footerLinks}>
            <a href="#">Términos</a>
            <span>·</span>
            <a href="#">Privacidad</a>
          </span>
        </footer>
      </div>

      <aside className={s.side}>
        <div className={s.sideCard}>
          <p className={s.sideKicker}>Tu carta, siempre al día</p>
          <h2 className={s.sideTitle}>
            Cambia precios, marca agotados y activa promos por horario.
          </h2>
          <p className={s.sideCopy}>
            Lo que configuras aquí se refleja al instante en tu QR.
          </p>

          <ul className={s.sideList}>
            <li>Menú organizado por categorías</li>
            <li>Promos programadas por día y hora</li>
            <li>Vista móvil pensada para tus comensales</li>
          </ul>
        </div>
      </aside>
    </div>
  );
}
