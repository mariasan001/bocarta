// src/app/admin/negocios/page.tsx
import AdminBusinessesScreen from '@/features/admin/components/AdminBusinessesScreen/AdminBusinessesScreen';
import s from './negocios-page.module.css';

export default function AdminNegociosPage() {
  return (
    <section className={s.page}>
      <AdminBusinessesScreen />
    </section>
  );
}
