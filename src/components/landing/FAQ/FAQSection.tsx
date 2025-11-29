// src/components/landing/FAQ/FAQSection.tsx
import styles from './FAQSection.module.css';

const faqs = [
  {
    q: '¿Mis clientes necesitan instalar una app?',
    a: 'No. Bocarta funciona en el navegador. Tus clientes solo escanean el QR y ven el menú en su celular.',
  },
  {
    q: '¿Puedo seguir usando menús impresos?',
    a: 'Claro. Desde Bocarta descargas un PDF actualizado de tu menú y lo imprimes cuando lo necesites.',
  },
  {
    q: '¿Estoy obligado a mostrar comentarios públicos?',
    a: 'No. Tú decides: puedes mostrar estrellas y comentarios en el menú, solo el promedio, o usar las reseñas solo como feedback interno.',
  },
  {
    q: '¿Puedo cambiar de plan más adelante?',
    a: 'Sí. Puedes empezar con Bocarta Entrada (Gratis) y subir a Fuerte o Casa Llena cuando tu negocio lo necesite.',
  },
  {
    q: '¿En qué dispositivos funciona el panel de Bocarta?',
    a: 'En cualquier navegador moderno: computadora, tablet o celular. La idea es que puedas editar tu carta incluso desde la barra o la cocina.',
  },
];

export default function FAQSection() {
  return (
    <section className={`section ${styles.section}`}>
      <div className="sectionInner">
        <h2 className="sectionTitle">Preguntas frecuentes</h2>
        <p className="sectionSubtitle">
          Las dudas más comunes antes de digitalizar tu menú con Bocarta.
        </p>

        <div className={styles.list}>
          {faqs.map((item) => (
            <article key={item.q} className={styles.item}>
              <h3>{item.q}</h3>
              <p>{item.a}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
