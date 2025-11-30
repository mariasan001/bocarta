// src/app/(auth)/forgot-password/page.tsx

import ForgotPasswordForm from '@/features/components/ForgotPasswordForm/ForgotPasswordForm';
import s from './forgot-password-page.module.css';

export default function ForgotPasswordPage() {
  return (
    <section className={s.page}>
      <ForgotPasswordForm />
    </section>
  );
}
