// src/features/admin/components/AdminBusinessesScreen/AdminBusinessesScreen.tsx
'use client';

import { useMemo, useState } from 'react';
import {
  Store,
  Search,
  Filter,
  ArrowUpRight,
  ArrowDownRight,
  ExternalLink,
  Eye,
  AlertTriangle,
} from 'lucide-react';

import s from './AdminBusinessesScreen.module.css';

type BusinessStatus = 'active' | 'trial' | 'paused' | 'cancelled';

type BusinessPlan = 'Entrada' | 'Fuerte' | 'Casa Llena' | 'Fundador';

type Business = {
  id: string;
  name: string;
  plan: BusinessPlan;
  status: BusinessStatus;
  usage: number; // 0-100
  city: string;
  domain: string;
  ticketsOpen: number;
  lastActivity: string;
  branches: number;
  atRisk?: boolean;
};

const businessesMock: Business[] = [
  {
    id: 'nb-001',
    name: 'Taquería El Barrio',
    plan: 'Fuerte',
    status: 'active',
    usage: 92,
    city: 'CDMX · Narvarte',
    domain: 'bocarta.app/el-barrio',
    ticketsOpen: 1,
    lastActivity: 'hace 2 h',
    branches: 2,
  },
  {
    id: 'nb-002',
    name: 'Cafetería Luna',
    plan: 'Entrada',
    status: 'trial',
    usage: 48,
    city: 'Toluca · Centro',
    domain: 'bocarta.app/cafeteria-luna',
    ticketsOpen: 2,
    lastActivity: 'hace 5 h',
    branches: 1,
    atRisk: true,
  },
  {
    id: 'nb-003',
    name: 'Bar Nocturno Alba',
    plan: 'Casa Llena',
    status: 'active',
    usage: 81,
    city: 'CDMX · Roma Norte',
    domain: 'bocarta.app/alba-bar',
    ticketsOpen: 0,
    lastActivity: 'ayer',
    branches: 1,
  },
  {
    id: 'nb-004',
    name: 'Food Truck La Vuelta',
    plan: 'Fundador',
    status: 'paused',
    usage: 33,
    city: 'Puebla',
    domain: 'bocarta.app/la-vuelta',
    ticketsOpen: 1,
    lastActivity: 'hace 3 días',
    branches: 1,
    atRisk: true,
  },
  {
    id: 'nb-005',
    name: 'Heladería Bruma',
    plan: 'Entrada',
    status: 'cancelled',
    usage: 0,
    city: 'Querétaro',
    domain: 'bocarta.app/heladeria-bruma',
    ticketsOpen: 0,
    lastActivity: 'hace 1 mes',
    branches: 1,
  },
];

const statusChips: { id: 'all' | BusinessStatus; label: string }[] = [
  { id: 'all', label: 'Todos' },
  { id: 'active', label: 'Activos' },
  { id: 'trial', label: 'Trial' },
  { id: 'paused', label: 'Pausados' },
  { id: 'cancelled', label: 'Cancelados' },
];

const planChips: { id: 'all' | BusinessPlan; label: string }[] = [
  { id: 'all', label: 'Todos los planes' },
  { id: 'Entrada', label: 'Entrada' },
  { id: 'Fuerte', label: 'Fuerte' },
  { id: 'Casa Llena', label: 'Casa Llena' },
  { id: 'Fundador', label: 'Fundador' },
];

export default function AdminBusinessesScreen() {
  const [statusFilter, setStatusFilter] = useState<'all' | BusinessStatus>('all');
  const [planFilter, setPlanFilter] = useState<'all' | BusinessPlan>('all');
  const [q, setQ] = useState('');

  const filtered = useMemo(() => {
    return businessesMock.filter((b) => {
      if (statusFilter !== 'all' && b.status !== statusFilter) return false;
      if (planFilter !== 'all' && b.plan !== planFilter) return false;

      const term = q.trim().toLowerCase();
      if (!term) return true;

      return (
        b.name.toLowerCase().includes(term) ||
        b.city.toLowerCase().includes(term) ||
        b.domain.toLowerCase().includes(term)
      );
    });
  }, [statusFilter, planFilter, q]);

  const total = businessesMock.length;
  const active = businessesMock.filter((b) => b.status === 'active').length;
  const trial = businessesMock.filter((b) => b.status === 'trial').length;
  const atRisk = businessesMock.filter((b) => b.atRisk).length;

  return (
    <div className={s.layout}>
      {/* Header */}
      <header className={s.header}>
        <div className={s.headerLeft}>
          <div className={s.iconBadge}>
            <Store size={16} />
          </div>
          <div>
            <h1 className={s.title}>Negocios en Bocarta</h1>
            <p className={s.subtitle}>
              Administra todos los negocios, revisa su estado, uso del producto y entra
              en “ver como cliente” cuando haga falta.
            </p>
          </div>
        </div>

        <div className={s.headerActions}>
          <button type="button" className={s.ghostBtn}>
            <Filter size={14} />
            Guardar vista
          </button>
          <button type="button" className={s.primaryBtn}>
            <ArrowUpRight size={14} />
            Ver negocios en riesgo
          </button>
        </div>
      </header>

      {/* Resumen arriba */}
      <section className={s.summaryRow}>
        <div className={s.summaryCard}>
          <span className={s.summaryLabel}>Total negocios</span>
          <div className={s.summaryValueRow}>
            <span className={s.summaryValue}>{total}</span>
          </div>
          <p className={s.summaryHint}>Incluye activos, trial y cancelados.</p>
        </div>

        <div className={s.summaryCard}>
          <span className={s.summaryLabel}>Activos</span>
          <div className={s.summaryValueRow}>
            <span className={s.summaryValue}>{active}</span>
            <span className={`${s.trend} ${s.trendUp}`}>
              <ArrowUpRight size={13} />
              Creciendo
            </span>
          </div>
          <p className={s.summaryHint}>Usan menú, promos o micrositio.</p>
        </div>

        <div className={s.summaryCard}>
          <span className={s.summaryLabel}>En trial</span>
          <div className={s.summaryValueRow}>
            <span className={s.summaryValue}>{trial}</span>
          </div>
          <p className={s.summaryHint}>Buena oportunidad para onboarding.</p>
        </div>

        <div className={s.summaryCard}>
          <span className={s.summaryLabel}>En riesgo</span>
          <div className={s.summaryValueRow}>
            <span className={s.summaryValueWarning}>{atRisk}</span>
          </div>
          <p className={s.summaryHint}>Poco uso o tickets sensibles.</p>
        </div>
      </section>

      {/* Filtros */}
      <section className={s.filtersBar}>
        <div className={s.filtersLeft}>
          <div className={s.filtersGroup}>
            <span className={s.filtersLabel}>Estado</span>
            <div className={s.chipsRow}>
              {statusChips.map((chip) => (
                <button
                  key={chip.id}
                  type="button"
                  onClick={() => setStatusFilter(chip.id as any)}
                  className={`${s.chip} ${
                    statusFilter === chip.id ? s.chipActive : ''
                  }`}
                >
                  {chip.label}
                </button>
              ))}
            </div>
          </div>

          <div className={s.filtersGroup}>
            <span className={s.filtersLabel}>Plan</span>
            <div className={s.chipsRow}>
              {planChips.map((chip) => (
                <button
                  key={chip.id}
                  type="button"
                  onClick={() => setPlanFilter(chip.id as any)}
                  className={`${s.chip} ${
                    planFilter === chip.id ? s.chipActive : ''
                  }`}
                >
                  {chip.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className={s.filtersRight}>
          <div className={s.searchBox}>
            <Search size={14} className={s.searchIcon} />
            <input
              type="text"
              placeholder="Buscar por nombre, ciudad o dominio…"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              className={s.searchInput}
            />
          </div>
        </div>
      </section>

      {/* Tabla */}
      <section className={s.tableWrapper}>
        <table className={s.table}>
          <thead>
            <tr>
              <th className={s.thNegocio}>Negocio</th>
              <th>Plan</th>
              <th>Estado</th>
              <th>Uso</th>
              <th>Sucursales</th>
              <th>Último movimiento</th>
              <th>Tickets</th>
              <th className={s.thActions}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((b) => (
              <tr key={b.id} className={b.atRisk ? s.rowAtRisk : ''}>
                <td className={s.tdNegocio}>
                  <div className={s.businessMain}>
                    <span className={s.businessName}>{b.name}</span>
                    <span className={s.businessMeta}>
                      {b.city} · {b.domain}
                    </span>
                  </div>
                </td>
                <td>
                  <span className={s.planBadge}>{b.plan}</span>
                </td>
                <td>
                  <BusinessStatusPill status={b.status} />
                </td>
                <td>
                  <div className={s.usageCell}>
                    <span className={s.usageValue}>{b.usage}%</span>
                    <div className={s.usageTrack}>
                      <div
                        className={s.usageFill}
                        style={{ width: `${b.usage}%` }}
                      />
                    </div>
                  </div>
                </td>
                <td>
                  <span className={s.branchesValue}>{b.branches}</span>
                </td>
                <td>
                  <span className={s.movement}>{b.lastActivity}</span>
                </td>
                <td>
                  {b.ticketsOpen > 0 ? (
                    <span className={s.ticketsBadge}>
                      {b.ticketsOpen} abierto{b.ticketsOpen > 1 ? 's' : ''}
                    </span>
                  ) : (
                    <span className={s.ticketsEmpty}>Sin tickets</span>
                  )}
                </td>
                <td className={s.tdActions}>
                  <button type="button" className={s.actionBtn}>
                    <Eye size={14} />
                    Ver negocio
                  </button>
                  <button type="button" className={s.actionGhostBtn}>
                    <ExternalLink size={13} />
                    Ver como cliente
                  </button>
                </td>
              </tr>
            ))}

            {filtered.length === 0 && (
              <tr>
                <td colSpan={8} className={s.emptyCell}>
                  <p className={s.emptyTitle}>No se encontraron negocios</p>
                  <p className={s.emptyText}>
                    Ajusta los filtros o limpia el buscador para ver todos los
                    negocios nuevamente.
                  </p>
                </td>
              </tr>
            )}
          </tbody>
        </table>

        <p className={s.tableHint}>
          Tip: combina “Estado = Trial” con “Uso &lt; 50%” (en un futuro) para detectar
          quién necesita una llamada de onboarding.
        </p>
      </section>
    </div>
  );
}

function BusinessStatusPill({ status }: { status: BusinessStatus }) {
  let label = '';
  let className = '';

  switch (status) {
    case 'active':
      label = 'Activo';
      className = s.statusActive;
      break;
    case 'trial':
      label = 'Trial';
      className = s.statusTrial;
      break;
    case 'paused':
      label = 'Pausado';
      className = s.statusPaused;
      break;
    case 'cancelled':
      label = 'Cancelado';
      className = s.statusCancelled;
      break;
    default:
      label = status;
  }

  return (
    <span className={`${s.statusPill} ${className}`}>
      {status === 'paused' || status === 'cancelled' ? (
        <AlertTriangle size={11} className={s.statusIcon} />
      ) : null}
      {label}
    </span>
  );
}
