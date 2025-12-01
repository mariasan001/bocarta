// src/features/admin/components/AdminPromosScreen/AdminPromosScreen.tsx
'use client';

import { useState } from 'react';
import {
  Sparkles,
  PercentCircle,
  Filter,
  CalendarClock,
  Info,
  Edit2,
  PauseCircle,
  PlayCircle,
  ArrowUpRight,
  Tag,
} from 'lucide-react';

import s from './AdminPromosScreen.module.css';

type PromoStatus = 'draft' | 'active' | 'scheduled' | 'expired';

type AdminPlatformPromo = {
  id: string;
  name: string;
  status: PromoStatus;
  benefit: string;
  appliesTo: string;
  code: string;
  periodLabel: string;
  note?: string;
  redemptions: number;
};

const promosFixture: AdminPlatformPromo[] = [
  {
    id: 'founder',
    name: 'Founder Bocarta',
    status: 'active',
    benefit: '25% de descuento durante 6 meses',
    appliesTo: 'Negocios que se registran antes del lanzamiento oficial',
    code: 'FOUNDER25',
    periodLabel: 'Ene – Jun 2026',
    note: 'Se muestra en landing oficial y en el onboarding.',
    redemptions: 42,
  },
  {
    id: 'lanzamiento-local',
    name: 'Lanzamiento Edo. de México',
    status: 'scheduled',
    benefit: 'Primer mes del plan Fuerte gratis',
    appliesTo: 'Negocios con RFC de Edo. Méx.',
    code: 'FSEMEX',
    periodLabel: 'Programada · Mar – Abr 2026',
    note: 'Se activará junto con campaña de anuncios locales.',
    redemptions: 0,
  },
  {
    id: 'upgrade-annual',
    name: 'Upgrade anual',
    status: 'draft',
    benefit: '2 meses sin costo al pasar a plan anual',
    appliesTo: 'Negocios activos en plan Fuerte o Alto',
    code: 'UPANUAL2M',
    periodLabel: 'Borrador · sin fecha',
    note: 'Pensada para empujar upgrades al final del trial.',
    redemptions: 0,
  },
  {
    id: 'black-week',
    name: 'Black Week Bocarta',
    status: 'expired',
    benefit: '50% de descuento 3 meses',
    appliesTo: 'Nuevos registros durante Black Week',
    code: 'BLACKWEEK',
    periodLabel: 'Finalizada · Nov 2025',
    redemptions: 63,
  },
];

export default function AdminPromosScreen() {
  const [statusFilter, setStatusFilter] = useState<
    'all' | PromoStatus
  >('all');

  const filteredPromos =
    statusFilter === 'all'
      ? promosFixture
      : promosFixture.filter((p) => p.status === statusFilter);

  const activeCount = promosFixture.filter(
    (p) => p.status === 'active',
  ).length;
  const scheduledCount = promosFixture.filter(
    (p) => p.status === 'scheduled',
  ).length;

  return (
    <div className={s.layout}>
      {/* HEADER */}
      <div className={s.header}>
        <div className={s.headerLeft}>
          <div className={s.iconBadge}>
            <Sparkles size={18} />
          </div>
          <div>
            <h1 className={s.title}>Promociones Bocarta → negocios</h1>
            <p className={s.subtitle}>
              Diseña beneficios que Bocarta ofrece a los negocios: promos
              de fundador, meses gratis, descuentos por lanzamiento o
              upgrades. Más adelante se conectarán a la landing, onboarding
              y al panel del negocio.
            </p>
          </div>
        </div>

        <div className={s.headerActions}>
          <button type="button" className={s.primaryBtn}>
            <Sparkles size={14} />
            Nueva promoción Bocarta
          </button>
          <button type="button" className={s.ghostBtn}>
            <Filter size={13} />
            Guardar preset
          </button>
        </div>
      </div>

      {/* FILTROS DE ESTADO */}
      <div className={s.filtersRow}>
        <span className={s.filtersLabel}>Estado</span>
        <div className={s.filtersGroup}>
          <StatusChip
            label="Todas"
            status="all"
            active={statusFilter === 'all'}
            onClick={() => setStatusFilter('all')}
          />
          <StatusChip
            label="Activas"
            status="active"
            dotClass={s.dotActive}
            active={statusFilter === 'active'}
            onClick={() => setStatusFilter('active')}
          />
          <StatusChip
            label="Programadas"
            status="scheduled"
            dotClass={s.dotScheduled}
            active={statusFilter === 'scheduled'}
            onClick={() => setStatusFilter('scheduled')}
          />
          <StatusChip
            label="Borradores"
            status="draft"
            dotClass={s.dotDraft}
            active={statusFilter === 'draft'}
            onClick={() => setStatusFilter('draft')}
          />
          <StatusChip
            label="Finalizadas"
            status="expired"
            dotClass={s.dotExpired}
            active={statusFilter === 'expired'}
            onClick={() => setStatusFilter('expired')}
          />
        </div>
      </div>

      {/* GRID PRINCIPAL */}
      <div className={s.grid}>
        {/* LISTA PRINCIPAL */}
        <section className={s.main}>
          <div className={s.tableCard}>
            <div className={s.tableHeader}>
              <div>
                <h2 className={s.sectionTitle}>Promos de plataforma</h2>
                <p className={s.sectionHint}>
                  Estas promociones viven a nivel Bocarta. Más adelante
                  podrás elegir en qué canales aparecen: landing pública,
                  demo, onboarding o dentro del panel del negocio.
                </p>
              </div>
              <button type="button" className={s.subtleBtn}>
                <CalendarClock size={13} />
                Ver calendario de campañas
              </button>
            </div>

            <div className={s.tableWrapper}>
              <table className={s.table}>
                <thead className={s.thead}>
                  <tr className={s.trHead}>
                    <th className={s.th}>Promoción</th>
                    <th className={s.th}>Beneficio</th>
                    <th className={s.th}>Aplica a</th>
                    <th className={s.th}>Código / etiqueta</th>
                    <th className={s.th}>Periodo</th>
                    <th className={s.thRight}>Usos</th>
                    <th className={s.thActions} />
                  </tr>
                </thead>
                <tbody className={s.tbody}>
                  {filteredPromos.map((promo) => (
                    <tr key={promo.id} className={s.trBody}>
                      <td className={s.tdMain}>
                        <div className={s.promoTitle}>
                          <span className={s.promoName}>{promo.name}</span>
                          <span
                            className={`${s.statusBadge} ${statusClass(
                              promo.status,
                            )}`}
                          >
                            {statusLabel(promo.status)}
                          </span>
                        </div>
                        {promo.note && (
                          <div className={s.promoNote}>{promo.note}</div>
                        )}
                      </td>

                      <td className={s.td}>
                        <div className={s.benefitText}>{promo.benefit}</div>
                      </td>

                      <td className={s.td}>
                        <div className={s.appliesText}>{promo.appliesTo}</div>
                      </td>

                      <td className={s.td}>
                        <span className={s.codePill}>
                          <Tag size={12} />
                          {promo.code}
                        </span>
                      </td>

                      <td className={s.td}>
                        <span className={s.periodText}>
                          {promo.periodLabel}
                        </span>
                      </td>

                      <td className={s.tdRight}>
                        <span className={s.kpiNumber}>
                          {promo.redemptions}
                        </span>
                      </td>

                      <td className={s.tdActions}>
                        <button
                          type="button"
                          className={s.iconBtn}
                          aria-label="Editar promoción"
                        >
                          <Edit2 size={13} />
                        </button>
                        {promo.status === 'active' ? (
                          <button
                            type="button"
                            className={s.iconBtn}
                            aria-label="Pausar promoción"
                          >
                            <PauseCircle size={15} />
                          </button>
                        ) : (
                          <button
                            type="button"
                            className={s.iconBtn}
                            aria-label="Activar promoción"
                          >
                            <PlayCircle size={15} />
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}

                  {filteredPromos.length === 0 && (
                    <tr className={s.trEmpty}>
                      <td className={s.tdEmpty} colSpan={7}>
                        <div className={s.emptyState}>
                          <p className={s.emptyTitle}>
                            No hay promos con ese filtro
                          </p>
                          <p className={s.emptyText}>
                            Cambia el estado en la parte superior o crea una
                            nueva promoción Bocarta.
                          </p>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* COLUMNA LATERAL */}
        <aside className={s.side}>
          <div className={s.card}>
            <h3 className={s.cardTitle}>Resumen rápido</h3>
            <p className={s.cardText}>
              Vista editorial de cómo se está usando tu “caja de promos”
              para atraer y cuidar negocios.
            </p>

            <div className={s.cardStatsRow}>
              <div className={s.cardStat}>
                <span className={s.cardStatLabel}>Promos activas</span>
                <span className={s.cardStatValue}>{activeCount}</span>
              </div>
              <div className={s.cardStat}>
                <span className={s.cardStatLabel}>Programadas</span>
                <span className={s.cardStatValue}>{scheduledCount}</span>
              </div>
            </div>

            <ul className={s.cardList}>
              <li>
                <span className={s.cardListLabel}>Promo más usada</span>
                <span className={s.cardListValue}>Founder Bocarta</span>
              </li>
              <li>
                <span className={s.cardListLabel}>
                  Usos totales estimados
                </span>
                <span className={s.cardListValue}>105 negocios</span>
              </li>
            </ul>
          </div>

          <div className={s.card}>
            <h3 className={s.cardTitle}>Ideas de campañas</h3>
            <p className={s.cardText}>
              Más adelante, estas ideas se podrán convertir en plantillas
              que se activan con un par de clics.
            </p>

            <div className={s.templateList}>
              <button type="button" className={s.templateBtn}>
                <span>
                  Bienvenida “primera tanda”
                  <small>Founder + onboarding dedicado</small>
                </span>
                <ArrowUpRight size={14} />
              </button>

              <button type="button" className={s.templateBtn}>
                <span>
                  Campaña por ciudad
                  <small>Descuento especial según región</small>
                </span>
                <ArrowUpRight size={14} />
              </button>

              <button type="button" className={s.templateBtn}>
                <span>
                  Upgrade al plan alto
                  <small>Beneficio por pasar de básico a alto</small>
                </span>
                <ArrowUpRight size={14} />
              </button>
            </div>

            <div className={s.noteBox}>
              <Info size={13} />
              <p>
                Por ahora todo es maqueta. Cuando llegue la API podrás
                conectar cada promo con segmentos reales de negocios, canales
                y métricas de uso.
              </p>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

/* ===== Helpers ===== */

type StatusChipProps = {
  label: string;
  status: 'all' | PromoStatus;
  dotClass?: string;
  active?: boolean;
  onClick: () => void;
};

function StatusChip({
  label,
  status,
  dotClass,
  active,
  onClick,
}: StatusChipProps) {
  return (
    <button
      type="button"
      className={`${s.statusChip} ${
        active ? s.statusChipActive : ''
      }`}
      onClick={onClick}
    >
      {status !== 'all' && (
        <span className={`${s.statusDot} ${dotClass ?? ''}`} />
      )}
      <span>{label}</span>
    </button>
  );
}

function statusLabel(status: PromoStatus): string {
  switch (status) {
    case 'active':
      return 'Activa';
    case 'scheduled':
      return 'Programada';
    case 'draft':
      return 'Borrador';
    case 'expired':
      return 'Finalizada';
  }
}

function statusClass(status: PromoStatus): string {
  switch (status) {
    case 'active':
      return s.statusBadgeActive;
    case 'scheduled':
      return s.statusBadgeScheduled;
    case 'draft':
      return s.statusBadgeDraft;
    case 'expired':
      return s.statusBadgeExpired;
  }
}
