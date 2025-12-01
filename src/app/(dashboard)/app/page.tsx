// src/app/(dashboard)/app/page.tsx
import NoticesCard from '@/features/NoticesCard/NoticesCard';
import s from './app-home.module.css';

export default function AppHomePage() {
  return (
    <div className={s.grid}>
      {/* Columna izquierda: saludo + avisos + lo que venga después */}
      <section className={s.colMain}>
        <div className={s.cardPrimary}>
          <h1 className={s.title}>Hola, Taquería El Barrio 👋</h1>
          <p className={s.text}>
            Aquí verás un resumen rápido: visitas al menú, platillos más vistos y reseñas nuevas.
          </p>
        </div>

        {/* Avisos para clientes (lo que se refleja en el micrositio/QR) */}
        <NoticesCard />

        {/* Aquí después puedes meter más cards de resumen, KPIs, etc. */}
        {/* <SomeStatsCard /> */}
      </section>

      {/* Columna derecha: próximos pasos, tips, etc. */}
      <section className={s.colSide}>
        <div className={s.card}>
          <h2 className={s.cardTitle}>Próximos pasos sugeridos</h2>
          <ul className={s.list}>
            <li>Completa tu menú con fotos y descripciones.</li>
            <li>Activa tu primera promo por horario (Happy Hour).</li>
            <li>Imprime y prueba tu QR en una mesa.</li>
          </ul>
        </div>

        {/* Aquí puedes ir sumando otras tarjetas “laterales” */}
        {/* <TipsCard /> */}
      </section>
    </div>
  );
}
