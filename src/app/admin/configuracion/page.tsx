// src/app/admin/configuracion/page.tsx
import AdminSettingsScreen from '@/features/admin/components/AdminSettingsScreen/AdminSettingsScreen';
import s from './configuracion-page.module.css';

export default function AdminConfiguracionPage() {
  return (
    <section className={s.page}>
      <AdminSettingsScreen />
    </section>
  );
}
