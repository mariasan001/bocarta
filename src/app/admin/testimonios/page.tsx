// src/app/admin/testimonios/page.tsx
import AdminTestimonialsScreen from '@/features/admin/components/AdminSupportScreen/AdminTestimonialsScreen';
import s from './testimonios-page.module.css';

export default function AdminTestimoniosPage() {
  return (
    <section className={s.page}>
      <AdminTestimonialsScreen />
    </section>
  );
}
