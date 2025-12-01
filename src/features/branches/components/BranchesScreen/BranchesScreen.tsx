// src/features/branches/components/BranchesScreen/BranchesScreen.tsx
'use client';

import { useMemo, useState } from 'react';
import {
  Building2,
  MapPin,
  QrCode,
  Link2,
  Plus,
  Search,
  Wifi,
  Clock3,
  Users,
  Activity,
} from 'lucide-react';

import s from './BranchesScreen.module.css';

type BranchStatus = 'active' | 'paused' | 'comingSoon';

type Branch = {
  id: string;
  name: string;
  shortCode: string;
  isMain: boolean;
  status: BranchStatus;
  city: string;
  address: string;
  schedule: string;
  micrositeUrl: string;
  visits30d: number;
  menuItems: number;
};

const BRANCHES_MOCK: Branch[] = [
  {
    id: 'central',
    name: 'Taquería El Barrio · Centro',
    shortCode: 'centro',
    isMain: true,
    status: 'active',
    city: 'Toluca',
    address: 'Av. Hidalgo 123 · Col. Centro',
    schedule: 'Lun–Dom · 1 pm – 12 am',
    micrositeUrl: 'bocarta.app/t/taqueria-el-barrio',
    visits30d: 820,
    menuItems: 46,
  },
  {
    id: 'sonesta',
    name: 'Taquería El Barrio · Sonesta',
    shortCode: 'sonesta',
    isMain: false,
    status: 'active',
    city: 'Toluca',
    address: 'Plaza Sonesta · Local 5',
    schedule: 'Jue–Dom · 6 pm – 1 am',
    micrositeUrl: 'bocarta.app/t/taqueria-el-barrio-sonesta',
    visits30d: 340,
    menuItems: 38,
  },
  {
    id: 'metepec',
    name: 'Taquería El Barrio · Metepec',
    shortCode: 'metepec',
    isMain: false,
    status: 'comingSoon',
    city: 'Metepec',
    address: 'Av. Tecnológico · Próxima apertura',
    schedule: 'Próximamente',
    micrositeUrl: 'bocarta.app/t/taqueria-el-barrio-metepec',
    visits30d: 0,
    menuItems: 0,
  },
];

type StatusFilter = 'all' | BranchStatus;

export default function BranchesScreen() {
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');
  const [search, setSearch] = useState('');
  const [selectedId, setSelectedId] = useState<string>('central');

  const filteredBranches = useMemo(() => {
    const term = search.trim().toLowerCase();
    return BRANCHES_MOCK.filter((b) => {
      const matchesStatus = statusFilter === 'all' || b.status === statusFilter;
      const matchesSearch =
        !term ||
        b.name.toLowerCase().includes(term) ||
        b.city.toLowerCase().includes(term);
      return matchesStatus && matchesSearch;
    });
  }, [statusFilter, search]);

  const selected =
    filteredBranches.find((b) => b.id === selectedId) ?? filteredBranches[0] ?? null;

  const countActive = BRANCHES_MOCK.filter((b) => b.status === 'active').length;
  const countPaused = BRANCHES_MOCK.filter((b) => b.status === 'paused').length;
  const countComing = BRANCHES_MOCK.filter((b) => b.status === 'comingSoon').length;

  return (
    <div className={s.layout}>
      {/* Header */}
      <header className={s.header}>
        <div className={s.headerLeft}>
          <div className={s.iconBadge}>
            <Building2 size={18} />
          </div>
          <div>
            <h1 className={s.title}>Sucursales</h1>
            <p className={s.subtitle}>
              Administra todas las sedes de tu negocio: horarios, direcciones, micrositios
              y QRs. Cada sucursal puede tener su propio menú y analíticas.
            </p>
          </div>
        </div>

        <div className={s.headerRight}>
          <button type="button" className={s.ghostBtn}>
            Ver en mapa
          </button>
          <button type="button" className={s.primaryBtn}>
            <Plus size={14} />
            Nueva sucursal
          </button>
        </div>
      </header>

      {/* Resumen superior */}
      <section className={s.summaryStrip}>
        <SummaryBadge
          label="Sucursales activas"
          value={countActive}
          tone="positive"
        />
        <SummaryBadge label="Pausadas" value={countPaused} tone="neutral" />
        <SummaryBadge label="Próximamente" value={countComing} tone="soon" />
      </section>

      {/* Grid principal */}
      <div className={s.grid}>
        {/* Lista izquierda */}
        <section className={s.main}>
          <div className={s.listCard}>
            <div className={s.listHeader}>
              <div>
                <h2 className={s.cardTitle}>Listado de sucursales</h2>
                <p className={s.cardText}>
                  Elige una para ver detalles, su micrositio y accesos rápidos al QR.
                </p>
              </div>
            </div>

            {/* Filtros */}
            <div className={s.filtersRow}>
              <div className={s.statusChips}>
                <StatusChip
                  label="Todas"
                  active={statusFilter === 'all'}
                  onClick={() => setStatusFilter('all')}
                />
                <StatusChip
                  label="Activas"
                  tone="active"
                  active={statusFilter === 'active'}
                  onClick={() => setStatusFilter('active')}
                />
                <StatusChip
                  label="Pausadas"
                  tone="paused"
                  active={statusFilter === 'paused'}
                  onClick={() => setStatusFilter('paused')}
                />
                <StatusChip
                  label="Próximamente"
                  tone="soon"
                  active={statusFilter === 'comingSoon'}
                  onClick={() => setStatusFilter('comingSoon')}
                />
              </div>

              <div className={s.searchBox}>
                <Search size={14} className={s.searchIcon} />
                <input
                  type="text"
                  className={s.searchInput}
                  placeholder="Buscar por nombre o ciudad..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </div>

            {/* Lista */}
            <div className={s.branchList}>
              {filteredBranches.length === 0 && (
                <div className={s.emptyState}>
                  <p className={s.emptyTitle}>No hay sucursales con ese filtro.</p>
                  <p className={s.emptyText}>
                    Prueba limpiando la búsqueda o cambiando el estado.
                  </p>
                </div>
              )}

              {filteredBranches.map((branch) => (
                <button
                  key={branch.id}
                  type="button"
                  className={`${s.branchRow} ${
                    selected && selected.id === branch.id ? s.branchRowActive : ''
                  }`}
                  onClick={() => setSelectedId(branch.id)}
                >
                  <div className={s.branchMain}>
                    <div className={s.branchNameRow}>
                      <span className={s.branchName}>{branch.name}</span>
                      {branch.isMain && (
                        <span className={s.mainBadge}>Principal</span>
                      )}
                    </div>
                    <div className={s.branchMetaRow}>
                      <span className={s.branchCity}>{branch.city}</span>
                      <span className={s.metaSeparator}>·</span>
                      <span className={s.branchSchedule}>{branch.schedule}</span>
                    </div>
                  </div>

                  <div className={s.branchStats}>
                    <div className={s.stat}>
                      <span className={s.statLabel}>Visitas 30 días</span>
                      <span className={s.statValue}>
                        {branch.visits30d.toLocaleString('es-MX')}
                      </span>
                    </div>
                    <div className={s.stat}>
                      <span className={s.statLabel}>Platillos</span>
                      <span className={s.statValue}>{branch.menuItems}</span>
                    </div>
                    <StatusPill status={branch.status} />
                  </div>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Panel derecho: detalle */}
        <aside className={s.side}>
          {selected ? (
            <>
              <section className={s.sideCard}>
                <div className={s.sideHeader}>
                  <div>
                    <h2 className={s.sideTitle}>{selected.name}</h2>
                    <p className={s.sideText}>
                      Esta vista se conecta con el micrositio, menú y analíticas de la
                      sucursal.
                    </p>
                  </div>
                  <StatusPill status={selected.status} />
                </div>

                <div className={s.infoGrid}>
                  <div className={s.infoItem}>
                    <span className={s.infoLabel}>Ciudad</span>
                    <span className={s.infoValue}>{selected.city}</span>
                  </div>
                  <div className={s.infoItem}>
                    <span className={s.infoLabel}>Horario</span>
                    <span className={s.infoValue}>{selected.schedule}</span>
                  </div>
                  <div className={s.infoItemWide}>
                    <span className={s.infoLabel}>Dirección</span>
                    <span className={s.infoValue}>{selected.address}</span>
                  </div>
                </div>

                <div className={s.metricsRow}>
                  <MetricChip
                    icon={<Activity size={13} />}
                    label="Visitas 30 días"
                    value={selected.visits30d.toLocaleString('es-MX')}
                  />
                  <MetricChip
                    icon={<Users size={13} />}
                    label="Capacidad estimada"
                    value="40–60 personas"
                  />
                  <MetricChip
                    icon={<Wifi size={13} />}
                    label="Micrositio"
                    value={
                      selected.status === 'comingSoon'
                        ? 'En preparación'
                        : 'Publicado'
                    }
                  />
                </div>

                <div className={s.actionsRow}>
                  <button type="button" className={s.secondaryBtn}>
                    <MapPin size={14} />
                    Ver en mapa
                  </button>
                  <button type="button" className={s.secondaryBtn}>
                    <Clock3 size={14} />
                    Editar horarios
                  </button>
                </div>
              </section>

              {/* Micrositio & QR de la sucursal */}
              <section className={s.sideCard}>
                <div className={s.sideHeader}>
                  <div>
                    <h3 className={s.sideTitleSmall}>Micrositio &amp; QR</h3>
                    <p className={s.sideText}>
                      Atajo directo al micrositio de esta sucursal y su QR principal.
                    </p>
                  </div>
                </div>

                <div className={s.qrRow}>
                  <div className={s.qrPreviewBox}>
                    <div className={s.qrFake} />
                    <span className={s.qrLabel}>QR principal</span>
                  </div>

                  <div className={s.qrInfo}>
                    <div className={s.urlBox}>
                      <span className={s.urlLabel}>URL pública</span>
                      <div className={s.urlValueRow}>
                        <span className={s.urlValue}>{selected.micrositeUrl}</span>
                        <button
                          type="button"
                          className={s.iconBtn}
                          aria-label="Copiar URL"
                        >
                          <Link2 size={14} />
                        </button>
                      </div>
                    </div>

                    <div className={s.inlineRow}>
                      <button type="button" className={s.secondaryBtn}>
                        <QrCode size={14} />
                        Descargar QR
                      </button>
                      <button type="button" className={s.secondaryBtn}>
                        Ir al micrositio
                      </button>
                    </div>
                  </div>
                </div>
              </section>
            </>
          ) : (
            <section className={s.sideCard}>
              <p className={s.emptyTitle}>Selecciona una sucursal</p>
              <p className={s.emptyText}>
                El panel derecho mostrará la información completa de la sucursal que
                tengas seleccionada.
              </p>
            </section>
          )}
        </aside>
      </div>
    </div>
  );
}

/* ===== Subcomponentes internos ===== */

type StatusPillProps = {
  status: BranchStatus;
};

function StatusPill({ status }: StatusPillProps) {
  let label = 'Activa';
  if (status === 'paused') label = 'Pausada';
  if (status === 'comingSoon') label = 'Próximamente';

  return (
    <span
      className={`${s.statusPill} ${
        status === 'active'
          ? s.statusPillActive
          : status === 'paused'
          ? s.statusPillPaused
          : s.statusPillSoon
      }`}
    >
      {label}
    </span>
  );
}

type SummaryBadgeProps = {
  label: string;
  value: number;
  tone: 'positive' | 'neutral' | 'soon';
};

function SummaryBadge({ label, value, tone }: SummaryBadgeProps) {
  return (
    <div
      className={`${s.summaryBadge} ${
        tone === 'positive'
          ? s.summaryBadgePositive
          : tone === 'soon'
          ? s.summaryBadgeSoon
          : ''
      }`}
    >
      <span className={s.summaryValue}>{value}</span>
      <span className={s.summaryLabel}>{label}</span>
    </div>
  );
}

type StatusChipProps = {
  label: string;
  active: boolean;
  tone?: 'active' | 'paused' | 'soon';
  onClick: () => void;
};

function StatusChip({ label, active, tone, onClick }: StatusChipProps) {
  return (
    <button
      type="button"
      className={`${s.statusChip} ${active ? s.statusChipActive : ''} ${
        tone === 'active'
          ? s.statusChipToneActive
          : tone === 'paused'
          ? s.statusChipTonePaused
          : tone === 'soon'
          ? s.statusChipToneSoon
          : ''
      }`}
      onClick={onClick}
    >
      {label}
    </button>
  );
}

type MetricChipProps = {
  icon: React.ReactNode;
  label: string;
  value: string;
};

function MetricChip({ icon, label, value }: MetricChipProps) {
  return (
    <div className={s.metricChip}>
      <div className={s.metricIcon}>{icon}</div>
      <div className={s.metricTexts}>
        <span className={s.metricLabel}>{label}</span>
        <span className={s.metricValue}>{value}</span>
      </div>
    </div>
  );
}
