// src/components/landing/Founder/FounderSection.tsx
import styles from './FounderSection.module.css';

export default function FounderSection() {
  return (
    <section className={`section ${styles.section}`} id="founder">
      <div className="sectionInner">
        <h2 className="sectionTitle">Plan Fundador Bocarta</h2>
        <p className="sectionSubtitle">
          50% de descuento el primer año para los negocios que se suben desde el
          inicio y nos ayudan a pulir Bocarta con feedback real.
        </p>

        <div className={styles.card}>
          <div className={styles.highlight}>
            <span className={styles.highlightPill}>Fundadores</span>
            <p>
              <strong>50% de descuento durante 12 meses</strong> en Bocarta
              Fuerte o Bocarta Casa Llena.
            </p>
          </div>

          <div className={styles.columns}>
            <div className={styles.col}>
              <h3>¿Qué incluye?</h3>
              <ul>
                <li>
                  50% de descuento durante <strong>12 meses</strong> en el plan
                  que elijas (Fuerte o Casa Llena).
                </li>
                <li>
                  Acceso a todas las funciones del plan elegido, sin recortes.
                </li>
                <li>
                  Prioridad para probar novedades antes que el resto.
                </li>
                <li>
                  Lugar asegurado como negocio fundador en nuestros casos de
                  éxito.
                </li>
              </ul>
            </div>

            <div className={styles.col}>
              <h3>Condiciones claras</h3>
              <ul>
                <li>
                  Solo para los <strong>primeros 15 negocios</strong> que
                  contraten Bocarta Fuerte o Casa Llena.
                </li>
                <li>
                  Disponible hasta <strong>60 días</strong> después del
                  lanzamiento, o hasta llenar los 15 lugares (lo que ocurra
                  primero).
                </li>
                <li>
                  Al terminar el primer año, el plan pasa al precio normal
                  vigente.
                </li>
              </ul>
              <p className={styles.example}>
                <strong>Ejemplo:</strong> Bocarta Fuerte pasa de $199 a{' '}
                <strong>$99/mes</strong> el primer año. Bocarta Casa Llena pasa
                de $349 a <strong>$174/mes</strong> el primer año.
              </p>
            </div>
          </div>

          <div className={styles.ctaRow}>
            <a href="#hero" className={styles.primaryBtn}>
              Quiero aplicar al Plan Fundador
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
