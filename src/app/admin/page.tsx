// src/app/admin/page.tsx
import AdminHomeScreen from '@/features/admin/components/AdminHomeScreen/AdminHomeScreen';
import s from './admin-home.module.css';

export default function AdminHomePage() {
  return (
    <section className={s.page}>
      <AdminHomeScreen />
    </section>
  );
}
