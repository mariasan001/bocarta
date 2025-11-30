// src/app/(auth)/register/page.tsx

import RegisterWizard from '@/features/components/RegisterWizard/RegisterWizard';
import s from './register-page.module.css';

export default function RegisterPage() {
  return (
    <section className={s.page}>
      <RegisterWizard />
    </section>
  );
}
