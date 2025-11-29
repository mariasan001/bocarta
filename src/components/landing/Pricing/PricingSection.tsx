// src/components/landing/Pricing/PricingSection.tsx
import styles from './PricingSection.module.css';

export default function PricingSection() {
  return (
    <section className={`section ${styles.section}`} id="pricing">
      <div className="sectionInner">
        <h2 className="sectionTitle">Elige el Bocarta que va con tu negocio</h2>
        <p className="sectionSubtitle">
          Empiezas gratis, pruebas el menú digital y cuando tu operación lo pida,
          desbloqueas todo el potencial con Bocarta Fuerte o Casa Llena.
        </p>

        <div className={styles.grid}>
          {/* Entrada */}
          <article className={styles.card}>
            <div className={styles.planHeader}>
              <h3>Bocarta Entrada</h3>
              <p className={styles.price}>$0</p>
              <span className={styles.priceNote}>/ mes</span>
            </div>
            <p className={styles.planTagline}>
              Para probar Bocarta sin riesgo.
            </p>
            <ul className={styles.features}>
              <li>1 menú digital con mini sitio y QR</li>
              <li>Hasta 40–50 platillos y 4 categorías</li>
              <li>Edición básica (precio, descripción, foto)</li>
              <li>Horarios y botones de contacto</li>
              <li>PDF sincronizado del menú</li>
              <li>Analíticas básicas (visitas y platillos más vistos)</li>
              <li>
                Incluye sello <strong>“Hecho con Bocarta”</strong> en menú y PDF
              </li>
            </ul>
            <a href="#hero" className={styles.secondaryBtn}>
              Empezar gratis
            </a>
          </article>

          {/* Fuerte */}
          <article className={`${styles.card} ${styles.cardAccent}`}>
            <div className={styles.badgePopular}>Más elegido</div>
            <div className={styles.planHeader}>
              <h3>Bocarta Fuerte</h3>
              <p className={styles.price}>$199</p>
              <span className={styles.priceNote}>/ mes</span>
            </div>
            <p className={styles.planTagline}>
              Para negocios con flujo diario que quieren promos, reseñas y datos.
            </p>
            <ul className={styles.features}>
              <li>Todo lo de Bocarta Entrada</li>
              <li>Categorías y platillos sin límite real</li>
              <li>Promos y precios por horario (Happy Hour)</li>
              <li>Stock simple + etiqueta “Últimas porciones”</li>
              <li>Votos y comentarios por platillo (con moderación)</li>
              <li>Recompensas simples por reseña positiva</li>
              <li>
                Analíticas completas (visitas por día, horas pico, top categorías
                y platillos)
              </li>
              <li>Menú público sin marca de agua Bocarta</li>
              <li>PDF con marca Bocarta discreta (opcional)</li>
            </ul>
            <a href="#founder" className={styles.primaryBtn}>
              Quiero Bocarta Fuerte
            </a>
          </article>

          {/* Casa Llena */}
          <article className={styles.card}>
            <div className={styles.planHeader}>
              <h3>Bocarta Casa Llena</h3>
              <p className={styles.price}>$349</p>
              <span className={styles.priceNote}>/ mes</span>
            </div>
            <p className={styles.planTagline}>
              Para quienes manejan más de una sucursal y necesitan ver la película
              completa.
            </p>
            <ul className={styles.features}>
              <li>Todo lo de Bocarta Fuerte</li>
              <li>Multi-sucursal con QR y analíticas por ubicación</li>
              <li>Roles (dueño, staff, solo lectura)</li>
              <li>Reportes automáticos por correo (semanales/mensuales)</li>
              <li>Insights de demanda y platillos que se agotan rápido</li>
              <li>Recompensas más avanzadas (por visitas, comportamiento)</li>
              <li>Exportación de datos (CSV) y soporte prioritario</li>
              <li>
                Menú digital y PDF <strong>100% white label</strong> (sin marca
                Bocarta)
              </li>
            </ul>
            <a href="#founder" className={styles.secondaryBtn}>
              Hablar con nosotros
            </a>
          </article>
        </div>
      </div>
    </section>
  );
}
