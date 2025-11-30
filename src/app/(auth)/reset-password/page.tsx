// src/app/(auth)/reset-password/page.tsx
'use client';

import { useSearchParams } from 'next/navigation';
import s from './reset-password-page.module.css';
import ResetPasswordForm from '@/features/components/ResetPasswordForm/ResetPasswordForm';

export default function ResetPasswordPage() {
  const searchParams = useSearchParams();
  const tokenFromUrl = searchParams.get('token') ?? undefined;

  return (
    <section className={s.page}>
      <ResetPasswordForm initialToken={tokenFromUrl} />
    </section>
  );
}
