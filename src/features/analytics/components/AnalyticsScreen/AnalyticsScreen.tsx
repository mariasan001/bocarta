// src/features/analytics/components/AnalyticsScreen/AnalyticsScreen.tsx
'use client';

import { useState } from 'react';
import {
  Activity,
  CalendarRange,
  Clock3,
  UtensilsCrossed,
  Star,
  Users,
  BarChart3,
  MapPin,
} from 'lucide-react';

import s from './AnalyticsScreen.module.css';

type RangeId = '7d' | '30d' | '90d';

type VisitsByDay = { label: string; value: number };
type VisitsByHour = { hour: string; value: number };
type TopDish = { name: string; views: number; orders: number; rating: number };
type SourceStat = { label: string; value: number; percent: number };

const MOCK_SUMMARY = {
  totalVisits: 1240,
  uniqueScans: 870,
  avgRating: 4.6,
  repeatRate: 42, // %
};

const MOCK_VISITS_BY_DAY: VisitsByDay[] = [
  { label: 'Lun', value: 150 },
  { label: 'Mar', value: 180 },
  { label: 'Mié', value: 210 },
  { label: 'Jue', value: 195 },
  { label: 'Vie', value: 260 },
  { label: 'Sáb', value: 310 },
  { label: 'Dom', value: 235 },
];

const MOCK_VISITS_BY_HOUR: VisitsByHour[] = [
  { hour: '13:00', value: 25 },
  { hour: '14:00', value: 40 },
  { hour: '15:00', value: 32 },
  { hour: '20:00', value: 70 },
  { hour: '21:00', value: 85 },
  { hour: '22:00', value: 64 },
];

const MOCK_TOP_DISHES: TopDish[] = [
  { name: 'Taco pastor doble', views: 520, orders: 310, rating: 4.8 },
  { name: 'Gringa de arrachera', views: 420, orders: 240, rating: 4.7 },
  { name: 'Volcán mixto', views: 310, orders: 190, rating: 4.5 },
  { name: 'Agua de jamaica', views: 280, orders: 210, rating: 4.6 },
];

const MOCK_SOURCES: SourceStat[] = [
  { label: 'En mesa (QR en la mesa)', value: 780, percent: 63 },
  { label: 'En barra / mostrador', value: 280, percent: 23 },
  { label: 'Cartel externo / redes', value: 180, percent: 14 },
];

export default function AnalyticsScreen() {
  const [range, setRange] = useState<RangeId>('30d');

  return (
    <div className={s.layout}>
      {/* Header */}
      <header className={s.header}>
        <div className={s.headerLeft}>
          <div className={s.iconBadge}>
            <Activity size={18} />
          </div>
          <div>
            <h1 className={s.title}>Analíticas</h1>
            <p className={s.subtitle}>
              Mira cómo se mueve tu menú digital: visitas por día y horario, platillos
              estrella y desde dónde escanean tus clientes.
            </p>
          </div>
        </div>

        <div className={s.headerRight}>
          <div className={s.rangeGroup}>
            <span className={s.rangeLabel}>
              <CalendarRange size={14} />
              Rango
            </span>
            <RangeChip
              label="7 días"
              active={range === '7d'}
              onClick={() => setRange('7d')}
            />
            <RangeChip
              label="30 días"
              active={range === '30d'}
              onClick={() => setRange('30d')}
            />
            <RangeChip
              label="90 días"
              active={range === '90d'}
              onClick={() => setRange('90d')}
            />
          </div>
        </div>
      </header>

      {/* Resumen de arriba */}
      <section className={s.summaryStrip}>
        <SummaryCard
          icon={<BarChart3 size={16} />}
          label="Visitas al menú"
          value={MOCK_SUMMARY.totalVisits.toLocaleString('es-MX')}
          hint="Veces que alguien abrió tu menú digital."
        />
        <SummaryCard
          icon={<Users size={16} />}
          label="Clientes únicos"
          value={MOCK_SUMMARY.uniqueScans.toLocaleString('es-MX')}
          hint="Dispositivos distintos que escanearon tu QR."
        />
        <SummaryCard
          icon={<Star size={16} />}
          label="Rating promedio"
          value={MOCK_SUMMARY.avgRating.toFixed(1)}
          hint="Promedio de reseñas en Bocarta."
        />
        <SummaryCard
          icon={<Activity size={16} />}
          label="Clientes que regresan"
          value={`${MOCK_SUMMARY.repeatRate}%`}
          hint="Visitas de personas que ya habían escaneado antes."
        />
      </section>

      {/* Grid principal */}
      <div className={s.grid}>
        <main className={s.main}>
          {/* Visitas por día */}
          <section className={s.card}>
            <div className={s.cardHeader}>
              <div>
                <h2 className={s.cardTitle}>Visitas por día</h2>
                <p className={s.cardText}>
                  Cómo se comporta tu menú a lo largo de la semana.
                </p>
              </div>
            </div>

            <div className={s.chartRow}>
              {MOCK_VISITS_BY_DAY.map((d) => {
                const max = Math.max(...MOCK_VISITS_BY_DAY.map((x) => x.value));
                const height = (d.value / max) * 100;

                return (
                  <div key={d.label} className={s.dayColumn}>
                    <div className={s.dayBarWrapper}>
                      <div
                        className={s.dayBar}
                        style={{ height: `${height || 5}%` }}
                      />
                    </div>
                    <span className={s.dayValue}>{d.value}</span>
                    <span className={s.dayLabel}>{d.label}</span>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Horarios pico + platillos estrella */}
          <section className={s.twoCols}>
            {/* Horarios pico */}
            <div className={s.card}>
              <div className={s.cardHeader}>
                <div>
                  <h2 className={s.cardTitle}>Horarios pico</h2>
                  <p className={s.cardText}>
                    En qué horas tus clientes más revisan el menú.
                  </p>
                </div>
                <Clock3 size={16} className={s.cardIconSoft} />
              </div>

              <div className={s.hourList}>
                {MOCK_VISITS_BY_HOUR.map((h) => (
                  <div key={h.hour} className={s.hourRow}>
                    <span className={s.hourLabel}>{h.hour}</span>
                    <div className={s.hourBarTrack}>
                      <div
                        className={s.hourBarFill}
                        style={{ width: `${h.value}%` }}
                      />
                    </div>
                    <span className={s.hourValue}>{h.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Platillos estrella */}
            <div className={s.card}>
              <div className={s.cardHeader}>
                <div>
                  <h2 className={s.cardTitle}>Platillos estrella</h2>
                  <p className={s.cardText}>
                    Lo que más se consulta y más se pide desde tu menú.
                  </p>
                </div>
                <UtensilsCrossed size={16} className={s.cardIconSoft} />
              </div>

              <div className={s.table}>
                <div className={`${s.tableRow} ${s.tableHead}`}>
                  <span>Platillo</span>
                  <span>Vistas</span>
                  <span>Pedidos aprox.</span>
                  <span>Rating</span>
                </div>

                {MOCK_TOP_DISHES.map((d) => (
                  <div key={d.name} className={s.tableRow}>
                    <span className={s.dishName}>{d.name}</span>
                    <span className={s.mono}>{d.views}</span>
                    <span className={s.mono}>{d.orders}</span>
                    <span className={s.ratingCell}>
                      <Star size={12} className={s.starIcon} />
                      {d.rating.toFixed(1)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </main>

        {/* Aside derecho */}
        <aside className={s.side}>
          {/* Desde dónde escanean */}
          <section className={s.card}>
            <div className={s.cardHeader}>
              <div>
                <h2 className={s.cardTitle}>¿Desde dónde escanean?</h2>
                <p className={s.cardText}>
                  Esto te ayuda a decidir dónde colocar más QRs o campañas.
                </p>
              </div>
              <MapPin size={16} className={s.cardIconSoft} />
            </div>

            <div className={s.sourceList}>
              {MOCK_SOURCES.map((sItem) => (
                <div key={sItem.label} className={s.sourceRow}>
                  <span className={s.sourceLabel}>{sItem.label}</span>
                  <div className={s.sourceRight}>
                    <span className={s.sourcePercent}>{sItem.percent}%</span>
                    <div className={s.sourceBarTrack}>
                      <div
                        className={s.sourceBarFill}
                        style={{ width: `${sItem.percent}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Nota estratégica */}
          <section className={s.card}>
            <h2 className={s.cardTitle}>Ideas rápidas</h2>
            <p className={s.cardText}>
              Usa estas métricas como brújula, no como castigo 😌. Algunas ideas:
            </p>
            <ul className={s.bulletList}>
              <li>
                Refuerza promos en los horarios donde el menú está más quieto.
              </li>
              <li>
                Prueba fotos y descripción distinta en platillos con muchas vistas
                pero pocos pedidos.
              </li>
              <li>
                Si casi todo viene de QR en mesa, prueba un QR extra en barra o en la
                entrada para captar gente que espera.
              </li>
            </ul>
          </section>
        </aside>
      </div>
    </div>
  );
}

/* ===== subcomponents ===== */

type SummaryCardProps = {
  icon: React.ReactNode;
  label: string;
  value: string;
  hint: string;
};

function SummaryCard({ icon, label, value, hint }: SummaryCardProps) {
  return (
    <article className={s.summaryCard}>
      <div className={s.summaryIcon}>{icon}</div>
      <div className={s.summaryTexts}>
        <span className={s.summaryLabel}>{label}</span>
        <span className={s.summaryValue}>{value}</span>
        <span className={s.summaryHint}>{hint}</span>
      </div>
    </article>
  );
}

type RangeChipProps = {
  label: string;
  active: boolean;
  onClick: () => void;
};

function RangeChip({ label, active, onClick }: RangeChipProps) {
  return (
    <button
      type="button"
      className={`${s.rangeChip} ${active ? s.rangeChipActive : ''}`}
      onClick={onClick}
    >
      {label}
    </button>
  );
}
