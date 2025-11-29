// src/components/landing/Features/FeaturesSection.tsx
import styles from './FeaturesSection.module.css';

export default function FeaturesSection() {
  return (
    <section className={`section ${styles.section}`}>
      <div className="sectionInner">
        <h2 className="sectionTitle">
          Todo lo que Bocarta hace por tu menú
        </h2>
        <p className="sectionSubtitle">
          No es solo un QR. Es el panel desde donde controlas precios, promos,
          agotados, reseñas y recompensas.
        </p>

        <div className={styles.grid}>
          <article className={styles.card}>
            <h3>Edición en tiempo real</h3>
            <p>
              Cambia precios, textos, fotos y orden de los platillos en
              segundos. Marca Disponible / Agotado con un botón. Tu menú digital
              se actualiza al instante.
            </p>
          </article>

          <article className={styles.card}>
            <h3>Agotado y “Últimas porciones”</h3>
            <p>
              Define un stock simple por platillo. Bocarta puede mostrar “Últimas
              porciones” cuando quedan pocas y cambiar a “Agotado” automáticamente
              al llegar a cero.
            </p>
          </article>

          <article className={styles.card}>
            <h3>Happy Hour y precios por horario</h3>
            <p>
              Configura reglas por día y hora: 2x1, precio especial o descuento
              porcentual. Bocarta muestra el precio base tachado y el precio
              activo mientras dure la promo.
            </p>
          </article>

          <article className={styles.card}>
            <h3>Votos y comentarios por platillo</h3>
            <p>
              Tus clientes pueden valorar cada platillo con estrellas y dejar
              comentarios. Tú decides si se muestran públicamente o se usan solo
              como feedback interno.
            </p>
          </article>

          <article className={styles.card}>
            <h3>Recompensas y cupones simples</h3>
            <p>
              Activa cupones basados en comportamiento: por ejemplo, al dejar una
              reseña positiva o después de varias visitas desde el mismo
              dispositivo. Bocarta muestra el código directo en el menú.
            </p>
          </article>

          <article className={styles.card}>
            <h3>Mini sitio + QR + PDF</h3>
            <p>
              Cada negocio tiene un mini dominio con su menú (ej.
              bocarta.app/minegocio), un QR vinculado y la opción de descargar un
              PDF actualizado de la carta para imprimir o compartir.
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}
