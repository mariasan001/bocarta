// src/features/team/components/TeamScreen/TeamScreen.tsx
'use client';

import { useMemo, useState } from 'react';
import {
  Users,
  UserPlus,
  ShieldCheck,
  Search,
  Mail,
  Coffee,
  UserCircle2,
  PauseCircle,
  CheckCircle2,
} from 'lucide-react';

import s from './TeamScreen.module.css';

type RoleId = 'owner' | 'staff' | 'viewer';
type MemberStatus = 'active' | 'invited' | 'suspended';

type Member = {
  id: string;
  name: string;
  email: string;
  role: RoleId;
  status: MemberStatus;
  branches: string[];
  lastActive: string;
  joinedAt: string;
};

type RoleFilter = 'all' | RoleId;
type StatusFilter = 'all' | MemberStatus;

const MEMBERS_MOCK: Member[] = [
  {
    id: 'm1',
    name: 'Ana López',
    email: 'ana@elbarrio.mx',
    role: 'owner',
    status: 'active',
    branches: ['Centro', 'Sonesta'],
    lastActive: 'Hoy · 13:24',
    joinedAt: 'Hace 8 meses',
  },
  {
    id: 'm2',
    name: 'Carlos Pérez',
    email: 'carlos@elbarrio.mx',
    role: 'staff',
    status: 'active',
    branches: ['Centro'],
    lastActive: 'Ayer · 22:10',
    joinedAt: 'Hace 3 meses',
  },
  {
    id: 'm3',
    name: 'Lucía Martínez',
    email: 'lucia@elbarrio.mx',
    role: 'viewer',
    status: 'active',
    branches: ['Todas'],
    lastActive: 'Hace 5 días',
    joinedAt: 'Hace 1 año',
  },
  {
    id: 'm4',
    name: 'Invitado cocina noche',
    email: 'turnonoche@elbarrio.mx',
    role: 'staff',
    status: 'invited',
    branches: ['Sonesta'],
    lastActive: '—',
    joinedAt: 'Invitado hace 2 días',
  },
];

export default function TeamScreen() {
  const [roleFilter, setRoleFilter] = useState<RoleFilter>('all');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');
  const [search, setSearch] = useState('');
  const [selectedId, setSelectedId] = useState<string>('m1');

  const counts = useMemo(() => {
    const owners = MEMBERS_MOCK.filter((m) => m.role === 'owner').length;
    const staff = MEMBERS_MOCK.filter((m) => m.role === 'staff').length;
    const viewers = MEMBERS_MOCK.filter((m) => m.role === 'viewer').length;
    return { owners, staff, viewers };
  }, []);

  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase();
    return MEMBERS_MOCK.filter((m) => {
      const matchRole = roleFilter === 'all' || m.role === roleFilter;
      const matchStatus = statusFilter === 'all' || m.status === statusFilter;
      const matchTerm =
        !term ||
        m.name.toLowerCase().includes(term) ||
        m.email.toLowerCase().includes(term);
      return matchRole && matchStatus && matchTerm;
    });
  }, [roleFilter, statusFilter, search]);

  const selected =
    filtered.find((m) => m.id === selectedId) ?? filtered[0] ?? null;

  return (
    <div className={s.layout}>
      {/* Header */}
      <header className={s.header}>
        <div className={s.headerLeft}>
          <div className={s.iconBadge}>
            <Users size={18} />
          </div>
          <div>
            <h1 className={s.title}>Equipo</h1>
            <p className={s.subtitle}>
              Invita a tu equipo, asigna roles y controla quién puede editar menú, ver
              analíticas o tocar facturación.
            </p>
          </div>
        </div>

        <div className={s.headerRight}>
          <button type="button" className={s.ghostBtn}>
            <ShieldCheck size={14} />
            Configurar permisos por rol
          </button>
          <button type="button" className={s.primaryBtn}>
            <UserPlus size={14} />
            Invitar a alguien
          </button>
        </div>
      </header>

      {/* Resumen de roles */}
      <section className={s.summaryStrip}>
        <SummaryCard
          label="Owners"
          value={counts.owners}
          description="Acceso completo, incluida facturación."
        />
        <SummaryCard
          label="Staff"
          value={counts.staff}
          description="Operan menú, promos y servicio."
        />
        <SummaryCard
          label="Viewers"
          value={counts.viewers}
          description="Solo lectura de datos clave."
        />
      </section>

      {/* Grid principal */}
      <div className={s.grid}>
        {/* Lista izquierda */}
        <section className={s.main}>
          <div className={s.listCard}>
            <div className={s.listHeader}>
              <div>
                <h2 className={s.cardTitle}>Miembros del equipo</h2>
                <p className={s.cardText}>
                  Invita a tu staff y socios para que usen Bocarta sin compartir
                  contraseñas.
                </p>
              </div>
            </div>

            {/* Filtros */}
            <div className={s.filtersRow}>
              <div className={s.filterGroup}>
                <span className={s.filterLabel}>Rol</span>
                <FilterChip
                  label="Todos"
                  active={roleFilter === 'all'}
                  onClick={() => setRoleFilter('all')}
                />
                <FilterChip
                  label="Owners"
                  active={roleFilter === 'owner'}
                  onClick={() => setRoleFilter('owner')}
                />
                <FilterChip
                  label="Staff"
                  active={roleFilter === 'staff'}
                  onClick={() => setRoleFilter('staff')}
                />
                <FilterChip
                  label="Viewers"
                  active={roleFilter === 'viewer'}
                  onClick={() => setRoleFilter('viewer')}
                />
              </div>

              <div className={s.filterGroup}>
                <span className={s.filterLabel}>Estado</span>
                <FilterChip
                  label="Todos"
                  active={statusFilter === 'all'}
                  onClick={() => setStatusFilter('all')}
                />
                <FilterChip
                  label="Activos"
                  active={statusFilter === 'active'}
                  onClick={() => setStatusFilter('active')}
                />
                <FilterChip
                  label="Invitados"
                  active={statusFilter === 'invited'}
                  onClick={() => setStatusFilter('invited')}
                />
                <FilterChip
                  label="Suspendidos"
                  active={statusFilter === 'suspended'}
                  onClick={() => setStatusFilter('suspended')}
                />
              </div>

              <div className={s.searchBox}>
                <Search size={14} className={s.searchIcon} />
                <input
                  type="text"
                  className={s.searchInput}
                  placeholder="Buscar por nombre o correo…"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </div>

            {/* Lista */}
            <div className={s.memberList}>
              {filtered.length === 0 && (
                <div className={s.emptyState}>
                  <p className={s.emptyTitle}>No hay personas con ese filtro.</p>
                  <p className={s.emptyText}>
                    Prueba cambiando los filtros o limpia la búsqueda.
                  </p>
                </div>
              )}

              {filtered.map((m) => (
                <button
                  key={m.id}
                  type="button"
                  className={`${s.memberRow} ${
                    selected && selected.id === m.id ? s.memberRowActive : ''
                  }`}
                  onClick={() => setSelectedId(m.id)}
                >
                  <div className={s.memberMain}>
                    <div className={s.memberNameRow}>
                      <span className={s.memberName}>{m.name}</span>
                      <RolePill role={m.role} />
                    </div>
                    <div className={s.memberEmailRow}>
                      <span className={s.memberEmail}>{m.email}</span>
                    </div>
                    <div className={s.memberMetaRow}>
                      <span className={s.branchLabel}>
                        {m.branches.join(' · ')}
                      </span>
                      <span className={s.metaSeparator}>·</span>
                      <span className={s.metaSmall}>{m.joinedAt}</span>
                    </div>
                  </div>

                  <div className={s.memberRight}>
                    <StatusPill status={m.status} />
                    <span className={s.lastActive}>{m.lastActive}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Panel derecho: detalle miembro */}
        <aside className={s.side}>
          {selected ? (
            <>
              <section className={s.sideCard}>
                <div className={s.sideHeader}>
                  <div className={s.userIdentity}>
                    <div className={s.avatar}>
                      <UserCircle2 size={26} />
                    </div>
                    <div>
                      <h2 className={s.sideTitle}>{selected.name}</h2>
                      <p className={s.sideText}>{selected.email}</p>
                    </div>
                  </div>
                  <RolePill role={selected.role} />
                </div>

                <div className={s.infoGrid}>
                  <div className={s.infoItem}>
                    <span className={s.infoLabel}>Estado</span>
                    <span className={s.infoValue}>
                      <StatusText status={selected.status} />
                    </span>
                  </div>
                  <div className={s.infoItem}>
                    <span className={s.infoLabel}>Última actividad</span>
                    <span className={s.infoValue}>{selected.lastActive}</span>
                  </div>
                  <div className={s.infoItemWide}>
                    <span className={s.infoLabel}>Sucursales</span>
                    <span className={s.infoValue}>{selected.branches.join(', ')}</span>
                  </div>
                </div>

                <div className={s.actionsRow}>
                  <button type="button" className={s.secondaryBtn}>
                    <Mail size={14} />
                    Reenviar invitación
                  </button>
                  <button type="button" className={s.secondaryBtn}>
                    <Coffee size={14} />
                    Cambiar a Staff
                  </button>
                </div>
              </section>

              {/* Permisos resumen */}
              <section className={s.sideCard}>
                <div className={s.sideHeader}>
                  <div>
                    <h3 className={s.sideTitleSmall}>Permisos principales</h3>
                    <p className={s.sideText}>
                      Esto refleja lo que puede hacer este rol dentro del panel.
                    </p>
                  </div>
                </div>

                <div className={s.permsList}>
                  <PermRow
                    label="Menú y categorías"
                    description="Ver y editar platillos, fotos y descripciones."
                    allowed={selected.role !== 'viewer'}
                  />
                  <PermRow
                    label="Promos y precios"
                    description="Crear, pausar y editar promociones."
                    allowed={selected.role === 'owner' || selected.role === 'staff'}
                  />
                  <PermRow
                    label="Reseñas & recompensas"
                    description="Responder reseñas y configurar programas."
                    allowed={selected.role === 'owner' || selected.role === 'staff'}
                  />
                  <PermRow
                    label="Analíticas"
                    description="Ver métricas de visitas y platillos."
                    allowed={true}
                  />
                  <PermRow
                    label="Plan & facturación"
                    description="Cambiar plan, ver facturas y pagos."
                    allowed={selected.role === 'owner'}
                  />
                  <PermRow
                    label="Administrar equipo"
                    description="Invitar, suspender o cambiar roles."
                    allowed={selected.role === 'owner'}
                  />
                </div>
              </section>

              {/* Invitaciones rápidas */}
              <section className={s.sideCard}>
                <div className={s.sideHeader}>
                  <div>
                    <h3 className={s.sideTitleSmall}>Invitaciones rápidas</h3>
                    <p className={s.sideText}>
                      Plantillas de invitación típicas para tu tipo de negocio.
                    </p>
                  </div>
                </div>
                <div className={s.templatesList}>
                  <InviteTemplate
                    label="Turno de cocina"
                    description="Ideal para quien solo necesita actualizar menú y promos."
                  />
                  <InviteTemplate
                    label="Socio / inversionista"
                    description="Solo lectura de analíticas y estado del menú."
                  />
                  <InviteTemplate
                    label="Gerente de sucursal"
                    description="Control limitado de una sucursal específica."
                  />
                </div>
              </section>
            </>
          ) : (
            <section className={s.sideCard}>
              <p className={s.emptyTitle}>Selecciona a alguien del equipo</p>
              <p className={s.emptyText}>
                Aquí verás su rol, permisos y accesos rápidos para editarlo.
              </p>
            </section>
          )}
        </aside>
      </div>
    </div>
  );
}

/* ===== Subcomponentes internos ===== */

type SummaryCardProps = {
  label: string;
  value: number;
  description: string;
};

function SummaryCard({ label, value, description }: SummaryCardProps) {
  return (
    <article className={s.summaryCard}>
      <span className={s.summaryValue}>{value}</span>
      <span className={s.summaryLabel}>{label}</span>
      <span className={s.summaryDescription}>{description}</span>
    </article>
  );
}

type FilterChipProps = {
  label: string;
  active: boolean;
  onClick: () => void;
};

function FilterChip({ label, active, onClick }: FilterChipProps) {
  return (
    <button
      type="button"
      className={`${s.filterChip} ${active ? s.filterChipActive : ''}`}
      onClick={onClick}
    >
      {label}
    </button>
  );
}

type RolePillProps = {
  role: RoleId;
};

function RolePill({ role }: RolePillProps) {
  let label = 'Owner';
  if (role === 'staff') label = 'Staff';
  if (role === 'viewer') label = 'Viewer';

  return <span className={s.rolePill}>{label}</span>;
}

type MemberStatusPillProps = {
  status: MemberStatus;
};

function StatusPill({ status }: MemberStatusPillProps) {
  return (
    <span
      className={`${s.statusPill} ${
        status === 'active'
          ? s.statusPillActive
          : status === 'invited'
          ? s.statusPillInvited
          : s.statusPillSuspended
      }`}
    >
      {status === 'active' && 'Activo'}
      {status === 'invited' && 'Invitado'}
      {status === 'suspended' && 'Suspendido'}
    </span>
  );
}

type StatusTextProps = {
  status: MemberStatus;
};

function StatusText({ status }: StatusTextProps) {
  if (status === 'active') return <>Activo</>;
  if (status === 'invited') return <>Invitación pendiente</>;
  return <>Suspendido</>;
}

type PermRowProps = {
  label: string;
  description: string;
  allowed: boolean;
};

function PermRow({ label, description, allowed }: PermRowProps) {
  return (
    <div className={s.permRow}>
      <div className={s.permTexts}>
        <span className={s.permLabel}>{label}</span>
        <span className={s.permDescription}>{description}</span>
      </div>
      <div
        className={`${s.permBadge} ${
          allowed ? s.permBadgeAllowed : s.permBadgeDenied
        }`}
      >
        {allowed ? (
          <>
            <CheckCircle2 size={12} />
            Permitido
          </>
        ) : (
          <>
            <PauseCircle size={12} />
            No permitido
          </>
        )}
      </div>
    </div>
  );
}

type InviteTemplateProps = {
  label: string;
  description: string;
};

function InviteTemplate({ label, description }: InviteTemplateProps) {
  return (
    <button type="button" className={s.inviteTemplate}>
      <div className={s.inviteIcon}>
        <UserPlus size={14} />
      </div>
      <div className={s.inviteTexts}>
        <span className={s.inviteLabel}>{label}</span>
        <span className={s.inviteDescription}>{description}</span>
      </div>
    </button>
  );
}
