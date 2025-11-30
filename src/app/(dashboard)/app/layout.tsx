// src/app/(dashboard)/app/layout.tsx
import type { ReactNode } from 'react';
import DashboardShell from '@/features/shell/DashboardShell/DashboardShell';

export default function AppLayout({ children }: { children: ReactNode }) {
  // Por ahora, rol y nombre de demo.
  // Más adelante esto vendrá del AuthContext después del login.
  return (
    <DashboardShell
      area="business"
      role="owner"
      userName="Dueño Demo Taquería"
      businessName="Taquería El Barrio"
    >
      {children}
    </DashboardShell>
  );
}
