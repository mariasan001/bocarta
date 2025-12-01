// src/app/(private)/app/analiticas/page.tsx
'use client';

import AnalyticsScreen from '@/features/analytics/components/AnalyticsScreen/AnalyticsScreen';
import s from './analiticas-page.module.css';

export default function AnaliticasPage() {
  return (
    <section className={s.page}>
      <AnalyticsScreen />
    </section>
  );
}
