// src/components/landing/HowItWorks/HowItWorksSection.tsx
import styles from './HowItWorksSection.module.css';

export default function HowItWorksSection() {
  return (
    <section
      className={`section ${styles.section}`}
      id="how-it-works"
    >
      <div className="sectionInner">
        <h2 className="sectionTitle">¿Cómo funciona Bocarta?</h2>
        <p className="sectionSubtitle">
          Tres pasos simples para que tu carta deje de ser estática y se
          convierta en un sistema vivo.
        </p>

        <div className={styles.stepsGrid}>
          <article className={styles.step}>
            <div className={styles.stepTag}>Paso 1</div>
            <h3>Crea tu menú</h3>
            <p>
              Das de alta tu negocio, eliges categorías (entradas, tacos,
              bebidas, postres…) y agregas tus platillos con foto, descripción y
              precio.
            </p>
          </article>

          <article className={styles.step}>
            <div className={styles.stepTag}>Paso 2</div>
            <h3>Coloca tu QR</h3>
            <p>
              Bocarta genera un micrositio con tu carta y un QR listo para
              descargar. Lo imprimes y lo colocas en mesas, barra o mostrador.
              Un escaneo y el cliente ve tu menú.
            </p>
          </article>

          <article className={styles.step}>
            <div className={styles.stepTag}>Paso 3</div>
            <h3>Edita, mide y mejora</h3>
            <p>
              Desde el panel cambias precios, marcas platillos como Agotado,
              activas promos por horario y revisas qué se mueve más. Tu carta se
              vuelve un sistema vivo, no una hoja estática.
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}
