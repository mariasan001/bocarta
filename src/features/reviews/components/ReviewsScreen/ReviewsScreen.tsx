// src/features/reviews/components/ReviewsScreen/ReviewsScreen.tsx
'use client';

import { useState } from 'react';

import {
  MessageCircleMore,
  Sparkles,
  Plus,
  Star,
  StarHalf,
  StarOff,
  Trophy,
  Gift,
  Flag,
  Archive,
  Reply,
  CheckCircle2,
} from 'lucide-react';

import { useReviewsState } from '../../hooks/useReviewsState';
import type { Review, ReviewStatus } from '../../types';
import RewardsProgramModal from '../RewardsProgramModal/RewardsProgramModal';

import s from './ReviewsScreen.module.css';

type TabId = 'reviews' | 'programs';

export default function ReviewsScreen() {
  const [activeTab, setActiveTab] = useState<TabId>('reviews');
  const [isProgramModalOpen, setProgramModalOpen] = useState(false);

  const {
    filteredReviews,
    reviews,
    statusFilter,
    ratingFilter,
    setStatus,
    setRating,
    toggleFeatured,
    markReplied,
    archive,
    toggleReward,
    avgRating,
    todayRewards,
  } = useReviewsState();

  const total = reviews.length;
  const newCount = reviews.filter((r) => r.status === 'new').length;

  return (
    <div className={s.layout}>
      {/* Header principal de la sección */}
      <header className={s.header}>
        <div className={s.headerLeft}>
          <div className={s.iconBadge}>
            <MessageCircleMore size={16} />
          </div>
          <div>
            <h1 className={s.title}>Reseñas &amp; recompensas</h1>
            <p className={s.subtitle}>
              Administra lo que dicen tus clientes desde el menú digital Bocarta y
              diseña programas de recompensas fáciles de explicar a tu equipo.
            </p>
          </div>
        </div>

        {/* Tabs */}
        <div className={s.tabs}>
          <button
            type="button"
            className={`${s.tabBtn} ${activeTab === 'reviews' ? s.tabBtnActive : ''}`}
            onClick={() => setActiveTab('reviews')}
          >
            Reseñas
          </button>
          <button
            type="button"
            className={`${s.tabBtn} ${activeTab === 'programs' ? s.tabBtnActive : ''}`}
            onClick={() => setActiveTab('programs')}
          >
            Programas de recompensas
          </button>
        </div>
      </header>

      {/* Contenido por tab */}
      {activeTab === 'reviews' ? (
        <ReviewsTab
          filteredReviews={filteredReviews}
          reviews={reviews}
          statusFilter={statusFilter}
          ratingFilter={ratingFilter}
          setStatus={setStatus}
          setRating={setRating}
          toggleFeatured={toggleFeatured}
          markReplied={markReplied}
          archive={archive}
          toggleReward={toggleReward}
          avgRating={avgRating}
          todayRewards={todayRewards}
          total={total}
          newCount={newCount}
        />
      ) : (
        <ProgramsTab onOpenNewProgram={() => setProgramModalOpen(true)} />
      )}

      {/* Modal para crear nuevo programa */}
      <RewardsProgramModal
        open={isProgramModalOpen}
        onClose={() => setProgramModalOpen(false)}
      />
    </div>
  );
}

/* ================== TAB 1: RESEÑAS ================== */

type ReviewsTabProps = {
  filteredReviews: Review[];
  reviews: Review[];
  statusFilter: 'all' | ReviewStatus;
  ratingFilter: 'all' | 3 | 4 | 5;
  setStatus: (v: 'all' | ReviewStatus) => void;
  setRating: (v: 'all' | 3 | 4 | 5) => void;
  toggleFeatured: (id: string) => void;
  markReplied: (id: string) => void;
  archive: (id: string) => void;
  toggleReward: (id: string) => void;
  avgRating: number;
  todayRewards: number;
  total: number;
  newCount: number;
};

function ReviewsTab(props: ReviewsTabProps) {
  const {
    filteredReviews,
    statusFilter,
    ratingFilter,
    setStatus,
    setRating,
    toggleFeatured,
    markReplied,
    archive,
    toggleReward,
    avgRating,
    todayRewards,
    total,
    newCount,
  } = props;

  return (
    <div className={s.grid}>
      {/* Columna principal: filtros + lista */}
      <section className={s.main}>
        <div className={s.filtersBar}>
          {/* Filtros por estado */}
          <div className={s.filtersGroup}>
            <span className={s.filtersLabel}>Estado</span>

            <StatusChip
              label="Todas"
              active={statusFilter === 'all'}
              onClick={() => setStatus('all')}
            />
            <StatusChip
              label="Nuevas"
              status="new"
              active={statusFilter === 'new'}
              onClick={() => setStatus('new')}
            />
            <StatusChip
              label="Respondidas"
              status="replied"
              active={statusFilter === 'replied'}
              onClick={() => setStatus('replied')}
            />
            <StatusChip
              label="Archivadas"
              status="archived"
              active={statusFilter === 'archived'}
              onClick={() => setStatus('archived')}
            />
            <StatusChip
              label="Revisar"
              status="flagged"
              active={statusFilter === 'flagged'}
              onClick={() => setStatus('flagged')}
            />
          </div>

          {/* Filtros por rating */}
          <div className={s.filtersGroup}>
            <span className={s.filtersLabel}>Rating</span>

            <RatingChip
              label="Todas"
              active={ratingFilter === 'all'}
              onClick={() => setRating('all')}
            />
            <RatingChip
              label="5★"
              active={ratingFilter === 5}
              onClick={() => setRating(5)}
            />
            <RatingChip
              label="4★ o más"
              active={ratingFilter === 4}
              onClick={() => setRating(4)}
            />
            <RatingChip
              label="3★ o más"
              active={ratingFilter === 3}
              onClick={() => setRating(3)}
            />
          </div>
        </div>

        <div className={s.list}>
          {filteredReviews.map((review) => (
            <ReviewCard
              key={review.id}
              review={review}
              onToggleFeatured={() => toggleFeatured(review.id)}
              onMarkReplied={() => markReplied(review.id)}
              onArchive={() => archive(review.id)}
              onToggleReward={() => toggleReward(review.id)}
            />
          ))}

          {filteredReviews.length === 0 && (
            <div className={s.emptyState}>
              <p className={s.emptyTitle}>No hay reseñas con estos filtros</p>
              <p className={s.emptyText}>
                Todas las reseñas llegan desde tu menú digital Bocarta. Cambia el estado
                o el rating para ver otras opiniones.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Aside: métricas generales de reseñas */}
      <aside className={s.side}>
        <section className={s.card}>
          <h2 className={s.cardTitle}>Pulso de hoy</h2>

          <div className={s.ratingBlock}>
            <div className={s.ratingValue}>
              <span className={s.ratingNumber}>{avgRating.toFixed(1)}</span>
              <span className={s.ratingMax}>/ 5</span>
            </div>
            <div className={s.ratingStars}>{renderStars(avgRating)}</div>
          </div>

          <ul className={s.summaryList}>
            <li>
              <span className={s.summaryLabel}>Reseñas totales</span>
              <span className={s.summaryValue}>{total}</span>
            </li>
            <li>
              <span className={s.summaryLabel}>Nuevas por revisar</span>
              <span className={s.summaryValue}>{newCount}</span>
            </li>
            <li>
              <span className={s.summaryLabel}>Recompensas marcadas hoy</span>
              <span className={s.summaryValue}>{todayRewards}</span>
            </li>
          </ul>
        </section>

        <section className={s.card}>
          <h2 className={s.cardTitle}>¿De dónde llegan?</h2>
          <p className={s.cardText}>
            En esta primera versión, todas las reseñas llegan desde tu{' '}
            <strong>menú digital Bocarta</strong> cuando el cliente escanea tu QR y
            llena el formulario dentro del micrositio.
          </p>
        </section>
      </aside>
    </div>
  );
}

/* ================== TAB 2: PROGRAMAS ================== */

type ProgramsTabProps = {
  onOpenNewProgram: () => void;
};

type RewardProgram = {
  id: string;
  name: string;
  kind: 'visit' | 'purchase' | 'review' | 'product';
  status: 'active' | 'paused' | 'draft';
  periodLabel: string;
  triggerSummary: string;
  rewardSummary: string;
  redemptions: number;
};

const mockPrograms: RewardProgram[] = [
  {
    id: '1',
    name: 'Postre en la 5ª visita',
    kind: 'visit',
    status: 'active',
    periodLabel: 'Sin fecha de fin',
    triggerSummary: 'Se desbloquea en la 5ª visita registrada',
    rewardSummary: '1 postre gratis a elegir',
    redemptions: 12,
  },
  {
    id: '2',
    name: 'Taco invitación por reseña',
    kind: 'review',
    status: 'paused',
    periodLabel: 'Mar–Abr 2025',
    triggerSummary: 'Dejar una reseña desde el menú digital',
    rewardSummary: '1 taco invitación del menú',
    redemptions: 34,
  },
  {
    id: '3',
    name: 'Combo Pastor Night',
    kind: 'product',
    status: 'draft',
    periodLabel: 'Borrador',
    triggerSummary: 'Pedir 3 veces el combo Pastor Night',
    rewardSummary: '1 bebida grande gratis',
    redemptions: 0,
  },
];

function ProgramsTab({ onOpenNewProgram }: ProgramsTabProps) {
  return (
    <div className={s.programsLayout}>
      {/* Columna izquierda: listado de programas */}
      <section className={s.main}>
        <div className={s.programsHeaderRow}>
          <div>
            <h2 className={s.sectionTitle}>Programas de recompensas</h2>
            <p className={s.sectionSubtitle}>
              Crea retos sencillos para tu equipo: por visita, por compra, por reseña o
              por producto. El seguimiento puede ser con ticket, sello o nota en la
              cuenta.
            </p>
          </div>

          <button
            type="button"
            className={s.primaryBtn}
            onClick={onOpenNewProgram}
          >
            <Plus size={16} />
            <span>Nuevo programa</span>
          </button>
        </div>

        <div className={s.programList}>
          {mockPrograms.map((p) => (
            <article key={p.id} className={s.programCard}>
              <div className={s.programCardHeader}>
                <div>
                  <h3 className={s.programName}>{p.name}</h3>
                  <p className={s.programKind}>{kindLabel(p.kind)}</p>
                </div>

                <span className={`${s.programStatus} ${s[`programStatus_${p.status}`]}`}>
                  {statusLabel(p.status)}
                </span>
              </div>

              <dl className={s.programMeta}>
                <div className={s.programMetaRow}>
                  <dt>Vigencia</dt>
                  <dd>{p.periodLabel}</dd>
                </div>
                <div className={s.programMetaRow}>
                  <dt>Se gana cuando…</dt>
                  <dd>{p.triggerSummary}</dd>
                </div>
                <div className={s.programMetaRow}>
                  <dt>Recompensa</dt>
                  <dd>{p.rewardSummary}</dd>
                </div>
                <div className={s.programMetaRow}>
                  <dt>Canjes registrados</dt>
                  <dd>{p.redemptions}</dd>
                </div>
              </dl>

              <div className={s.programActions}>
                <button type="button" className={s.textBtn}>
                  <Sparkles size={13} />
                  <span>Ver instrucciones para el staff</span>
                </button>
                <div className={s.programActionsRight}>
                  <button type="button" className={s.iconBtn}>
                    <Archive size={14} />
                  </button>
                  <button type="button" className={s.iconBtn}>
                    <Flag size={14} />
                  </button>
                </div>
              </div>
            </article>
          ))}

          {mockPrograms.length === 0 && (
            <div className={s.emptyState}>
              <p className={s.emptyTitle}>Aún no tienes programas creados</p>
              <p className={s.emptyText}>
                Empieza con algo simple: “Postre en la 5ª visita” o “Bebida gratis por
                reseña”. Tus meseros pueden llevar el control con tickets o tarjetas con
                sellos, y registrar solo los canjes importantes.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Columna derecha: explicación/ayuda sobre cómo usar programas */}
      <aside className={s.side}>
        <section className={s.card}>
          <h2 className={s.cardTitle}>¿Cómo funciona en la práctica?</h2>
          <p className={s.cardText}>
            En esta primera versión, Bocarta te ayuda a <strong>definir reglas claras</strong>{' '}
            y a registrar canjes. El conteo por cliente (tarjeta física, ticket, etc.) lo
            gestionas tú con tu equipo.
          </p>
          <ul className={s.bulletList}>
            <li>
              Define el programa aquí (reglas, vigencia, recompensa).
            </li>
            <li>
              Explica a tu equipo cómo contar visitas o compras (sellos, tickets, notas
              en la comanda).
            </li>
            <li>
              Cuando entregues una recompensa, regístrala en Bocarta para tener
              estadísticas.
            </li>
          </ul>
        </section>

        <section className={s.card}>
          <h2 className={s.cardTitle}>Pensando a futuro</h2>
          <p className={s.cardText}>
            Más adelante, Bocarta podrá tener usuarios de cliente con “cuenta de
            recompensas” para acumular puntos y retos entre varios negocios. Desde hoy
            dejamos lista la estructura para crecer hacia allá.
          </p>
        </section>
      </aside>
    </div>
  );
}

/* ========= Helpers y subcomponentes compartidos ========= */

type StatusChipProps = {
  label: string;
  active: boolean;
  status?: ReviewStatus;
  onClick: () => void;
};

function StatusChip({ label, active, status, onClick }: StatusChipProps) {
  return (
    <button
      type="button"
      className={`${s.statusChip} ${active ? s.statusChipActive : ''}`}
      onClick={onClick}
    >
      {status && <span className={`${s.statusDot} ${s[`statusDot_${status}`]}`} />}
      <span>{label}</span>
    </button>
  );
}

type RatingChipProps = {
  label: string;
  active: boolean;
  onClick: () => void;
};

function RatingChip({ label, active, onClick }: RatingChipProps) {
  return (
    <button
      type="button"
      className={`${s.ratingChip} ${active ? s.ratingChipActive : ''}`}
      onClick={onClick}
    >
      <Star size={12} />
      <span>{label}</span>
    </button>
  );
}

type ReviewCardProps = {
  review: Review;
  onToggleFeatured: () => void;
  onMarkReplied: () => void;
  onArchive: () => void;
  onToggleReward: () => void;
};

function ReviewCard({
  review,
  onToggleFeatured,
  onMarkReplied,
  onArchive,
  onToggleReward,
}: ReviewCardProps) {
  const created = new Date(review.createdAt);

  const formattedDate = created.toLocaleDateString('es-MX', {
    day: '2-digit',
    month: 'short',
  });

  const formattedTime = created.toLocaleTimeString('es-MX', {
    hour: '2-digit',
    minute: '2-digit',
  });

  const isNew = review.status === 'new';
  const isReplied = review.status === 'replied';
  const isFlagged = review.status === 'flagged';

  return (
    <article className={s.reviewCard}>
      <div className={s.reviewTop}>
        <div className={s.reviewHeaderLeft}>
          <div className={s.ratingPill}>{renderStars(review.rating)}</div>

          <div className={s.meta}>
            <div className={s.line1}>
              <span className={s.customerName}>
                {review.customerName ?? 'Cliente sin nombre'}
              </span>

              {review.visitCount && (
                <span className={s.visitBadge}>{review.visitCount}ª visita</span>
              )}

              {review.isFeatured && (
                <span className={s.featuredBadge}>
                  <Trophy size={11} />
                  Testimonio
                </span>
              )}
            </div>

            <div className={s.line2}>
              <span className={s.metaText}>
                {formattedDate} · {formattedTime}
              </span>
              <span className={s.metaSeparator}>•</span>
              <span className={s.metaText}>Desde menú digital Bocarta</span>
            </div>
          </div>
        </div>

        {isNew && <span className={s.badgeNew}>Nuevo</span>}

        {isFlagged && (
          <span className={s.badgeFlagged}>
            <Flag size={11} />
            Revisar
          </span>
        )}
      </div>

      <p className={s.comment}>{review.comment}</p>

      <div className={s.reviewBottom}>
        <div className={s.bottomLeft}>
          <button
            type="button"
            className={s.textBtn}
            onClick={onToggleFeatured}
          >
            <Trophy size={13} />
            <span>
              {review.isFeatured
                ? 'Quitar de testimonios'
                : 'Convertir en testimonio'}
            </span>
          </button>

          <button
            type="button"
            className={s.textBtn}
            onClick={onToggleReward}
          >
            <Gift size={13} />
            <span>
              {review.rewardIssued
                ? 'Recompensa marcada'
                : 'Marcar recompensa entregada'}
            </span>
          </button>
        </div>

        <div className={s.bottomRight}>
          <button
            type="button"
            className={s.iconBtn}
            onClick={onArchive}
          >
            <Archive size={14} />
          </button>

          <button
            type="button"
            className={`${s.replyBtn} ${isReplied ? s.replyBtnSuccess : ''}`}
            onClick={onMarkReplied}
          >
            {isReplied ? <CheckCircle2 size={14} /> : <Reply size={14} />}
            <span>{isReplied ? 'Respondida' : 'Responder'}</span>
          </button>
        </div>
      </div>
    </article>
  );
}

/* ========= Helpers ========= */

function renderStars(value: number) {
  const stars = [];
  const rounded = Math.round(value * 2) / 2;

  for (let i = 1; i <= 5; i++) {
    if (rounded >= i) {
      stars.push(<Star key={i} size={12} className={s.starFull} />);
    } else if (rounded + 0.5 === i) {
      stars.push(<StarHalf key={i} size={12} className={s.starHalf} />);
    } else {
      stars.push(<StarOff key={i} size={12} className={s.starEmpty} />);
    }
  }

  return stars;
}

function kindLabel(kind: RewardProgram['kind']) {
  switch (kind) {
    case 'visit':
      return 'Por visita';
    case 'purchase':
      return 'Por compra / ticket';
    case 'review':
      return 'Por reseña';
    case 'product':
      return 'Por producto específico';
    default:
      return '';
  }
}

function statusLabel(status: RewardProgram['status']) {
  switch (status) {
    case 'active':
      return 'Activo';
    case 'paused':
      return 'Pausado';
    case 'draft':
      return 'Borrador';
    default:
      return '';
  }
}
