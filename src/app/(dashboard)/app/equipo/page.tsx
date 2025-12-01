// src/app/(private)/app/equipo/page.tsx
'use client';

import TeamScreen from '@/features/team/TeamScreen';
import s from './equipo-page.module.css';

export default function EquipoPage() {
  return (
    <section className={s.page}>
      <TeamScreen />
    </section>
  );
}
