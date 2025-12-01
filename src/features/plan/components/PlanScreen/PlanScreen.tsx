// src/features/plan/components/PlanScreen/PlanScreen.tsx
'use client';

import { useState } from 'react';
import {
  Layers,
  Sparkles,
  CreditCard,
  Check,
  Minus,
  ArrowRight,
  Download,
} from 'lucide-react';

import s from './PlanScreen.module.css';

type PlanId = 'entrada' | 'fuerte' | 'casaLlena';

type Plan = {
  id: PlanId;
  name: string;
  price: string;
  period: string;
  badge?: string;
  description: string;
  bestFor: string;
  features: { label: string; included: boolean; highlight?: boolean }[];
};

const PLANS: Plan[] = [
  {
    id: 'entrada',
    name: 'Plan Entrada',
    price: '$0',
    period: '/mes',
    badge: 'Ideal para empezar',
    description: 'Un menú digital sencillo para probar Bocarta sin presión.',
    bestFor: 'Negocios pequeños o pruebas.',
    features: [
      { label: '1 sucursal', included: true },
      { label: 'Hasta 40 platillos', included: true },
      { label: 'QR principal del menú', included: true },
      { label: 'Edición básica de menú', included: true },
      { label: 'Promos programadas', included: false },
      { label: 'Reseñas & recompensas', included: false },
      { label: 'Analíticas detalladas', included: false },
      { label: 'Soporte prioritario', included: false },
    ],
  },
  {
    id: 'fuerte',
    name: 'Plan Fuerte',
    price: '$399',
    period: '/mes',
    badge: 'Recomendado',
    description: 'Menú vivo, promos y reseñas. Lo que necesitas para vender más.',
    bestFor: 'Negocios en crecimiento.',
    features: [
      { label: 'Hasta 3 sucursales', included: true, highlight: true },
      { label: 'Platillos ilimitados', included: true },
      { label: 'Múltiples QRs por campaña', included: true },
      { label: 'Promos & Happy Hour', included: true, highlight: true },
      { label: 'Reseñas desde el menú digital', included: true },
      { label: 'Programas de recompensas básicos', included: true },
      { label: 'Analíticas clave de visitas', included: true },
      { label: 'Soporte regular por chat', included: true },
    ],
  },
  {
    id: 'casaLlena',
    name: 'Plan Casa Llena',
    price: '$699',
    period: '/mes',
    badge: 'Para escalar',
    description: 'Más sucursales, más campañas y todo el control de datos.',
    bestFor: 'Marcas con varias sedes.',
    features: [
      { label: 'Sucursales ilimitadas', included: true, highlight: true },
      { label: 'Platillos ilimitados', included: true },
      { label: 'QRs por zona, mesa o campaña', included: true, highlight: true },
      { label: 'Promos avanzadas & cupones', included: true },
      { label: 'Reseñas & recompensas avanzadas', included: true },
      { label: 'Analíticas detalladas', included: true, highlight: true },
      { label: 'Exportar datos', included: true },
      { label: 'Soporte prioritario', included: true },
    ],
  },
];

type InvoiceStatus = 'paid' | 'pending';

type Invoice = {
  id: string;
  date: string;
  description: string;
  amount: string;
  status: InvoiceStatus;
};

const INVOICES_MOCK: Invoice[] = [
  {
    id: 'FAC-2025-011',
    date: '15 nov 2025',
    description: 'Plan Fuerte · Noviembre 2025',
    amount: '$399.00',
    status: 'paid',
  },
  {
    id: 'FAC-2025-010',
    date: '15 oct 2025',
    description: 'Plan Fuerte · Octubre 2025',
    amount: '$399.00',
    status: 'paid',
  },
  {
    id: 'FAC-2025-009',
    date: '15 sep 2025',
    description: 'Plan Fuerte · Septiembre 2025',
    amount: '$399.00',
    status: 'paid',
  },
];

export default function PlanScreen() {
  // En esta primera versión asumimos que el negocio ya está en Plan Fuerte
  const currentPlanId: PlanId = 'fuerte';
  const [selectedPlanId, setSelectedPlanId] = useState<PlanId>(currentPlanId);

  const currentPlan = PLANS.find((p) => p.id === currentPlanId)!;
  const selectedPlan = PLANS.find((p) => p.id === selectedPlanId)!;

  const hasFounderPromo = true;

  return (
    <div className={s.layout}>
      {/* Header */}
      <header className={s.header}>
        <div className={s.headerLeft}>
          <div className={s.iconBadge}>
            <Layers size={18} />
          </div>
          <div>
            <h1 className={s.title}>Plan &amp; facturación</h1>
            <p className={s.subtitle}>
              Revisa tu plan actual, límites y facturas. Puedes ajustar tu plan cuando tu
              negocio crezca.
            </p>
          </div>
        </div>

        <div className={s.headerRight}>
          <button type="button" className={s.ghostBtn}>
            Ver cambios de plan
          </button>
          <button type="button" className={s.primaryBtn}>
            <Sparkles size={14} />
            Hablar con alguien de Bocarta
          </button>
        </div>
      </header>

      {/* Summary strip */}
      <section className={s.summaryStrip}>
        <article className={s.summaryCard}>
          <span className={s.summaryLabel}>Plan actual</span>
          <span className={s.summaryValue}>{currentPlan.name}</span>
          <span className={s.summaryNote}>
            {currentPlan.price}
            <span className={s.summaryPeriod}>{currentPlan.period}</span>
          </span>
        </article>

        <article className={s.summaryCard}>
          <span className={s.summaryLabel}>Renovación</span>
          <span className={s.summaryValue}>15 dic 2025</span>
          <span className={s.summaryNote}>Cobro automático activo</span>
        </article>

        <article className={s.summaryCard}>
          <span className={s.summaryLabel}>Estado de pagos</span>
          <span className={s.summaryValue}>Al corriente</span>
          <span className={s.summaryNote}>Última factura pagada correctamente</span>
        </article>
      </section>

      <div className={s.grid}>
        {/* Columna izquierda: comparación de planes */}
        <section className={s.main}>
          <div className={s.planCard}>
            <header className={s.planCardHeader}>
              <div>
                <h2 className={s.cardTitle}>Planes de Bocarta</h2>
                <p className={s.cardText}>
                  Compara planes y elige el que mejor se adapte a tus sucursales, promos
                  y nivel de detalle que necesitas.
                </p>
              </div>
              <div className={s.toggleHint}>
                Estás viendo:&nbsp;
                <strong>
                  {currentPlan.name} → {selectedPlan.name}
                </strong>
              </div>
            </header>

            <div className={s.plansGrid}>
              {PLANS.map((plan) => {
                const isCurrent = plan.id === currentPlanId;
                const isSelected = plan.id === selectedPlanId;
                const isUpgrade =
                  plan.id === 'casaLlena' && currentPlanId !== 'casaLlena';

                return (
                  <button
                    key={plan.id}
                    type="button"
                    className={`${s.planOption} ${
                      isSelected ? s.planOptionSelected : ''
                    } ${isCurrent ? s.planOptionCurrent : ''}`}
                    onClick={() => setSelectedPlanId(plan.id)}
                  >
                    <div className={s.planOptionHeader}>
                      <div className={s.planNameRow}>
                        <span className={s.planName}>{plan.name}</span>
                        {plan.badge && (
                          <span className={s.planBadge}>{plan.badge}</span>
                        )}
                        {isCurrent && (
                          <span className={s.currentBadge}>Plan actual</span>
                        )}
                      </div>
                      <div className={s.planPriceRow}>
                        <span className={s.planPrice}>{plan.price}</span>
                        <span className={s.planPeriod}>{plan.period}</span>
                      </div>
                      <p className={s.planDescription}>{plan.description}</p>
                      <p className={s.planBestFor}>{plan.bestFor}</p>
                    </div>

                    <ul className={s.featureList}>
                      {plan.features.map((f) => (
                        <li
                          key={f.label}
                          className={`${s.featureItem} ${
                            f.highlight ? s.featureItemHighlight : ''
                          }`}
                        >
                          <span className={s.featureIcon}>
                            {f.included ? (
                              <Check size={12} />
                            ) : (
                              <Minus size={12} />
                            )}
                          </span>
                          <span
                            className={`${s.featureLabel} ${
                              !f.included ? s.featureLabelMuted : ''
                            }`}
                          >
                            {f.label}
                          </span>
                        </li>
                      ))}
                    </ul>

                    <div className={s.planFooter}>
                      {isCurrent ? (
                        <span className={s.planFooterText}>
                          <CreditCard size={13} />
                          Actualmente estás en este plan.
                        </span>
                      ) : (
                        <span className={s.planFooterText}>
                          <ArrowRight size={13} />
                          Ver detalle para cambiar a este plan.
                        </span>
                      )}
                      {isUpgrade && (
                        <span className={s.upgradePill}>Pensado para escalar</span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* Columna derecha: promos + facturación + facturas */}
        <aside className={s.side}>
          {hasFounderPromo && (
            <section className={`${s.sideCard} ${s.promoCard}`}>
              <div className={s.sideHeader}>
                <div>
                  <h3 className={s.sideTitleSmall}>Plan Fundador</h3>
                  <p className={s.sideText}>
                    50% de descuento el primer año para los primeros negocios que se
                    activan en Bocarta.
                  </p>
                </div>
              </div>
              <div className={s.promoBody}>
                <p className={s.promoHighlight}>
                  Estás aprovechando el precio fundador en tu plan actual.
                </p>
                <p className={s.promoNote}>
                  Al cambiar de plan, el descuento se mantiene el tiempo que resta de tu
                  primer año.
                </p>
                <button type="button" className={s.secondaryBtn}>
                  Ver condiciones del Plan Fundador
                </button>
              </div>
            </section>
          )}

          <section className={s.sideCard}>
            <div className={s.sideHeader}>
              <div>
                <h3 className={s.sideTitleSmall}>Datos de facturación</h3>
                <p className={s.sideText}>
                  Revisa el correo de cobro, método de pago y tus datos fiscales.
                </p>
              </div>
            </div>

            <div className={s.billingGrid}>
              <div className={s.billingItem}>
                <span className={s.billingLabel}>Correo de facturación</span>
                <span className={s.billingValue}>facturacion@elbarrio.mx</span>
              </div>
              <div className={s.billingItem}>
                <span className={s.billingLabel}>Método de pago</span>
                <span className={s.billingValue}>Visa ···· 4242 · 08/27</span>
              </div>
              <div className={s.billingItemWide}>
                <span className={s.billingLabel}>Datos fiscales</span>
                <span className={s.billingValue}>
                  Taquería El Barrio SA de CV · RFC TEB123456XYZ
                </span>
              </div>
            </div>

            <div className={s.actionsRow}>
              <button type="button" className={s.secondaryBtn}>
                Actualizar método de pago
              </button>
              <button type="button" className={s.secondaryBtn}>
                Editar datos fiscales
              </button>
            </div>
          </section>

          <section className={s.sideCard}>
            <div className={s.sideHeader}>
              <div>
                <h3 className={s.sideTitleSmall}>Historial de facturas</h3>
                <p className={s.sideText}>
                  Descarga tus facturas en PDF cuando las necesites.
                </p>
              </div>
            </div>

            <div className={s.invoicesList}>
              {INVOICES_MOCK.map((inv) => (
                <div key={inv.id} className={s.invoiceRow}>
                  <div className={s.invoiceMain}>
                    <span className={s.invoiceId}>{inv.id}</span>
                    <span className={s.invoiceDescription}>{inv.description}</span>
                    <span className={s.invoiceDate}>{inv.date}</span>
                  </div>
                  <div className={s.invoiceRight}>
                    <span className={s.invoiceAmount}>{inv.amount}</span>
                    <span
                      className={`${s.invoiceStatus} ${
                        inv.status === 'paid' ? s.invoiceStatusPaid : s.invoiceStatusPending
                      }`}
                    >
                      {inv.status === 'paid' ? 'Pagada' : 'Pendiente'}
                    </span>
                    <button type="button" className={s.iconBtn} aria-label="Descargar PDF">
                      <Download size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </aside>
      </div>
    </div>
  );
}
