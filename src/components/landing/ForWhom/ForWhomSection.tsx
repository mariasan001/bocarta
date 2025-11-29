// src/components/landing/ForWhom/ForWhomSection.tsx
import styles from './ForWhomSection.module.css';

export default function ForWhomSection() {
  return (
    <section className={`section ${styles.section}`}>
      <div className="sectionInner">
        <h2 className="sectionTitle">Bocarta es para ti si…</h2>
        <p className="sectionSubtitle">
          Te vas a reconocer aquí si vives en el día a día de una cocina, una
          barra o un local que no se puede quedar quieto.
        </p>

        <ul className={styles.list}>
          <li>
            Tienes una <strong>taquería, café, bar o food truck</strong> y cambias
            precios o promos seguido.
          </li>
          <li>
            Estás cansado de <strong>imprimir cartas nuevas</strong> cada vez que
            sube un insumo.
          </li>
          <li>
            Mandas tu menú por <strong>PDF o imagen en WhatsApp</strong> y ya no
            sabes cuál versión tiene el cliente.
          </li>
          <li>
            Quieres saber cuáles son tus <strong>platillos estrella</strong> y en
            qué horarios realmente te buscan.
          </li>
          <li>
            Te gustaría agradecer a tus clientes con{' '}
            <strong>reseñas y pequeños descuentos</strong>, pero sin montar un
            sistema complicado.
          </li>
        </ul>
      </div>
    </section>
  );
}
