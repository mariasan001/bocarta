// src/app/(dashboard)/app/menu/page.tsx

import MenuScreen from '@/features/menu/components/MenuScreen';
import s from './menu-page.module.css';

export default function MenuPage() {
  return (
    <section className={s.page}>
      <MenuScreen />
    </section>
  );
}
