'use client';

import { useState } from 'react';
import {
  Sparkles,
  ExternalLink,
  Edit2,
  Copy,
  Info,
  ArrowUpRight,
  CheckCircle2,
  CircleOff,
} from 'lucide-react';

import s from './AdminPlansScreen.module.css';

type BillingPeriod = 'monthly' | 'yearly';

type AdminPlan = {
  id: string;
  name: string;
  status: 'active' | 'hidden' | 'upcoming';
  tag?: string;
  recommended?: boolean;
  description: string;
  priceMonthly: number;
  priceYearly: number;
  included: string[];
  limits: string;
  businessesActive: number;
  mrr: number; // MRR estimado en MXN
};

const plansFixture: AdminPlan[] = [
  {
    id: 'entrada',
    name: 'Plan Entrada',
    status: 'active',
    tag: 'Gratis',
    description: 'Para probar Bocarta en un solo negocio sin fricción.',
    priceMonthly: 0,
    priceYearly: 0,
    included: [
      '1 negocio',
      'Menú digital ilimitado',
      'Micrositio básico',
      'QR estático',
    ],
    limits: 'Sin soporte prioritario ni analíticas avanzadas.',
    businessesActive: 42,
    mrr: 0,
  },
  {
    id: 'fuerte',
    name: 'Plan Fuerte',
    status: 'active',
    tag: 'Más vendido',
    recommended: true,
    description: 'Para negocios que quieren vender más con promos y analíticas.',
    priceMonthly: 249,
    priceYearly: 2390,
    included: [
      'Hasta 3 negocios',
      'Promos por horario y happy hour',
      'Analíticas de visitas y platillos estrella',
      'Reseñas desde el menú digital',
      'Soporte prioritario por chat',
    ],
    limits: 'Límite sugerido de 5,000 visitas mensuales por micrositio.',
    businessesActive: 63,
    mrr: 63 * 249,
  },
  {
    id: 'casa-llena',
    name: 'Casa Llena',
    status: 'upcoming',
    tag: 'Pro',
    description: 'Pensado para cadenas y grupos con varias sucursales.',
    priceMonthly: 490,
    priceYearly: 4690,
    included: [
      'Negocios ilimitados',
      'Sucursales ilimitadas',
      'Reportes exportables',
      'Soporte dedicado',
    ],
    limits: 'Aún en beta, activación manual por el equipo Bocarta.',
    businessesActive: 7,
    mrr: 7 * 490,
  },
];

const currencyFmt = new Intl.NumberFormat('es-MX', {
  style: 'currency',
  currency: 'MXN',
  maximumFractionDigits: 0,
});

export default function AdminPlansScreen() {
  const [billing, setBilling] = useState<BillingPeriod>('monthly');

  return (
    <div className={s.layout}>
      {/* Header */}
      <div className={s.header}>
        <div className={s.headerLeft}>
          <div className={s.iconBadge}>
            <Sparkles size={18} />
          </div>
          <div>
            <h1 className={s.title}>Planes & precios</h1>
            <p className={s.subtitle}>
              Define cuánto cuesta Bocarta, qué incluye cada plan y cómo se
              muestran en la landing. Esta vista es solo para el equipo Bocarta.
            </p>
          </div>
        </div>

        <div className={s.headerActions}>
          <button type="button" className={s.primaryBtn}>
            <Sparkles size={14} />
            Nuevo plan
          </button>
          <button type="button" className={s.ghostBtn}>
            <ExternalLink size={13} />
            Ver en landing
          </button>
        </div>
      </div>

      {/* Toggle mensual / anual */}
      <div className={s.billingRow}>
        <span className={s.billingLabel}>Mostrar precios en</span>
        <div className={s.billingToggle}>
          <button
            type="button"
            className={`${s.billingOption} ${
              billing === 'monthly' ? s.billingOptionActive : ''
            }`}
            onClick={() => setBilling('monthly')}
          >
            Mensual
          </button>
          <button
            type="button"
            className={`${s.billingOption} ${
              billing === 'yearly' ? s.billingOptionActive : ''
            }`}
            onClick={() => setBilling('yearly')}
          >
            Anual <span className={s.billingBadge}>-20%</span>
          </button>
        </div>
      </div>

      {/* Grid principal */}
      <div className={s.grid}>
        {/* Columna principal: cards de planes */}
        <section className={s.main}>
          <div className={s.sectionHeader}>
            <h2 className={s.sectionTitle}>Planes actuales</h2>
            <p className={s.sectionHint}>
              Estos son los planes visibles en la landing y asignables a cada
              negocio. Más adelante podrás editar precios y límites desde aquí.
            </p>
          </div>

          <div className={s.plansGrid}>
            {plansFixture.map((plan) => {
              const price =
                billing === 'monthly'
                  ? plan.priceMonthly
                  : plan.priceYearly;
              const suffix = billing === 'monthly' ? '/mes' : '/año';

              return (
                <article
                  key={plan.id}
                  className={`${s.planCard} ${
                    plan.recommended ? s.planCardRecommended : ''
                  }`}
                >
                  <div className={s.planHeader}>
                    <div className={s.planNameRow}>
                      <div>
                        <h3 className={s.planName}>{plan.name}</h3>
                        <p className={s.planDescription}>
                          {plan.description}
                        </p>
                      </div>
                      {plan.tag && (
                        <span className={s.planTag}>{plan.tag}</span>
                      )}
                    </div>

                    <div className={s.planStatusRow}>
                      <span
                        className={`${s.statusChip} ${
                          plan.status === 'active'
                            ? s.statusActive
                            : plan.status === 'hidden'
                            ? s.statusHidden
                            : s.statusUpcoming
                        }`}
                      >
                        {plan.status === 'active' && (
                          <>
                            <CheckCircle2 size={12} />
                            Activo
                          </>
                        )}
                        {plan.status === 'hidden' && (
                          <>
                            <CircleOff size={12} />
                            Oculto
                          </>
                        )}
                        {plan.status === 'upcoming' && (
                          <>
                            <ArrowUpRight size={12} />
                            Próximo
                          </>
                        )}
                      </span>
                    </div>
                  </div>

                  <div className={s.priceBlock}>
                    {price === 0 ? (
                      <div className={s.priceRow}>
                        <span className={s.priceNumber}>Gratis</span>
                        <span className={s.priceSuffix}>para siempre</span>
                      </div>
                    ) : (
                      <div className={s.priceRow}>
                        <span className={s.priceNumber}>
                          {currencyFmt.format(price)}
                        </span>
                        <span className={s.priceSuffix}>{suffix}</span>
                      </div>
                    )}
                    {plan.id === 'fuerte' && (
                      <p className={s.priceHint}>
                        Sugerido como plan por defecto en la landing.
                      </p>
                    )}
                  </div>

                  <div className={s.featuresBlock}>
                    <div className={s.featuresList}>
                      {plan.included.map((item) => (
                        <span key={item} className={s.featurePill}>
                          {item}
                        </span>
                      ))}
                    </div>
                    <p className={s.limitsText}>{plan.limits}</p>
                  </div>

                  <div className={s.metricsRow}>
                    <div className={s.metric}>
                      <span className={s.metricLabel}>Negocios activos</span>
                      <span className={s.metricValue}>
                        {plan.businessesActive}
                      </span>
                    </div>
                    <div className={s.metric}>
                      <span className={s.metricLabel}>MRR estimado</span>
                      <span className={s.metricValue}>
                        {currencyFmt.format(plan.mrr)}
                      </span>
                    </div>
                  </div>

                  <div className={s.cardFooter}>
                    <div className={s.cardFooterLeft}>
                      <button type="button" className={s.cardPrimaryBtn}>
                        <Edit2 size={13} />
                        Editar plan
                      </button>
                      <button type="button" className={s.cardGhostBtn}>
                        <Copy size={13} />
                        Duplicar
                      </button>
                    </div>
                    <button type="button" className={s.cardTextBtn}>
                      Ver negocios en este plan
                    </button>
                  </div>
                </article>
              );
            })}
          </div>

          {/* Bloque de cambios programados (placeholder) */}
          <section className={s.changesSection}>
            <div className={s.changesHeader}>
              <h3 className={s.changesTitle}>Cambios de precio programados</h3>
              <span className={s.changesBadge}>Próximamente</span>
            </div>
            <p className={s.changesText}>
              Aquí verás ajustes de precio agendados (por ejemplo, cambios el
              1.º de enero) antes de que se apliquen. También podrás revertir
              o pausar una actualización antes de la fecha efectiva.
            </p>
          </section>
        </section>

        {/* Columna lateral */}
        <aside className={s.side}>
          <div className={s.card}>
            <h3 className={s.cardTitle}>Resumen de ingresos</h3>
            <p className={s.cardText}>
              Vista rápida del comportamiento de tus planes actuales.
            </p>

            <div className={s.cardStatsRow}>
              <div className={s.cardStat}>
                <span className={s.cardStatLabel}>MRR total</span>
                <span className={s.cardStatValue}>
                  {currencyFmt.format(
                    plansFixture.reduce((acc, p) => acc + p.mrr, 0),
                  )}
                </span>
              </div>
              <div className={s.cardStat}>
                <span className={s.cardStatLabel}>Planes de pago</span>
                <span className={s.cardStatValue}>
                  {
                    plansFixture.filter(
                      (p) => p.priceMonthly > 0 && p.status === 'active',
                    ).length
                  }
                </span>
              </div>
            </div>

            <ul className={s.cardList}>
              <li>
                <span className={s.cardListLabel}>% en plan gratis</span>
                <span className={s.cardListValue}>~40%</span>
              </li>
              <li>
                <span className={s.cardListLabel}>Ticket medio por negocio</span>
                <span className={s.cardListValue}>
                  {currencyFmt.format(260)}
                </span>
              </li>
            </ul>
          </div>

          <div className={s.card}>
            <h3 className={s.cardTitle}>Controles rápidos</h3>
            <p className={s.cardText}>
              Ajustes ligeros que afectan cómo se ven los planes en la landing.
            </p>

            <div className={s.toggleGroup}>
              <button type="button" className={`${s.toggle} ${s.toggleOn}`}>
                Mostrar etiqueta “Plan Fundador”
              </button>
              <button type="button" className={s.toggle}>
                Permitir trials ilimitados en Plan Entrada
              </button>
              <button type="button" className={s.toggle}>
                Destacar Casa Llena para negocios con +3 sucursales
              </button>
            </div>

            <div className={s.noteBox}>
              <Info size={13} />
              <p>
                Más adelante, estos cambios se conectarán a la API para que el
                marketing de Bocarta pueda lanzar campañas sin tocar código.
              </p>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
