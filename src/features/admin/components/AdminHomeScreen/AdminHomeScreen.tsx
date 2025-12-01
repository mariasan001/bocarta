// src/features/admin/components/AdminHomeScreen/AdminHomeScreen.tsx
'use client';

import {
  LayoutDashboard,
  Building2,
  CreditCard,
  Sparkles,
  AlertTriangle,
  PercentCircle,
  Clock3,
  ArrowUpRight,
  ArrowDownRight,
} from 'lucide-react';
import s from './AdminHomeScreen.module.css';

const kpis = [
  {
    id: 'active',
    label: 'Negocios activos',
    value: 42,
    chip: 'En producción',
    trend: '+8 este mes',
    trendType: 'up' as const,
  },
  {
    id: 'mrr',
    label: 'MRR estimado',
    value: '$23,450',
    chip: 'MXN / mes',
    trend: '+12% vs mes anterior',
    trendType: 'up' as const,
  },
  {
    id: 'usage',
    label: 'Uso del producto',
    value: '78%',
    chip: 'Funciones clave usadas',
    trend: 'Menú & promos son lo más usado',
    trendType: 'neutral' as const,
  },
];

const usageBreakdown = [
  { label: 'Menú digital & QR', value: 92 },
  { label: 'Promos y precios', value: 74 },
  { label: 'Reseñas & recompensas', value: 39 },
  { label: 'Analíticas', value: 56 },
];

const recentActivity = [
  {
    id: 1,
    title: 'Nuevo negocio activado',
    subtitle: 'Taquería La Esquina · Plan Fuerte',
    time: 'hace 2 h',
    badge: 'Alta',
  },
  {
    id: 2,
    title: 'Negocio en riesgo de churn',
    subtitle: 'Cafetería Luna · 7 días sin actualizar menú',
    time: 'hace 5 h',
    badge: 'Riesgo',
  },
  {
    id: 3,
    title: 'Promo global aplicada',
    subtitle: 'Plan Fundador · 50% OFF primeros 15 negocios',
    time: 'ayer',
    badge: 'Campaña',
  },
];

const ticketsSummary = {
  open: 7,
  today: 3,
  slaRisk: 2,
};

export default function AdminHomeScreen() {
  return (
    <div className={s.layout}>
      {/* Header */}
      <header className={s.header}>
        <div className={s.headerLeft}>
          <div className={s.iconBadge}>
            <LayoutDashboard size={16} />
          </div>
          <div>
            <h1 className={s.title}>Dashboard de Bocarta</h1>
            <p className={s.subtitle}>
              Vista general de negocios, ingresos y uso del producto. Perfecto para
              decidir el siguiente movimiento.
            </p>
          </div>
        </div>

        <div className={s.headerActions}>
          <button type="button" className={s.ghostBtn}>
            Últimos 30 días
          </button>
          <button type="button" className={s.primaryBtn}>
            <Sparkles size={14} />
            Ver oportunidades
          </button>
        </div>
      </header>

      {/* KPIs */}
      <section className={s.kpiGrid}>
        {kpis.map((kpi) => (
          <article key={kpi.id} className={s.kpiCard}>
            <div className={s.kpiHeader}>
              <span className={s.kpiLabel}>{kpi.label}</span>
              <span className={s.kpiChip}>{kpi.chip}</span>
            </div>
            <div className={s.kpiValueRow}>
              <span className={s.kpiValue}>{kpi.value}</span>
              <span
                className={`${s.kpiTrend} ${
                  kpi.trendType === 'up'
                    ? s.kpiTrendUp
                    : kpi.trendType === 'down'
                    ? s.kpiTrendDown
                    : ''
                }`}
              >
                {kpi.trendType === 'up' && <ArrowUpRight size={14} />}
                {kpi.trendType === 'down' && <ArrowDownRight size={14} />}
                {kpi.trend}
              </span>
            </div>
            <div className={s.kpiBarTrack}>
              <div className={s.kpiBarFill} />
            </div>
          </article>
        ))}
      </section>

      {/* Grid principal */}
      <section className={s.mainGrid}>
        {/* Columna izquierda: actividad + negocios */}
        <div className={s.mainCol}>
          <article className={s.card}>
            <div className={s.cardHeader}>
              <div className={s.cardTitleRow}>
                <Building2 size={16} />
                <h2 className={s.cardTitle}>Actividad reciente de negocios</h2>
              </div>
              <span className={s.cardPill}>Últimas 24 h</span>
            </div>

            <ul className={s.activityList}>
              {recentActivity.map((item) => (
                <li key={item.id} className={s.activityItem}>
                  <div className={s.activityMain}>
                    <p className={s.activityTitle}>{item.title}</p>
                    <p className={s.activitySubtitle}>{item.subtitle}</p>
                  </div>
                  <div className={s.activityMeta}>
                    <span className={s.activityBadge}>{item.badge}</span>
                    <span className={s.activityTime}>{item.time}</span>
                  </div>
                </li>
              ))}
            </ul>
          </article>

          <article className={s.card}>
            <div className={s.cardHeader}>
              <div className={s.cardTitleRow}>
                <CreditCard size={16} />
                <h2 className={s.cardTitle}>MRR & facturación rápida</h2>
              </div>
              <span className={s.cardPillMuted}>Demo estática</span>
            </div>

            <div className={s.mrrGrid}>
              <div>
                <p className={s.mrrLabel}>MRR actual</p>
                <p className={s.mrrValue}>$23,450 MXN</p>
                <p className={s.mrrHint}>+12% vs mes anterior</p>
              </div>
              <div className={s.mrrDivider} />
              <div>
                <p className={s.mrrLabel}>Próximos cobros</p>
                <p className={s.mrrValueSmall}>18 negocios este mes</p>
                <p className={s.mrrHint}>4 en riesgo por pago rechazado</p>
              </div>
            </div>
          </article>
        </div>

        {/* Columna derecha: uso + soporte + atajos */}
        <div className={s.sideCol}>
          <article className={s.card}>
            <div className={s.cardHeader}>
              <div className={s.cardTitleRow}>
                <PercentCircle size={16} />
                <h2 className={s.cardTitle}>Uso del producto</h2>
              </div>
              <span className={s.cardPill}>Por módulo</span>
            </div>

            <ul className={s.usageList}>
              {usageBreakdown.map((item) => (
                <li key={item.label} className={s.usageItem}>
                  <div className={s.usageLabelRow}>
                    <span className={s.usageLabel}>{item.label}</span>
                    <span className={s.usageValue}>{item.value}%</span>
                  </div>
                  <div className={s.usageBarTrack}>
                    <div
                      className={s.usageBarFill}
                      style={{ width: `${item.value}%` }}
                    />
                  </div>
                </li>
              ))}
            </ul>
          </article>

          <article className={s.card}>
            <div className={s.cardHeader}>
              <div className={s.cardTitleRow}>
                <Clock3 size={16} />
                <h2 className={s.cardTitle}>Soporte & tickets</h2>
              </div>
              <span className={s.cardPillMuted}>Resumen rápido</span>
            </div>

            <div className={s.ticketsRow}>
              <div className={s.ticketStat}>
                <span className={s.ticketNumber}>{ticketsSummary.open}</span>
                <span className={s.ticketLabel}>Abiertos</span>
              </div>
              <div className={s.ticketStat}>
                <span className={s.ticketNumber}>{ticketsSummary.today}</span>
                <span className={s.ticketLabel}>Ingresaron hoy</span>
              </div>
              <div className={s.ticketStat}>
                <span className={s.ticketNumberWarning}>
                  {ticketsSummary.slaRisk}
                </span>
                <span className={s.ticketLabel}>Riesgo SLA</span>
              </div>
            </div>

            <p className={s.ticketHint}>
              Prioriza negocios con tickets críticos y poco uso del menú.
            </p>
          </article>

          <article className={s.card}>
            <div className={s.cardHeader}>
              <div className={s.cardTitleRow}>
                <Sparkles size={16} />
                <h2 className={s.cardTitle}>Atajos rápidos</h2>
              </div>
            </div>

            <div className={s.quickActions}>
              <button type="button" className={s.quickBtn}>
                <AlertTriangle size={14} />
                Ver negocios en riesgo
              </button>
              <button type="button" className={s.quickBtn}>
                <PercentCircle size={14} />
                Crear promo global
              </button>
              <button type="button" className={s.quickBtn}>
                <Building2 size={14} />
                Ver negocios en trial
              </button>
            </div>
          </article>
        </div>
      </section>
    </div>
  );
}
