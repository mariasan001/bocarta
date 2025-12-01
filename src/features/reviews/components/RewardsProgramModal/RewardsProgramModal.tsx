// src/features/reviews/components/RewardsProgramModal/RewardsProgramModal.tsx
'use client';

import { useState, type ReactNode } from 'react';
import {
  X,
  Gift,
  UserCheck,
  CalendarRange,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  ShoppingBag,
  TicketPercent,
  MessageCircleMore,
  Star,
} from 'lucide-react';

import s from './RewardsProgramModal.module.css';

type Props = {
  open: boolean;
  onClose: () => void;
};

type Step = 1 | 2 | 3;

type ProgramKind = 'visit' | 'purchase' | 'review' | 'product';

export default function RewardsProgramModal({ open, onClose }: Props) {
  const [step, setStep] = useState<Step>(1);

  // Paso 1 – tipo + objetivo
  const [kind, setKind] = useState<ProgramKind>('visit');
  const [programName, setProgramName] = useState('Postre en la 5ª visita');
  const [goal, setGoal] = useState(
    'Premiar a clientes frecuentes de forma sencilla para el equipo.'
  );
  const [startDate, setStartDate] = useState('');
  const [noEndDate, setNoEndDate] = useState(true);
  const [endDate, setEndDate] = useState('');

  // Paso 2 – reglas por tipo
  const [visitsRequired, setVisitsRequired] = useState(5);

  const [minTicketAmount, setMinTicketAmount] = useState(300);
  const [purchasesRequired, setPurchasesRequired] = useState(3);

  const [reviewScope, setReviewScope] = useState<'any' | 'withText'>('any');

  const [productName, setProductName] = useState('Combo Pastor Night');
  const [productTimes, setProductTimes] = useState(3);

  // Recompensa
  const [rewardType, setRewardType] = useState<'dessert' | 'drink' | 'discount' | 'product'>(
    'dessert'
  );
  const [rewardLabel, setRewardLabel] = useState('1 postre gratis a elegir');
  const [discountPercent, setDiscountPercent] = useState(10);

  if (!open) return null;

  function goNext() {
    setStep((prev) => (prev === 3 ? prev : ((prev + 1) as Step)));
  }

  function goPrev() {
    setStep((prev) => (prev === 1 ? prev : ((prev - 1) as Step)));
  }

  function handleClose() {
    setStep(1);
    onClose();
  }

  const periodLabel = noEndDate || !endDate
    ? 'Sin fecha de fin'
    : `Del ${startDate || '…'} al ${endDate}`;

  return (
    <div className={s.backdrop}>
      <div
        className={s.modal}
        role="dialog"
        aria-modal="true"
        aria-labelledby="rewards-modal-title"
      >
        {/* Header */}
        <header className={s.header}>
          <div className={s.headerMain}>
            <div className={s.headerIcon}>
              <Gift size={18} />
            </div>
            <div>
              <h2 id="rewards-modal-title" className={s.title}>
                Nuevo programa de recompensas
              </h2>
              <p className={s.subtitle}>
                Diseña un programa fácil de explicar a tu equipo: por visita, por compra,
                por reseña o por producto. El conteo puede ser con tickets, tarjetas con
                sellos o notas en la cuenta.
              </p>
            </div>
          </div>

          <button
            type="button"
            className={s.closeBtn}
            onClick={handleClose}
            aria-label="Cerrar"
          >
            <X size={18} />
          </button>
        </header>

        {/* Body */}
        <div className={s.body}>
          {/* Steps laterales */}
          <aside className={s.steps}>
            <StepItem
              icon={<UserCheck size={14} />}
              label="1. Tipo & objetivo"
              description="Qué quieres lograr"
              active={step === 1}
              done={step > 1}
              onClick={() => setStep(1)}
            />
            <StepItem
              icon={<CalendarRange size={14} />}
              label="2. Reglas"
              description="Cuándo se gana"
              active={step === 2}
              done={step > 2}
              onClick={() => setStep(2)}
            />
            <StepItem
              icon={<CheckCircle2 size={14} />}
              label="3. Resumen"
              description="Vista para tu equipo"
              active={step === 3}
              done={false}
              onClick={() => setStep(3)}
            />
          </aside>

          {/* Contenido del paso */}
          <div className={s.formArea}>
            {step === 1 && (
              <StepKindAndGoal
                kind={kind}
                programName={programName}
                goal={goal}
                startDate={startDate}
                endDate={endDate}
                noEndDate={noEndDate}
                onKindChange={setKind}
                onProgramNameChange={setProgramName}
                onGoalChange={setGoal}
                onStartDateChange={setStartDate}
                onEndDateChange={setEndDate}
                onNoEndDateChange={setNoEndDate}
              />
            )}

            {step === 2 && (
              <StepRules
                kind={kind}
                visitsRequired={visitsRequired}
                minTicketAmount={minTicketAmount}
                purchasesRequired={purchasesRequired}
                reviewScope={reviewScope}
                productName={productName}
                productTimes={productTimes}
                rewardType={rewardType}
                rewardLabel={rewardLabel}
                discountPercent={discountPercent}
                onVisitsRequiredChange={setVisitsRequired}
                onMinTicketAmountChange={setMinTicketAmount}
                onPurchasesRequiredChange={setPurchasesRequired}
                onReviewScopeChange={setReviewScope}
                onProductNameChange={setProductName}
                onProductTimesChange={setProductTimes}
                onRewardTypeChange={setRewardType}
                onRewardLabelChange={setRewardLabel}
                onDiscountPercentChange={setDiscountPercent}
              />
            )}

            {step === 3 && (
              <StepSummary
                kind={kind}
                programName={programName}
                goal={goal}
                periodLabel={periodLabel}
                visitsRequired={visitsRequired}
                minTicketAmount={minTicketAmount}
                purchasesRequired={purchasesRequired}
                reviewScope={reviewScope}
                productName={productName}
                productTimes={productTimes}
                rewardType={rewardType}
                rewardLabel={rewardLabel}
                discountPercent={discountPercent}
              />
            )}
          </div>
        </div>

        {/* Footer */}
        <footer className={s.footer}>
          <button type="button" className={s.secondaryBtn} onClick={handleClose}>
            Cancelar
          </button>

          <div className={s.footerRight}>
            {step > 1 && (
              <button type="button" className={s.ghostBtn} onClick={goPrev}>
                <ArrowLeft size={14} />
                <span>Anterior</span>
              </button>
            )}

            {step < 3 && (
              <button type="button" className={s.primaryBtn} onClick={goNext}>
                <span>Continuar</span>
                <ArrowRight size={14} />
              </button>
            )}

            {step === 3 && (
              <button type="button" className={s.primaryBtn}>
                <CheckCircle2 size={16} />
                <span>Guardar programa</span>
              </button>
            )}
          </div>
        </footer>
      </div>
    </div>
  );
}

/* ============= Subcomponentes internas ============= */

type StepItemProps = {
  icon: ReactNode;
  label: string;
  description: string;
  active: boolean;
  done: boolean;
  onClick: () => void;
};

function StepItem({ icon, label, description, active, done, onClick }: StepItemProps) {
  return (
    <button
      type="button"
      className={`${s.stepItem} ${active ? s.stepItemActive : ''}`}
      onClick={onClick}
    >
      <div className={s.stepIconWrapper}>
        {done ? <CheckCircle2 size={14} className={s.stepIconDone} /> : icon}
      </div>
      <div className={s.stepTexts}>
        <span className={s.stepLabel}>{label}</span>
        <span className={s.stepDescription}>{description}</span>
      </div>
    </button>
  );
}

/* Paso 1 – Tipo & objetivo */

type StepKindAndGoalProps = {
  kind: ProgramKind;
  programName: string;
  goal: string;
  startDate: string;
  endDate: string;
  noEndDate: boolean;
  onKindChange: (k: ProgramKind) => void;
  onProgramNameChange: (v: string) => void;
  onGoalChange: (v: string) => void;
  onStartDateChange: (v: string) => void;
  onEndDateChange: (v: string) => void;
  onNoEndDateChange: (v: boolean) => void;
};

function StepKindAndGoal({
  kind,
  programName,
  goal,
  startDate,
  endDate,
  noEndDate,
  onKindChange,
  onProgramNameChange,
  onGoalChange,
  onStartDateChange,
  onEndDateChange,
  onNoEndDateChange,
}: StepKindAndGoalProps) {
  return (
    <div className={s.step}>
      <h3 className={s.stepTitle}>Tipo de programa & objetivo</h3>
      <p className={s.stepText}>
        Empieza eligiendo el tipo de programa. Más adelante podrás afinar reglas e
        instrucciones para tu equipo.
      </p>

      <div className={s.kindGrid}>
        <KindCard
          icon={<UserCheck size={16} />}
          label="Por visita"
          description="Ej. En la 5ª visita, postre gratis."
          active={kind === 'visit'}
          onClick={() => onKindChange('visit')}
        />
        <KindCard
          icon={<TicketPercent size={16} />}
          label="Por compra / ticket"
          description="Ej. Por cada $300 acumulados, 1 sello."
          active={kind === 'purchase'}
          onClick={() => onKindChange('purchase')}
        />
        <KindCard
          icon={<MessageCircleMore size={16} />}
          label="Por reseña"
          description="Ej. Deja reseña en el menú y participa."
          active={kind === 'review'}
          onClick={() => onKindChange('review')}
        />
        <KindCard
          icon={<ShoppingBag size={16} />}
          label="Por producto específico"
          description="Ej. Pide 3 veces un combo especial."
          active={kind === 'product'}
          onClick={() => onKindChange('product')}
        />
      </div>

      <div className={s.fieldGroup}>
        <label className={s.fieldLabel}>Nombre del programa</label>
        <input
          className={s.input}
          value={programName}
          onChange={(e) => onProgramNameChange(e.target.value)}
          placeholder="Ej. Postre en la 5ª visita"
        />
      </div>

      <div className={s.fieldGroup}>
        <label className={s.fieldLabel}>Objetivo</label>
        <textarea
          className={s.textarea}
          rows={3}
          value={goal}
          onChange={(e) => onGoalChange(e.target.value)}
          placeholder="Ej. Hacer que los clientes regresen más seguido y premiar a quienes participan."
        />
      </div>

      <div className={s.fieldRow}>
        <div className={s.fieldGroup}>
          <label className={s.fieldLabel}>Desde</label>
          <input
            type="date"
            className={s.input}
            value={startDate}
            onChange={(e) => onStartDateChange(e.target.value)}
          />
        </div>
        <div className={s.fieldGroup}>
          <label className={s.fieldLabel}>Hasta</label>
          <div className={s.inlineField}>
            <input
              type="date"
              className={s.input}
              value={endDate}
              onChange={(e) => onEndDateChange(e.target.value)}
              disabled={noEndDate}
            />
            <label className={s.checkbox}>
              <input
                type="checkbox"
                checked={noEndDate}
                onChange={(e) => onNoEndDateChange(e.target.checked)}
              />
              <span>Sin fecha de fin</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}

type KindCardProps = {
  icon: ReactNode;
  label: string;
  description: string;
  active: boolean;
  onClick: () => void;
};

function KindCard({ icon, label, description, active, onClick }: KindCardProps) {
  return (
    <button
      type="button"
      className={`${s.kindCard} ${active ? s.kindCardActive : ''}`}
      onClick={onClick}
    >
      <div className={s.kindIcon}>{icon}</div>
      <div className={s.kindTexts}>
        <span className={s.kindLabel}>{label}</span>
        <span className={s.kindDescription}>{description}</span>
      </div>
    </button>
  );
}

/* Paso 2 – Reglas */

type StepRulesProps = {
  kind: ProgramKind;
  visitsRequired: number;
  minTicketAmount: number;
  purchasesRequired: number;
  reviewScope: 'any' | 'withText';
  productName: string;
  productTimes: number;
  rewardType: 'dessert' | 'drink' | 'discount' | 'product';
  rewardLabel: string;
  discountPercent: number;
  onVisitsRequiredChange: (v: number) => void;
  onMinTicketAmountChange: (v: number) => void;
  onPurchasesRequiredChange: (v: number) => void;
  onReviewScopeChange: (v: 'any' | 'withText') => void;
  onProductNameChange: (v: string) => void;
  onProductTimesChange: (v: number) => void;
  onRewardTypeChange: (v: 'dessert' | 'drink' | 'discount' | 'product') => void;
  onRewardLabelChange: (v: string) => void;
  onDiscountPercentChange: (v: number) => void;
};

function StepRules({
  kind,
  visitsRequired,
  minTicketAmount,
  purchasesRequired,
  reviewScope,
  productName,
  productTimes,
  rewardType,
  rewardLabel,
  discountPercent,
  onVisitsRequiredChange,
  onMinTicketAmountChange,
  onPurchasesRequiredChange,
  onReviewScopeChange,
  onProductNameChange,
  onProductTimesChange,
  onRewardTypeChange,
  onRewardLabelChange,
  onDiscountPercentChange,
}: StepRulesProps) {
  return (
    <div className={s.step}>
      <h3 className={s.stepTitle}>Reglas del programa</h3>
      <p className={s.stepText}>
        Define qué tiene que pasar para que el cliente gane la recompensa. Tu equipo
        puede llevar el conteo con tickets, tarjetas con sellos o notas en la comanda.
      </p>

      {/* Reglas según tipo */}
      {kind === 'visit' && (
        <div className={s.fieldGroup}>
          <label className={s.fieldLabel}>Visitas necesarias</label>
          <input
            className={s.input}
            type="number"
            min={1}
            value={visitsRequired}
            onChange={(e) => onVisitsRequiredChange(Number(e.target.value) || 0)}
          />
          <p className={s.helperText}>
            Ejemplo para el staff: “Cada vez que venga el cliente y consuma, marca 1
            visita en su tarjeta. En la visita {visitsRequired}, entrega la recompensa.”
          </p>
        </div>
      )}

      {kind === 'purchase' && (
        <>
          <div className={s.fieldRow}>
            <div className={s.fieldGroup}>
              <label className={s.fieldLabel}>Monto mínimo por ticket</label>
              <input
                className={s.input}
                type="number"
                min={0}
                value={minTicketAmount}
                onChange={(e) => onMinTicketAmountChange(Number(e.target.value) || 0)}
              />
            </div>
            <div className={s.fieldGroup}>
              <label className={s.fieldLabel}>Compras necesarias</label>
              <input
                className={s.input}
                type="number"
                min={1}
                value={purchasesRequired}
                onChange={(e) => onPurchasesRequiredChange(Number(e.target.value) || 0)}
              />
            </div>
          </div>
          <p className={s.helperText}>
            Ejemplo: “Por cada ticket de más de ${minTicketAmount}, marca 1 sello. Al
            completar {purchasesRequired} sellos, entrega la recompensa.”
          </p>
        </>
      )}

      {kind === 'review' && (
        <>
          <div className={s.fieldGroup}>
            <label className={s.fieldLabel}>Qué reseñas cuentan</label>
            <div className={s.pillRow}>
              <button
                type="button"
                className={`${s.pill} ${reviewScope === 'any' ? s.pillActive : ''}`}
                onClick={() => onReviewScopeChange('any')}
              >
                Cualquier reseña desde el menú
              </button>
              <button
                type="button"
                className={`${s.pill} ${
                  reviewScope === 'withText' ? s.pillActive : ''
                }`}
                onClick={() => onReviewScopeChange('withText')}
              >
                Solo reseñas con comentario escrito
              </button>
            </div>
          </div>
          <p className={s.helperText}>
            Ejemplo: “Cuando el cliente escanee el QR y deje su reseña, revisa la
            opinión y si aplica, entrega la recompensa.”
          </p>
        </>
      )}

      {kind === 'product' && (
        <>
          <div className={s.fieldRow}>
            <div className={s.fieldGroup}>
              <label className={s.fieldLabel}>Producto o combo</label>
              <input
                className={s.input}
                value={productName}
                onChange={(e) => onProductNameChange(e.target.value)}
                placeholder="Ej. Combo Pastor Night"
              />
            </div>
            <div className={s.fieldGroup}>
              <label className={s.fieldLabel}>Veces que debe pedirse</label>
              <input
                className={s.input}
                type="number"
                min={1}
                value={productTimes}
                onChange={(e) => onProductTimesChange(Number(e.target.value) || 0)}
              />
            </div>
          </div>
          <p className={s.helperText}>
            Ejemplo: “Cada vez que pidan {productName}, marca 1 sello. Al llegar a{' '}
            {productTimes}, entrega la recompensa.”
          </p>
        </>
      )}

      {/* Recompensa (común) */}
      <div className={s.divider} />

      <h4 className={s.subTitle}>Recompensa</h4>

      <div className={s.fieldGroup}>
        <label className={s.fieldLabel}>Tipo de recompensa</label>
        <div className={s.pillRow}>
          <button
            type="button"
            className={`${s.pill} ${rewardType === 'dessert' ? s.pillActive : ''}`}
            onClick={() => {
              onRewardTypeChange('dessert');
              onRewardLabelChange('1 postre gratis a elegir');
            }}
          >
            Postre gratis
          </button>
          <button
            type="button"
            className={`${s.pill} ${rewardType === 'drink' ? s.pillActive : ''}`}
            onClick={() => {
              onRewardTypeChange('drink');
              onRewardLabelChange('1 bebida de cortesía');
            }}
          >
            Bebida de cortesía
          </button>
          <button
            type="button"
            className={`${s.pill} ${rewardType === 'discount' ? s.pillActive : ''}`}
            onClick={() => {
              onRewardTypeChange('discount');
              onRewardLabelChange(`Descuento del ${discountPercent}% en la cuenta`);
            }}
          >
            Descuento
          </button>
          <button
            type="button"
            className={`${s.pill} ${rewardType === 'product' ? s.pillActive : ''}`}
            onClick={() => {
              onRewardTypeChange('product');
              onRewardLabelChange('Producto específico del menú');
            }}
          >
            Producto del menú
          </button>
        </div>
      </div>

      {rewardType === 'discount' && (
        <div className={s.fieldGroup}>
          <label className={s.fieldLabel}>Descuento (%)</label>
          <input
            className={s.input}
            type="number"
            min={1}
            max={100}
            value={discountPercent}
            onChange={(e) => {
              const v = Number(e.target.value) || 0;
              onDiscountPercentChange(v);
              onRewardLabelChange(`Descuento del ${v}% en la cuenta`);
            }}
          />
        </div>
      )}

      <div className={s.fieldGroup}>
        <label className={s.fieldLabel}>Cómo se describe la recompensa</label>
        <input
          className={s.input}
          value={rewardLabel}
          onChange={(e) => onRewardLabelChange(e.target.value)}
          placeholder="Ej. 1 postre gratis a elegir del menú"
        />
      </div>

      <p className={s.helperText}>
        Este texto se usa como referencia interna y puede mostrarse como nota en el
        resumen del programa para tu equipo.
      </p>
    </div>
  );
}

/* Paso 3 – Resumen */

type StepSummaryProps = {
  kind: ProgramKind;
  programName: string;
  goal: string;
  periodLabel: string;
  visitsRequired: number;
  minTicketAmount: number;
  purchasesRequired: number;
  reviewScope: 'any' | 'withText';
  productName: string;
  productTimes: number;
  rewardType: 'dessert' | 'drink' | 'discount' | 'product';
  rewardLabel: string;
  discountPercent: number;
};

function StepSummary({
  kind,
  programName,
  goal,
  periodLabel,
  visitsRequired,
  minTicketAmount,
  purchasesRequired,
  reviewScope,
  productName,
  productTimes,
  rewardType,
  rewardLabel,
  discountPercent,
}: StepSummaryProps) {
  const kindText =
    kind === 'visit'
      ? 'Por visita'
      : kind === 'purchase'
      ? 'Por compra / ticket'
      : kind === 'review'
      ? 'Por reseña'
      : 'Por producto específico';

  let triggerText = '';

  if (kind === 'visit') {
    triggerText = `Se desbloquea en la visita número ${visitsRequired} registrada por tu equipo.`;
  } else if (kind === 'purchase') {
    triggerText = `Cada ticket de más de $${minTicketAmount} acumula 1 sello. Al completar ${purchasesRequired} sellos, se puede entregar la recompensa.`;
  } else if (kind === 'review') {
    triggerText =
      reviewScope === 'any'
        ? 'Cuenta cualquier reseña que el cliente deje desde el menú digital.'
        : 'Cuenta solo reseñas con comentario escrito que el cliente deje desde el menú digital.';
  } else if (kind === 'product') {
    triggerText = `Cada vez que se pida "${productName}", se marca 1 sello. Al llegar a ${productTimes}, se puede entregar la recompensa.`;
  }

  const rewardTypeText =
    rewardType === 'dessert'
      ? 'Postre gratis'
      : rewardType === 'drink'
      ? 'Bebida de cortesía'
      : rewardType === 'discount'
      ? `Descuento del ${discountPercent}%`
      : 'Producto específico del menú';

  return (
    <div className={s.step}>
      <h3 className={s.stepTitle}>Resumen del programa</h3>
      <p className={s.stepText}>
        Así se verá este programa dentro de Bocarta y cómo se lo puedes explicar a tu
        equipo para no romper el flujo del servicio.
      </p>

      <div className={s.summaryCard}>
        <div className={s.summaryHeader}>
          <div className={s.summaryIcon}>
            <Gift size={16} />
          </div>
          <div>
            <h4 className={s.summaryTitle}>{programName}</h4>
            <p className={s.summarySubtitle}>{goal}</p>
          </div>
        </div>

        <ul className={s.summaryList}>
          <li>
            <span className={s.summaryLabel}>Tipo</span>
            <span className={s.summaryValue}>{kindText}</span>
          </li>
          <li>
            <span className={s.summaryLabel}>Vigencia</span>
            <span className={s.summaryValue}>{periodLabel}</span>
          </li>
          <li>
            <span className={s.summaryLabel}>Se gana cuando…</span>
            <span className={s.summaryValue}>{triggerText}</span>
          </li>
          <li>
            <span className={s.summaryLabel}>Recompensa</span>
            <span className={s.summaryValue}>
              {rewardTypeText} — {rewardLabel}
            </span>
          </li>
        </ul>

        <p className={s.summaryHint}>
          Sugerencia para tu equipo:{' '}
          <strong>
            usa tickets, tarjetas con sellos o notas en la comanda para contar visitas y
            compras
          </strong>
          . Cuando entregues la recompensa, podrás registrarla en Bocarta para llevar
          control de los canjes.
        </p>
      </div>
    </div>
  );
}
