// src/app/(auth)/layout.tsx
import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import s from './AuthLayout.module.css';

export const metadata: Metadata = {
  title: 'Acceso | Bocarta',
  description: 'Inicia sesión para editar tu menú digital Bocarta.',
};

type AuthLayoutProps = {
  children: ReactNode;
};

export default function AuthLayout({ children }: AuthLayoutProps) {
  const year = new Date().getFullYear();

  return (
    <div className={s.shell}>
      {/* Lado izquierdo: mensaje grande */}
      <section className={s.left}>
        <div className={s.leftInner}>
          <div className={s.leftMain}>
           
            <h2 className={s.leftTitle}>
              Tu{' '}
              <span className={s.leftTitleHighlight}>menú digital</span>,
              siempre al día.
            </h2>
            <p className={s.leftCopy}>
              Cambia precios, marca platillos agotados y activa promos por horario en
              segundos, sin volver a imprimir cartas ni borrar pizarrones.
            </p>
          </div>

          <footer className={s.leftFooter}>
            <span>¿Todavía no usas Bocarta?</span>
            <Link href="/register" className={s.leftLink}>
              Crear cuenta para mi negocio
            </Link>
          </footer>
        </div>
      </section>

      {/* Lado derecho: logo + formulario + legal */}
      <section className={s.right}>
        <header className={s.rightHeader}>
          <div className={s.logoRow}>
            <Image
              src="img/Logo.svg" // cambia a /images/Logo.svg si lo tienes en /public/images
              alt="Bocarta"
              width={140}
              height={40}
              priority
              className={s.logo}
            />
          </div>
        </header>

        <main className={s.rightMain} role="main">
          {children}
        </main>

        <footer className={s.rightFooter}>
          <span>© {year} Bocarta</span>
          <span className={s.footerLinks}>
            <a href="#">Términos</a>
            <span>·</span>
            <a href="#">Privacidad</a>
          </span>
        </footer>
      </section>
    </div>
  );
}
