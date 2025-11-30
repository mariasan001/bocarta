// src/features/shell/dashboardNav.ts
import type { ComponentType } from 'react';
import {
  LayoutDashboard,
  UtensilsCrossed,
  PercentCircle,
  MessageCircleMore,
  BarChart3,
  Globe2,
  MapPin,
  Users2,
  CreditCard,
  Settings,
  TicketCheck,
  Sparkles,
  Store,            // 👈 aquí sí importamos Store
} from 'lucide-react';
import type { UserRole } from '@/features/auth/types';

export type Area = 'business' | 'admin';

export type SideNavItem = {
  id: string;
  label: string;
  href: string;
  icon: ComponentType<{ size?: number }>;  // 👈 tipado bonito
  area: Area;
  roles: UserRole[];
  group?: 'main' | 'secondary';
};

export const sideNavItems: SideNavItem[] = [
  // ===== Panel negocio (/app) =====
  {
    id: 'app-home',
    label: 'Inicio',
    href: '/app',
    icon: LayoutDashboard,
    area: 'business',
    roles: ['owner', 'staff', 'viewer'],
    group: 'main',
  },
  {
    id: 'app-menu',
    label: 'Menú',
    href: '/app/menu',
    icon: UtensilsCrossed,
    area: 'business',
    roles: ['owner', 'staff', 'viewer'],
    group: 'main',
  },
  {
    id: 'app-promos',
    label: 'Promos y precios',
    href: '/app/promos',
    icon: PercentCircle,
    area: 'business',
    roles: ['owner', 'staff'],
    group: 'main',
  },
  {
    id: 'app-reviews',
    label: 'Reseñas & recompensas',
    href: '/app/resenas',
    icon: MessageCircleMore,
    area: 'business',
    roles: ['owner', 'viewer'],
    group: 'main',
  },
  {
    id: 'app-analytics',
    label: 'Analíticas',
    href: '/app/analytics',
    icon: BarChart3,
    area: 'business',
    roles: ['owner', 'viewer'],
    group: 'main',
  },
  {
    id: 'app-microsite',
    label: 'Micrositio & QR',
    href: '/app/micrositio',
    icon: Globe2,
    area: 'business',
    roles: ['owner', 'staff', 'viewer'],
    group: 'main',
  },
  {
    id: 'app-branches',
    label: 'Sucursales',
    href: '/app/sucursales',
    icon: MapPin,
    area: 'business',
    roles: ['owner'],
    group: 'secondary',
  },
  {
    id: 'app-team',
    label: 'Equipo',
    href: '/app/equipo',
    icon: Users2,
    area: 'business',
    roles: ['owner'],
    group: 'secondary',
  },
  {
    id: 'app-plan',
    label: 'Plan & facturación',
    href: '/app/plan',
    icon: CreditCard,
    area: 'business',
    roles: ['owner'],
    group: 'secondary',
  },
  {
    id: 'app-settings',
    label: 'Configuración',
    href: '/app/configuracion',
    icon: Settings,
    area: 'business',
    roles: ['owner'],
    group: 'secondary',
  },

  // ===== Panel Bocarta (/admin) =====
  {
    id: 'admin-home',
    label: 'Dashboard',
    href: '/admin',
    icon: LayoutDashboard,
    area: 'admin',
    roles: ['bocartaOwner', 'support'],
    group: 'main',
  },
  {
    id: 'admin-businesses',
    label: 'Negocios',
    href: '/admin/negocios',
    icon: Store,            // 👈 ya no hay any
    area: 'admin',
    roles: ['bocartaOwner', 'support'],
    group: 'main',
  },
  {
    id: 'admin-plans',
    label: 'Planes & precios',
    href: '/admin/planes',
    icon: Sparkles,
    area: 'admin',
    roles: ['bocartaOwner'],
    group: 'main',
  },
  {
    id: 'admin-promos',
    label: 'Promociones globales',
    href: '/admin/promociones',
    icon: PercentCircle,
    area: 'admin',
    roles: ['bocartaOwner'],
    group: 'main',
  },
  {
    id: 'admin-testimonials',
    label: 'Comentarios & testimonios',
    href: '/admin/testimonios',
    icon: MessageCircleMore,
    area: 'admin',
    roles: ['bocartaOwner'],
    group: 'secondary',
  },
  {
    id: 'admin-support',
    label: 'Soporte & tickets',
    href: '/admin/soporte',
    icon: TicketCheck,
    area: 'admin',
    roles: ['bocartaOwner', 'support'],
    group: 'main',
  },
  {
    id: 'admin-settings',
    label: 'Configuración plataforma',
    href: '/admin/configuracion',
    icon: Settings,
    area: 'admin',
    roles: ['bocartaOwner'],
    group: 'secondary',
  },
];
