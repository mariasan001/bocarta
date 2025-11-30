// src/features/shell/DashboardShell/DashboardShell.tsx
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Bell, ChevronDown } from 'lucide-react';

import type { Area } from '../dashboardNav';
import { sideNavItems } from '../dashboardNav';
import type { UserRole } from '@/features/auth/types';

import s from './DashboardShell.module.css';

type Props = {
  area: Area;                    // 'business' | 'admin'
  role?: UserRole;               // rol actual
  userName?: string;
  businessName?: string;
  children: React.ReactNode;
};

export default function DashboardShell({
  area,
  role = 'owner',
  userName = 'Dueño Demo',
  businessName = 'Taquería El Barrio',
  children,
}: Props) {
  const pathname = usePathname();

  const nav = sideNavItems.filter(
    (item) => item.area === area && item.roles.includes(role),
  );

  const mainNav = nav.filter((i) => i.group !== 'secondary');
  const secondaryNav = nav.filter((i) => i.group === 'secondary');

  const isAdminArea = area === 'admin';

  return (
    <div className={s.shell}>
      {/* Sidebar lateral */}
      <aside className={s.sidebar}>
        <div className={s.sidebarBrand}>
          <div className={s.logoDot} />
          <div className={s.brandText}>
            <span className={s.brandName}>Bocarta</span>
            <span className={s.brandTagline}>
              {isAdminArea ? 'Panel Bocarta' : 'Panel negocio'}
            </span>
          </div>
        </div>

        {!isAdminArea && (
          <div className={s.businessBadge}>
            <span className={s.businessName}>{businessName}</span>
            <span className={s.businessRoleLabel}>{mapRoleToLabel(role)}</span>
          </div>
        )}

        <nav className={s.nav}>
          <div className={s.navGroup}>
            {mainNav.map((item) => (
              <SideNavLink
                key={item.id}
                href={item.href}
                label={item.label}
                icon={item.icon}
                active={pathname === item.href}
              />
            ))}
          </div>

          {secondaryNav.length > 0 && (
            <div className={s.navGroupSecondary}>
              <div className={s.navGroupLabel}>Administración</div>
              {secondaryNav.map((item) => (
                <SideNavLink
                  key={item.id}
                  href={item.href}
                  label={item.label}
                  icon={item.icon}
                  active={pathname === item.href}
                />
              ))}
            </div>
          )}
        </nav>

        <div className={s.sidebarFooter}>
          {isAdminArea ? (
            <p className={s.sidebarHint}>
              <span>Modo Bocarta</span>
              <span>Control de planes, negocios y soporte.</span>
            </p>
          ) : (
            <p className={s.sidebarHint}>
              <span>Tip rápido</span>
              <span>Lo que cambies aquí se refleja en tu QR al instante.</span>
            </p>
          )}
        </div>
      </aside>

      {/* Panel derecho */}
      <div className={s.main}>
        <header className={s.topbar}>
          <div className={s.topLeft}>
            <div className={s.topBreadcrumb}>
              {isAdminArea ? 'Bocarta / Dashboard' : 'Mi negocio / Panel'}
            </div>
          </div>

          <div className={s.topRight}>
            <button type="button" className={s.iconButton} aria-label="Notificaciones">
              <Bell size={16} />
              <span className={s.notificationDot} />
            </button>

            <button type="button" className={s.userChip}>
              <div className={s.avatar}>
                {getInitials(userName)}
              </div>
              <div className={s.userInfo}>
                <span className={s.userName}>{userName}</span>
                <span className={s.userRole}>{mapRoleToLabel(role)}</span>
              </div>
              <ChevronDown size={14} className={s.chevron} />
            </button>
          </div>
        </header>

        <main className={s.content}>{children}</main>
      </div>
    </div>
  );
}

/* ===== Subcomponentes ===== */

type NavLinkProps = {
  href: string;
  label: string;
  icon: React.ComponentType<{ size?: number }>;
  active?: boolean;
};

function SideNavLink({ href, label, icon: Icon, active }: NavLinkProps) {
  return (
    <Link
      href={href}
      className={`${s.navItem} ${active ? s.navItemActive : ''}`}
    >
      <span className={s.navIcon}>
        <Icon size={16} />
      </span>
      <span className={s.navLabel}>{label}</span>
    </Link>
  );
}

function getInitials(name: string): string {
  const parts = name.trim().split(' ');
  if (!parts.length) return 'B';
  if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
  return (
    parts[0].charAt(0).toUpperCase() + parts[parts.length - 1].charAt(0).toUpperCase()
  );
}

function mapRoleToLabel(role: UserRole): string {
  switch (role) {
    case 'owner':
      return 'Dueño del negocio';
    case 'staff':
      return 'Staff';
    case 'viewer':
      return 'Solo lectura';
    case 'bocartaOwner':
      return 'Owner Bocarta';
    case 'support':
      return 'Soporte Bocarta';
    default:
      return role;
  }
}


