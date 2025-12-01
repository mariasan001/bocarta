// src/app/(private)/app/micrositio-qr/page.tsx
'use client';

import MicrositeScreen from '@/features/microsite/components/MicrositeScreen/MicrositeScreen';
import s from './micrositio-qr-page.module.css';

export default function MicrositioQrPage() {
  return (
    <section className={s.page}>
      <MicrositeScreen />
    </section>
  );
}
