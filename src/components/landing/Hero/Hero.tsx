// src/components/landing/Hero/Hero.tsx
import Image from 'next/image';
import styles from './Hero.module.css';

export default function Hero() {
  return (
    <header id="hero" className={styles.hero}>
      <div className="sectionInner">
        {/* Top copy */}
        <div className={styles.top}>
          <div className={styles.badgeRow}>
            <div className={styles.badge}>
              <span className={styles.badgeDot} />
              Nuevo · Menú digital con QR
            </div>
          </div>

          <h1 className={styles.title}>
            Tu menú cambia en segundos.
            <br />
            Tu QR también.
          </h1>

          <p className={styles.subtitle}>
            Bocarta convierte tu carta en un <strong>menú digital vivo</strong>:
            actualizas precios, marcas platillos agotados, activas promos por
            horario y tu QR siempre muestra la versión correcta.
          </p>

          <div className={styles.actions}>
            <a href="#pricing" className={styles.primaryBtn}>
              Probar Bocarta gratis
            </a>
            <a href="#how-it-works" className={styles.secondaryBtn}>
              Ver cómo funciona
            </a>
          </div>

          <p className={styles.microcopy}>
            Sin contratos, sin tarjetas. Solo tu menú, siempre al día.
          </p>
        </div>

        {/* Cards tipo pasos, inspirado en el diseño que mostraste */}
        <div className={styles.cardsRow}>
          {/* Card 1 */}
          <article className={`${styles.card} ${styles.cardLeft}`}>
            <div className={styles.cardHeader}>
              <span className={styles.stepLabel}>Paso 1</span>
              <span className={styles.stepBadge}>Crear menú</span>
            </div>

            <div className={styles.brandRow}>
              <Image
                src="/img/logo.svg"
                alt="Logo de Bocarta"
                width={110}
                height={30}
              />
              <span className={styles.statusPill}>Abierto ahora</span>
            </div>

            <p className={styles.cardText}>
              Da de alta tus platillos con nombre, precio, foto y categorías.
              En minutos tienes tu carta digital lista para usarse.
            </p>
          </article>

          {/* Card 2 */}
          <article className={styles.card}>
            <div className={styles.cardHeader}>
              <span className={styles.stepLabel}>Paso 2</span>
              <span className={styles.stepBadge}>Editar al vuelo</span>
            </div>

            <p className={styles.cardText}>
              Desde tu celular cambias precios, activas{' '}
              <strong>Happy Hour</strong> y marcas platillos como{' '}
              <strong>Agotado</strong> en tiempo real.
            </p>

            <ul className={styles.cardList}>
              <li>• Ajusta precios en segundos</li>
              <li>• Marca “Últimas porciones”</li>
              <li>• Oculta temporalmente platillos</li>
            </ul>
          </article>

          {/* Card 3 */}
          <article className={`${styles.card} ${styles.cardRight}`}>
            <div className={styles.cardHeader}>
              <span className={styles.stepLabel}>Paso 3</span>
              <span className={styles.stepBadge}>Ver qué funciona</span>
            </div>

            <p className={styles.cardText}>
              Bocarta te muestra <strong>platillos más vistos</strong>, horarios
              pico y reseñas de tus clientes para decidir mejor.
            </p>

            <div className={styles.chartStub}>
              <div className={styles.bar} />
              <div className={`${styles.bar} ${styles.barMedium}`} />
              <div className={`${styles.bar} ${styles.barTall}`} />
              <div className={`${styles.bar} ${styles.barSmall}`} />
            </div>

            <span className={styles.chartLabel}>
              Vista rápida de tus platillos estrella
            </span>
          </article>
        </div>
      </div>
    </header>
  );
}
