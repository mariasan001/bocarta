// src/app/admin/soporte/page.tsx
import AdminSupportScreen from '@/features/admin/components/AdminSupportScreen';
import s from './soporte-page.module.css';

export default function AdminSoportePage() {
  return (
    <section className={s.page}>
      <AdminSupportScreen />
    </section>
  );
}
