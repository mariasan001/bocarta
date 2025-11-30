'use client';

import {
  Sparkles,
  PercentCircle,
  Clock,
  Calendar,
  GripVertical,
  PauseCircle,
  PlayCircle,
  ArrowUp,
  ArrowDown,
  Plus,
  History,
  BadgePercent,
} from 'lucide-react';

import { usePromosState } from '../../hooks/usePromosState';
import type { Promo, PromoStatus, PromoType } from '../../types';

import s from './PromosScreen.module.css';

export default function PromosScreen() {
  const {
    filteredPromos,
    promos,
    statusFilter,
    typeFilter,
    setStatus,
    setType,
    togglePause,
    movePromo,
  } = usePromosState();

  const activeCount = promos.filter((p) => p.status === 'active').length;
  const scheduledCount = promos.filter((p) => p.status === 'scheduled').length;

  return (
    <div className={s.layout}>
      {/* Header */}
      <header className={s.header}>
        <div>
          <h1 className={s.title}>Promos y precios</h1>
          <p className={s.subtitle}>
            Configura Happy Hour, descuentos y combos sin perder el control de tus precios
            base. Todo lo que cambies aquí se refleja en tu menú digital en segundos.
          </p>
        </div>

        <div className={s.headerActions}>
          <button type="button" className={s.ghostBtn}>
            <History size={16} />
            <span>Historial de cambios de precios</span>
          </button>
          <button type="button" className={s.primaryBtn}>
            <Plus size={16} />
            <span>Nueva promo</span>
          </button>
        </div>
      </header>

      <div className={s.grid}>
        {/* Columna principal: tabla de promos */}
        <section className={s.main}>
          {/* Filtros superiores */}
          <div className={s.filtersBar}>
            <div className={s.filtersGroup}>
              <span className={s.filtersLabel}>Estado</span>
              <StatusChip
                active={statusFilter === 'all'}
                label="Todas"
                onClick={() => setStatus('all')}
              />
              <StatusChip
                active={statusFilter === 'active'}
                label="Activas"
                status="active"
                onClick={() => setStatus('active')}
              />
              <StatusChip
                active={statusFilter === 'scheduled'}
                label="Programadas"
                status="scheduled"
                onClick={() => setStatus('scheduled')}
              />
              <StatusChip
                active={statusFilter === 'paused'}
                label="Pausadas"
                status="paused"
                onClick={() => setStatus('paused')}
              />
              <StatusChip
                active={statusFilter === 'finished'}
                label="Finalizadas"
                status="finished"
                onClick={() => setStatus('finished')}
              />
            </div>

            <div className={s.filtersGroup}>
              <span className={s.filtersLabel}>Tipo</span>
              <TypeChip
                active={typeFilter === 'all'}
                label="Todos"
                onClick={() => setType('all')}
              />
              <TypeChip
                active={typeFilter === 'happyHour'}
                icon={<Clock size={13} />}
                label="Happy Hour"
                onClick={() => setType('happyHour')}
              />
              <TypeChip
                active={typeFilter === 'discount'}
                icon={<PercentCircle size={13} />}
                label="Descuento"
                onClick={() => setType('discount')}
              />
              <TypeChip
                active={typeFilter === 'twoForOne'}
                icon={<BadgePercent size={13} />}
                label="2x1 / promos"
                onClick={() => setType('twoForOne')}
              />
              <TypeChip
                active={typeFilter === 'combo'}
                icon={<Sparkles size={13} />}
                label="Combos"
                onClick={() => setType('combo')}
              />
            </div>
          </div>

          {/* Tabla */}
          <div className={s.table}>
            <div className={s.tableHeader}>
              <span className={s.thName}>Promo</span>
              <span className={s.thScope}>Aplica en</span>
              <span className={s.thSchedule}>Horario</span>
              <span className={s.thDiscount}>Descuento</span>
              <span className={s.thStatus}>Estado</span>
              <span className={s.thActions}>Acciones</span>
            </div>

            <div className={s.tableBody}>
              {filteredPromos.map((promo, index) => (
                <PromoRow
                  key={promo.id}
                  promo={promo}
                  isFirst={index === 0}
                  isLast={index === filteredPromos.length - 1}
                  onMoveUp={() => movePromo(promo.id, 'up')}
                  onMoveDown={() => movePromo(promo.id, 'down')}
                  onTogglePause={() => togglePause(promo.id)}
                />
              ))}

              {filteredPromos.length === 0 && (
                <div className={s.emptyState}>
                  <p className={s.emptyTitle}>No hay promos con estos filtros</p>
                  <p className={s.emptyText}>
                    Cambia el estado o el tipo para ver otras promociones.
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Sidecards */}
        <aside className={s.side}>
          <section className={s.card}>
            <h2 className={s.cardTitle}>Resumen de promos</h2>
            <ul className={s.summaryList}>
              <li>
                <span className={s.summaryLabel}>Promos activas ahora</span>
                <span className={s.summaryValue}>{activeCount}</span>
              </li>
              <li>
                <span className={s.summaryLabel}>Programadas próximas</span>
                <span className={s.summaryValue}>{scheduledCount}</span>
              </li>
              <li>
                <span className={s.summaryLabel}>Capas de promo activas</span>
                <span className={s.summaryValue}>{promos.length}</span>
              </li>
            </ul>
          </section>

          <section className={s.card}>
            <h2 className={s.cardTitle}>Hoy en tu menú</h2>
            <p className={s.cardText}>
              Un vistazo rápido de cómo se verán tus precios hoy a lo largo del día.
            </p>

            <div className={s.timeline}>
              <div className={s.timelineHeader}>
                <span>17:00</span>
                <span>19:30</span>
              </div>
              <div className={s.timelineBar}>
                <div className={s.timelineSegmentActive} />
              </div>
              <p className={s.timelineHint}>
                Happy Hour Tacos · -20% en tacos &mdash; se cruza con precios base que
                configuraste en Menú.
              </p>
            </div>

            <div className={s.noteBox}>
              <Calendar size={14} />
              <span>
                Recuerda: las promos nunca cambian tu precio base, solo aplican reglas
                encima. Así no pierdes el control de tu carta.
              </span>
            </div>
          </section>
        </aside>
      </div>
    </div>
  );
}

/* ===== Subcomponentes ===== */

type StatusChipProps = {
  active: boolean;
  label: string;
  status?: PromoStatus;
  onClick: () => void;
};

function StatusChip({ active, label, status, onClick }: StatusChipProps) {
  return (
    <button
      type="button"
      className={`${s.statusChip} ${active ? s.statusChipActive : ''}`}
      onClick={onClick}
    >
      <span className={`${s.statusDot} ${status ? s[`statusDot_${status}`] : ''}`} />
      <span>{label}</span>
    </button>
  );
}

type TypeChipProps = {
  active: boolean;
  label: string;
  icon?: React.ReactNode;
  onClick: () => void;
};

function TypeChip({ active, label, icon, onClick }: TypeChipProps) {
  return (
    <button
      type="button"
      className={`${s.typeChip} ${active ? s.typeChipActive : ''}`}
      onClick={onClick}
    >
      {icon}
      <span>{label}</span>
    </button>
  );
}

type PromoRowProps = {
  promo: Promo;
  isFirst: boolean;
  isLast: boolean;
  onMoveUp: () => void;
  onMoveDown: () => void;
  onTogglePause: () => void;
};

function PromoRow({
  promo,
  isFirst,
  isLast,
  onMoveUp,
  onMoveDown,
  onTogglePause,
}: PromoRowProps) {
  const isActive = promo.status === 'active';
  const isPaused = promo.status === 'paused';
  const isScheduled = promo.status === 'scheduled';
  const isFinished = promo.status === 'finished';

  return (
    <div className={`${s.row} ${promo.highlight ? s.rowHighlight : ''}`}>
      <div className={s.tdName}>
        <button
          type="button"
          className={s.dragHandle}
          aria-label="Reordenar prioridad de promo"
          disabled={isFirst && isLast}
        >
          <GripVertical size={14} />
        </button>
        <div className={s.nameContent}>
          <div className={s.nameLine}>
            <span className={s.rowName}>{promo.name}</span>
            <span className={`${s.typeBadge} ${s[`typeBadge_${promo.type}`]}`}>
              {mapTypeIcon(promo.type)}
              {mapTypeLabel(promo.type)}
            </span>
          </div>
          <p className={s.rowSub}>
            Prioridad más alta se aplica primero cuando varias promos tocan el mismo
            platillo.
          </p>
        </div>
      </div>

      <div className={s.tdScope}>
        {promo.scope === 'entireMenu' && (
          <span className={s.scopeBadge}>Toda la carta</span>
        )}
        {promo.scope === 'categories' && (
          <span className={s.scopeBadge}>
            {promo.categoriesNames?.join(', ') ?? 'Categorías específicas'}
          </span>
        )}
        {promo.scope === 'items' && (
          <span className={s.scopeBadge}>{promo.itemsCount} platillo(s)</span>
        )}
      </div>

      <div className={s.tdSchedule}>
        <div className={s.scheduleLine}>
          <Clock size={12} />
          <span>
            {promo.schedule.startTime} – {promo.schedule.endTime}
          </span>
        </div>
        <div className={s.scheduleLineDays}>
          {promo.schedule.daysOfWeek.map((d) => (
            <span key={d} className={s.dayChip}>
              {d}
            </span>
          ))}
        </div>
      </div>

      <div className={s.tdDiscount}>{promo.discountLabel}</div>

      <div className={s.tdStatus}>
        {isActive && <span className={`${s.statusPill} ${s.statusPill_active}`}>Activa</span>}
        {isPaused && <span className={`${s.statusPill} ${s.statusPill_paused}`}>Pausada</span>}
        {isScheduled && (
          <span className={`${s.statusPill} ${s.statusPill_scheduled}`}>Programada</span>
        )}
        {isFinished && (
          <span className={`${s.statusPill} ${s.statusPill_finished}`}>Finalizada</span>
        )}
      </div>

      <div className={s.tdActions}>
        <div className={s.reorderBtns}>
          <button
            type="button"
            className={s.iconTinyBtn}
            onClick={onMoveUp}
            disabled={isFirst}
            aria-label="Subir prioridad"
          >
            <ArrowUp size={13} />
          </button>
          <button
            type="button"
            className={s.iconTinyBtn}
            onClick={onMoveDown}
            disabled={isLast}
            aria-label="Bajar prioridad"
          >
            <ArrowDown size={13} />
          </button>
        </div>

        <button
          type="button"
          className={s.actionBtn}
          onClick={onTogglePause}
          disabled={isScheduled || isFinished}
        >
          {isActive && <PauseCircle size={15} />}
          {isPaused && <PlayCircle size={15} />}
          {isScheduled && <Clock size={15} />}
          {isFinished && <Clock size={15} />}
          <span>
            {isActive && 'Pausar promo'}
            {isPaused && 'Reanudar'}
            {isScheduled && 'Editar'}
            {isFinished && 'Duplicar'}
          </span>
        </button>
      </div>
    </div>
  );
}

/* helpers visuales */

function mapTypeLabel(type: PromoType): string {
  switch (type) {
    case 'happyHour':
      return 'Happy Hour';
    case 'discount':
      return 'Descuento';
    case 'twoForOne':
      return '2x1 / promo';
    case 'combo':
      return 'Combo';
    default:
      return type;
  }
}

function mapTypeIcon(type: PromoType) {
  switch (type) {
    case 'happyHour':
      return <Clock size={11} />;
    case 'discount':
      return <PercentCircle size={11} />;
    case 'twoForOne':
      return <BadgePercent size={11} />;
    case 'combo':
      return <Sparkles size={11} />;
    default:
      return null;
  }
}
