// src/app/(dashboard)/app/page.tsx

import s from './app-home.module.css';

export default function AppHomePage() {
  return (
    <div className={s.grid}>
      <section className={s.cardPrimary}>
        <h1 className={s.title}>Hola, Taquería El Barrio 👋</h1>
        <p className={s.text}>
          Aquí verás un resumen rápido: visitas al menú, platillos más vistos y reseñas nuevas.
        </p>
      </section>

      <section className={s.card}>
        <h2 className={s.cardTitle}>Próximos pasos sugeridos</h2>
        <ul className={s.list}>
          <li>Completa tu menú con fotos y descripciones.</li>
          <li>Activa tu primera promo por horario (Happy Hour).</li>
          <li>Imprime y prueba tu QR en una mesa.</li>
        </ul>
      </section>
    </div>
  );
}
