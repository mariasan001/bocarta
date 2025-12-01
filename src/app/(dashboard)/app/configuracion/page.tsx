// src/app/(private)/app/configuracion/page.tsx
'use client';

import SettingsScreen from '@/features/settings/components/SettingsScreen/SettingsScreen';
import s from './configuracion-page.module.css';

export default function ConfiguracionPage() {
  return (
    <section className={s.page}>
      <SettingsScreen />
    </section>
  );
}
