// src/app/admin/planes/page.tsx
import AdminPlansScreen from '@/features/admin/components/AdminPlansScreen/AdminPlansScreen';
import s from './planes-page.module.css';

export default function AdminPlanesPage() {
  return (
    <section className={s.page}>
      <AdminPlansScreen />
    </section>
  );
}
