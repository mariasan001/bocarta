// src/app/admin/promociones/page.tsx
import AdminPromosScreen from '@/features/admin/components/AdminPromosScreen/AdminPromosScreen';
import s from './promociones-page.module.css';

export default function AdminPromocionesPage() {
  return (
    <section className={s.page}>
      <AdminPromosScreen />
    </section>
  );
}
