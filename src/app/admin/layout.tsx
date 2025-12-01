// src/app/admin/layout.tsx
import type { ReactNode } from 'react';
import DashboardShell from '@/features/shell/DashboardShell/DashboardShell';

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <DashboardShell
      area="admin"           // 👈 ahora está en modo panel Bocarta
      role="bocartaOwner"   // 👈 perfil: dueño de la plataforma
      userName="Owner Demo Bocarta"
      // businessName no hace falta aquí, el shell lo ignora en modo admin
    >
      {children}
    </DashboardShell>
  );
}
