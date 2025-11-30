import PromosScreen from '@/features/promos/components/PromosScreen/PromosScreen';
import s from './promos-page.module.css';

export default function PromosPage() {
  return (
    <section className={s.page}>
      <PromosScreen />
    </section>
  );
}
