// src/app/(private)/app/sucursales/page.tsx
'use client';

import BranchesScreen from '@/features/branches/components/BranchesScreen/BranchesScreen';
import s from './sucursales-page.module.css';

export default function SucursalesPage() {
  return (
    <section className={s.page}>
      <BranchesScreen />
    </section>
  );
}
