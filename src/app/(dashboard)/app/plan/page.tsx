// src/app/(private)/app/plan/page.tsx
'use client';

import PlanScreen from '@/features/plan/components/PlanScreen/PlanScreen';
import s from './plan-page.module.css';

export default function PlanPage() {
  return (
    <section className={s.page}>
      <PlanScreen />
    </section>
  );
}
