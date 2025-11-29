// src/components/landing/WhatIs/WhatIsSection.tsx
import styles from './WhatIsSection.module.css';

export default function WhatIsSection() {
  return (
    <section className={`section ${styles.section}`} id="que-es">
      <div className="sectionInner">
        <h2 className="sectionTitle">¿Qué es Bocarta?</h2>
        <p className="sectionSubtitle">
          Bocarta es un <strong>menú digital con QR</strong> para negocios de
          comida y bebida que viven cambiando precios, platillos y promociones.
        </p>

        <div className={styles.textBlock}>
          <p>
            Desde un panel sencillo, editas tu carta como si editaras una lista:
            cambias precios, ordenas platillos, marcas <strong>Agotado</strong> y
            configuras <strong>Happy Hour</strong> por horario.
          </p>
          <p>
            Del otro lado, tus clientes escanean el QR y ven un{' '}
            <strong>micrositio limpio y rápido</strong>, pensado para leerse
            perfecto en el celular: menú actualizado, promos vigentes y la
            posibilidad de valorar y comentar platillos.
          </p>
        </div>
      </div>
    </section>
  );
}
