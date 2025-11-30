// src/app/(auth)/login/page.tsx

import LoginForm from '@/features/components/LoginForm';
import s from './login-page.module.css';

export default function LoginPage() {
  return (
    <section className={s.page}>
      <LoginForm />
    </section>
  );
}
