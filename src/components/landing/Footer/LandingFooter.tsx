// src/components/landing/Footer/LandingFooter.tsx
import styles from './LandingFooter.module.css';

export default function LandingFooter() {
  return (
    <footer className={styles.footer}>
      <div className="sectionInner">
        <div className={styles.inner}>
          <div>
            <div className={styles.logo}>bocarta</div>
            <p className={styles.tagline}>
              Tu menú, siempre al día. Sin diseñadores. Sin drama.
            </p>
          </div>
          <div className={styles.right}>
            <a href="#hero" className={styles.link}>
              Volver arriba
            </a>
          </div>
        </div>
        <div className={styles.bottom}>
          <span>© {new Date().getFullYear()} Bocarta.</span>
          <span className={styles.dim}>
            Hecho con cariño para taquerías, cafés, bares y food trucks.
          </span>
        </div>
      </div>
    </footer>
  );
}
