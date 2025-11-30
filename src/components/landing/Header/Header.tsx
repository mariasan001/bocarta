// src/components/landing/Header/Header.tsx
'use client';

import Link from 'next/link';
import Image from 'next/image';
import styles from './Header.module.css';

export default function Header() {
  return (
    <div className={styles.wrapper}>
      <div className="sectionInner">
        <div className={styles.inner}>
          {/* Marca Bocarta con logo → siempre vuelve al inicio */}
          <Link href="#hero" className={styles.brand} aria-label="Ir al inicio">
            <Image
              src="/img/logo.svg"
              alt="bocarta · menú digital"
              width={120}
              height={32}
              className={styles.brandLogo}
              priority
            />
          </Link>

          {/* Menú principal (secciones de la landing) */}
          <nav className={styles.nav}>
            <a href="#hero" className={`${styles.navItem} ${styles.navItemActive}`}>
              Inicio
            </a>
            <a href="#benefits" className={styles.navItem}>
              Beneficios
            </a>
            <a href="#how-it-works" className={styles.navItem}>
              Cómo funciona
            </a>
            <a href="#pricing" className={styles.navItem}>
              Planes
            </a>
          </nav>

          {/* Acciones derecha */}
          <div className={styles.actions}>
            {/* Ahora es un <Link> a /login, con estilos de botón */}
            <Link href="/login" className={styles.loginBtn}>
              Iniciar sesión
            </Link>

            {/* CTA puede ir a registro para arrancar el onboarding */}
            <Link href="/register" className={styles.ctaBtn}>
              Probar Bocarta gratis
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
