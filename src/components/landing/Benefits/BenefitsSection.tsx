// src/components/landing/Benefits/BenefitsSection.tsx
import styles from './BenefitsSection.module.css';

export default function BenefitsSection() {
  return (
    <section className={`section ${styles.section}`}>
      <div className="sectionInner">
        <h2 className="sectionTitle">Lo que resuelve Bocarta en tu día a día</h2>
        <p className="sectionSubtitle">
          Menús desactualizados, PDFs en WhatsApp, promos que nadie entiende.
          Bocarta está diseñado justo contra esos dolores.
        </p>

        <div className={`cardsGrid cardsGrid--three ${styles.grid}`}>
          <article className={styles.card}>
            <h3>Adiós menús desactualizados</h3>
            <p>
              Cambia precios, fotos y platillos en segundos. Lo que editas en
              Bocarta se refleja de inmediato en tu menú digital y en tu QR, sin
              volver a imprimir cartas ni reenviar PDFs.
            </p>
          </article>

          <article className={styles.card}>
            <h3>Promos inteligentes, no improvisadas</h3>
            <p>
              Configura Happy Hour, menú del día o precios especiales por
              franja. Bocarta aplica la promo y muestra el precio correcto en el
              momento justo.
            </p>
          </article>

          <article className={styles.card}>
            <h3>Datos claros para decidir mejor</h3>
            <p>
              Ve cuántas personas consultan tu menú, cuáles son tus platillos
              estrella, en qué horarios te buscan más y qué no está
              funcionando. Sin hojas de cálculo ni dashboards raros.
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}
