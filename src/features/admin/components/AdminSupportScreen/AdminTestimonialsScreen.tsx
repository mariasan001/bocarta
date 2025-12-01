// src/features/admin/components/AdminTestimonialsScreen/AdminTestimonialsScreen.tsx
'use client';

import { useMemo, useState } from 'react';
import {
  MessageCircleMore,
  Star,
  Filter,
  Search,
  Globe2,
  Pin,
  PinOff,
  Archive,
  Sparkles,
  ArrowUpDown,
  CheckCircle2,
} from 'lucide-react';

import s from './AdminTestimonialsScreen.module.css';

type FeedbackStatus = 'internal' | 'candidate' | 'published' | 'archived';
type FeedbackSource = 'inApp' | 'email' | 'call';

type AdminFeedback = {
  id: string;
  businessName: string;
  city: string;
  plan: 'Ligero' | 'Fuerte' | 'Alto';
  title: string;
  quote: string;
  shortQuote: string;
  rating: number;
  status: FeedbackStatus;
  featured: boolean;
  source: FeedbackSource;
  createdAtLabel: string;
  landingSection?: 'hero' | 'midstrip' | 'footer';
};

type StatusFilter = 'all' | FeedbackStatus;

const feedbackFixture: AdminFeedback[] = [
  {
    id: 'FB-201',
    businessName: 'Taquería El Barrio',
    city: 'CDMX',
    plan: 'Fuerte',
    title: 'Menos estrés al cambiar precios',
    quote:
      'Antes tardábamos horas cambiando precios en las pizarras y el menú. Ahora con Bocarta es literalmente un minuto desde el celular.',
    shortQuote:
      '“Cambiar precios ahora es cosa de un minuto desde el cel.”',
    rating: 5,
    status: 'published',
    featured: true,
    source: 'inApp',
    createdAtLabel: 'Hace 5 días',
    landingSection: 'hero',
  },
  {
    id: 'FB-189',
    businessName: 'Café Estación Centro',
    city: 'Toluca',
    plan: 'Alto',
    title: 'Los clientes sí usan el QR',
    quote:
      'Pensábamos que el QR era una moda, pero la gente lo usa muchísimo. Hasta nos piden el link para compartirlo en grupos de WhatsApp.',
    shortQuote: '“La gente sí usa el QR, incluso lo comparte.”',
    rating: 5,
    status: 'candidate',
    featured: false,
    source: 'email',
    createdAtLabel: 'Hace 2 semanas',
    landingSection: undefined,
  },
  {
    id: 'FB-176',
    businessName: 'Burger Norte',
    city: 'Monterrey',
    plan: 'Ligero',
    title: 'Aprendimos a usar promos',
    quote:
      'Nunca habíamos usado promos más allá del típico 2x1. Con Bocarta empezamos a probar horarios felices y combos, y vimos horas pico clarísimas.',
    shortQuote: '“Ahora entendemos cuándo hacer promos.”',
    rating: 4,
    status: 'internal',
    featured: false,
    source: 'inApp',
    createdAtLabel: 'Hace 3 semanas',
    landingSection: undefined,
  },
  {
    id: 'FB-150',
    businessName: 'Bar La Oficina',
    city: 'Querétaro',
    plan: 'Fuerte',
    title: 'Soporte que sí responde',
    quote:
      'Nos sorprendió que el soporte respondiera tan rápido cuando tuvimos dudas de facturación. Se siente que hay personas detrás del sistema.',
    shortQuote: '“Soporte que responde rápido y claro.”',
    rating: 5,
    status: 'published',
    featured: false,
    source: 'email',
    createdAtLabel: 'Hace 1 mes',
    landingSection: 'midstrip',
  },
  {
    id: 'FB-132',
    businessName: 'Marisquería Costa Azul',
    city: 'Guadalajara',
    plan: 'Ligero',
    title: 'Probamos Bocarta y luego hicimos web propia',
    quote:
      'Bocarta nos ayudó a entender qué platillos se veían más. Luego hicimos nuestra propia web, pero queremos seguir usando el menú digital.',
    shortQuote: '“Queremos seguir usando el menú digital.”',
    rating: 4,
    status: 'archived',
    featured: false,
    source: 'call',
    createdAtLabel: 'Hace 2 meses',
    landingSection: undefined,
  },
];

export default function AdminTestimonialsScreen() {
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');
  const [search, setSearch] = useState('');
  const [selectedId, setSelectedId] = useState<string | null>(
    feedbackFixture[0]?.id ?? null,
  );

  const filtered = useMemo(() => {
    return feedbackFixture.filter((fb) => {
      if (statusFilter !== 'all' && fb.status !== statusFilter) return false;

      if (!search.trim()) return true;

      const q = search.toLowerCase();
      return (
        fb.businessName.toLowerCase().includes(q) ||
        fb.city.toLowerCase().includes(q) ||
        fb.title.toLowerCase().includes(q) ||
        fb.id.toLowerCase().includes(q)
      );
    });
  }, [statusFilter, search]);

  const selected =
    filtered.find((fb) => fb.id === selectedId) ??
    filtered[0] ??
    null;

  const total = feedbackFixture.length;
  const publishedCount = feedbackFixture.filter(
    (fb) => fb.status === 'published',
  ).length;
  const avgRating =
    feedbackFixture.reduce((acc, fb) => acc + fb.rating, 0) /
    (feedbackFixture.length || 1);

  return (
    <div className={s.layout}>
      {/* HEADER */}
      <div className={s.header}>
        <div className={s.headerLeft}>
          <div className={s.iconBadge}>
            <MessageCircleMore size={18} />
          </div>
          <div>
            <h1 className={s.title}>Comentarios & testimonios</h1>
            <p className={s.subtitle}>
              Aquí llega el feedback de los negocios. Desde este panel
              decides qué se queda solo como aprendizaje interno y qué se
              convierte en testimonial para la web de Bocarta.
            </p>
          </div>
        </div>

        <div className={s.headerRight}>
          <div className={s.statsRow}>
            <div className={s.stat}>
              <span className={s.statLabel}>Feedback total</span>
              <span className={s.statValue}>{total}</span>
            </div>
            <div className={s.stat}>
              <span className={s.statLabel}>En landing</span>
              <span className={s.statValue}>{publishedCount}</span>
            </div>
            <div className={s.stat}>
              <span className={s.statLabel}>Rating promedio</span>
              <span className={s.statValue}>
                {avgRating.toFixed(1)}
                <span className={s.statStar}>
                  <Star size={12} />
                </span>
              </span>
            </div>
          </div>

          <div className={s.actionsRow}>
            <button type="button" className={s.primaryBtn}>
              <Sparkles size={14} />
              Crear testimonial manual
            </button>
            <button type="button" className={s.ghostBtn}>
              <Globe2 size={14} />
              Ver en landing
            </button>
          </div>
        </div>
      </div>

      {/* FILTROS */}
      <div className={s.filtersRow}>
        <div className={s.filtersGroup}>
          <span className={s.filtersLabel}>Vista</span>
          <div className={s.chipsRow}>
            <StatusChip
              label="Todos"
              status="all"
              active={statusFilter === 'all'}
              onClick={() => setStatusFilter('all')}
            />
            <StatusChip
              label="Solo internos"
              status="internal"
              active={statusFilter === 'internal'}
              dotClass={s.dotInternal}
              onClick={() => setStatusFilter('internal')}
            />
            <StatusChip
              label="Candidatos a web"
              status="candidate"
              active={statusFilter === 'candidate'}
              dotClass={s.dotCandidate}
              onClick={() => setStatusFilter('candidate')}
            />
            <StatusChip
              label="En landing"
              status="published"
              active={statusFilter === 'published'}
              dotClass={s.dotPublished}
              onClick={() => setStatusFilter('published')}
            />
            <StatusChip
              label="Archivados"
              status="archived"
              active={statusFilter === 'archived'}
              dotClass={s.dotArchived}
              onClick={() => setStatusFilter('archived')}
            />
          </div>
        </div>

        <div className={s.rightFilters}>
          <div className={s.searchBox}>
            <Search size={14} />
            <input
              className={s.searchInput}
              placeholder="Buscar por negocio, ciudad, título o ID…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <button type="button" className={s.iconOnlyBtn}>
            <Filter size={14} />
          </button>
        </div>
      </div>

      {/* GRID PRINCIPAL */}
      <div className={s.grid}>
        {/* LISTA IZQUIERDA */}
        <section className={s.listColumn}>
          <div className={s.listCard}>
            <div className={s.listHeader}>
              <div>
                <h2 className={s.listTitle}>Feedback de negocios</h2>
                <p className={s.listHint}>
                  Pequeño inbox editorial para elegir qué historias
                  representan mejor a Bocarta.
                </p>
              </div>
              <button type="button" className={s.sortBtn}>
                <ArrowUpDown size={13} />
                Ordenar por más recientes
              </button>
            </div>

            <div className={s.tableWrapper}>
              <div className={s.tableHeaderRow}>
                <span className={s.thMain}>Comentario</span>
                <span className={s.thSmall}>Negocio</span>
                <span className={s.thSmall}>Rating</span>
                <span className={s.thSmall}>Estado</span>
                <span className={s.thSmall}>Canal</span>
                <span className={s.thSmallRight}>Creado</span>
              </div>

              <div className={s.rows}>
                {filtered.map((fb) => (
                  <button
                    key={fb.id}
                    type="button"
                    className={`${s.row} ${
                      selected?.id === fb.id ? s.rowActive : ''
                    }`}
                    onClick={() => setSelectedId(fb.id)}
                  >
                    <div className={s.cellMain}>
                      <div className={s.cellTitleRow}>
                        <span className={s.cellTitle}>{fb.title}</span>
                        {fb.featured && (
                          <span className={s.featuredBadge}>
                            <Sparkles size={11} />
                            Destacado
                          </span>
                        )}
                      </div>
                      <p className={s.cellQuote}>{fb.shortQuote}</p>
                    </div>

                    <div className={s.cell}>
                      <span className={s.cellBusiness}>
                        {fb.businessName}
                      </span>
                      <span className={s.cellCity}>{fb.city}</span>
                    </div>

                    <div className={s.cell}>
                      <div className={s.ratingPill}>
                        {renderStars(fb.rating)}
                      </div>
                    </div>

                    <div className={s.cell}>
                      <span
                        className={`${s.statusPill} ${statusClass(
                          fb.status,
                        )}`}
                      >
                        {statusLabel(fb.status)}
                      </span>
                    </div>

                    <div className={s.cell}>
                      <span className={s.channelTag}>
                        {channelLabel(fb.source)}
                      </span>
                    </div>

                    <div className={s.cellRight}>
                      <span className={s.cellTime}>
                        {fb.createdAtLabel}
                      </span>
                    </div>
                  </button>
                ))}

                {filtered.length === 0 && (
                  <div className={s.emptyList}>
                    <p className={s.emptyTitle}>
                      No hay comentarios con ese filtro
                    </p>
                    <p className={s.emptyText}>
                      Ajusta el estado o la búsqueda para ver más feedback.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* DETALLE + LADO DERECHO */}
        <section className={s.detailColumn}>
          {selected ? (
            <div className={s.detailLayout}>
              <div className={s.detailMain}>
                <div className={s.detailHeader}>
                  <div>
                    <div className={s.detailIdRow}>
                      <span className={s.detailId}>{selected.id}</span>
                      <span
                        className={`${s.statusPill} ${statusClass(
                          selected.status,
                        )}`}
                      >
                        {statusLabel(selected.status)}
                      </span>
                    </div>
                    <h2 className={s.detailTitle}>{selected.title}</h2>
                    <p className={s.detailMeta}>
                      {selected.businessName} · {selected.city} · Plan{' '}
                      {selected.plan}
                    </p>
                  </div>

                  <div className={s.detailActions}>
                    <button
                      type="button"
                      className={s.primaryMiniBtn}
                    >
                      <CheckCircle2 size={14} />
                      Marcar como candidato
                    </button>
                    <button
                      type="button"
                      className={s.secondaryMiniBtn}
                    >
                      <Pin size={14} />
                      Publicar en landing
                    </button>
                    <button
                      type="button"
                      className={s.ghostMiniBtn}
                    >
                      <Archive size={14} />
                      Archivar
                    </button>
                  </div>
                </div>

                <div className={s.detailCard}>
                  <div className={s.detailRatingRow}>
                    <div className={s.detailRating}>
                      {renderStars(selected.rating)}
                      <span className={s.detailRatingText}>
                        {selected.rating.toFixed(1)} / 5
                      </span>
                    </div>
                    <span className={s.detailChip}>
                      Pensado para: sección de historias reales
                    </span>
                  </div>

                  <blockquote className={s.detailQuote}>
                    {selected.quote}
                  </blockquote>
                </div>

                <div className={s.detailCard}>
                  <h3 className={s.sectionTitle}>Versión para landing</h3>
                  <p className={s.sectionText}>
                    Esta es la versión corta que se mostraría en la web de
                    Bocarta. Más adelante se podrá editar aquí mismo y
                    elegir layout (tarjeta, carrusel, quote grande, etc.).
                  </p>

                  <div className={s.landingPreview}>
                    <p className={s.landingQuote}>
                      {selected.shortQuote}
                    </p>
                    <p className={s.landingMeta}>
                      {selected.businessName} · {selected.city}
                    </p>
                  </div>

                  <div className={s.noteBox}>
                    <span className={s.noteDot} />
                    <p>
                      Cuando conectemos la API, desde aquí podrás
                      actualizar el texto sin tocar el código de la
                      landing.
                    </p>
                  </div>
                </div>
              </div>

              {/* LADO DERECHO */}
              <aside className={s.side}>
                <div className={s.cardSide}>
                  <h3 className={s.cardSideTitle}>
                    Bloques actuales en landing
                  </h3>
                  <p className={s.cardSideText}>
                    Vista rápida de qué testimonios están activos en las
                    distintas secciones de la web.
                  </p>

                  <ul className={s.landingList}>
                    {feedbackFixture
                      .filter((fb) => fb.status === 'published')
                      .map((fb) => (
                        <li key={fb.id} className={s.landingItem}>
                          <div className={s.landingItemMain}>
                            <span className={s.landingItemTitle}>
                              {fb.businessName}
                            </span>
                            <span className={s.landingItemQuote}>
                              {fb.shortQuote}
                            </span>
                          </div>
                          <div className={s.landingItemMeta}>
                            <span className={s.landingItemSection}>
                              {sectionLabel(fb.landingSection)}
                            </span>
                            {fb.featured ? (
                              <span className={s.landingTag}>
                                <Sparkles size={11} />
                                Destacado
                              </span>
                            ) : (
                              <span className={s.landingTagMuted}>
                                Testimonial activo
                              </span>
                            )}
                          </div>
                        </li>
                      ))}
                  </ul>
                </div>

                <div className={s.cardSide}>
                  <h3 className={s.cardSideTitle}>Guía editorial</h3>
                  <p className={s.cardSideText}>
                    Qué buscamos en un buen testimonial de Bocarta:
                  </p>
                  <ul className={s.guidelinesList}>
                    <li>Habla de un cambio concreto (tiempo, dinero, estrés).</li>
                    <li>
                      Menciona cómo se sentían antes y cómo se sienten ahora.
                    </li>
                    <li>Incluye contexto del tipo de negocio y ciudad.</li>
                    <li>
                      Evitar tecnicismos: que suene como la voz real del
                      cliente.
                    </li>
                  </ul>

                  <div className={s.toggleRow}>
                    <div className={s.toggleLabelBlock}>
                      <span className={s.toggleTitle}>
                        Mostrar solo voces actuales
                      </span>
                      <span className={s.toggleText}>
                        Más adelante podrás ocultar testimonios de negocios
                        que ya no son clientes activos.
                      </span>
                    </div>
                    <button
                      type="button"
                      className={s.toggleBtn}
                      aria-label="Cambiar modo de filtro"
                    >
                      <PinOff size={14} />
                    </button>
                  </div>
                </div>
              </aside>
            </div>
          ) : (
            <div className={s.emptyDetail}>
              <p className={s.emptyTitle}>
                Selecciona un comentario
              </p>
              <p className={s.emptyText}>
                El panel derecho mostrará la versión larga, la versión para
                landing y el contexto del negocio.
              </p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

/* ===== Subcomponentes & helpers ===== */

type StatusChipProps =
  | {
      label: string;
      status: Exclude<StatusFilter, 'all'>;
      active: boolean;
      dotClass?: string;
      onClick: () => void;
    }
  | {
      label: string;
      status: 'all';
      active: boolean;
      dotClass?: undefined;
      onClick: () => void;
    };

function StatusChip({
  label,
  active,
  dotClass,
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
      {dotClass && (
        <span className={`${s.statusDot} ${dotClass}`} />
      )}
      <span>{label}</span>
    </button>
  );
}

function statusLabel(status: FeedbackStatus): string {
  switch (status) {
    case 'internal':
      return 'Solo interno';
    case 'candidate':
      return 'Candidato';
    case 'published':
      return 'En landing';
    case 'archived':
      return 'Archivado';
  }
}

function statusClass(status: FeedbackStatus): string {
  switch (status) {
    case 'internal':
      return s.statusInternal;
    case 'candidate':
      return s.statusCandidate;
    case 'published':
      return s.statusPublished;
    case 'archived':
      return s.statusArchived;
  }
}

function channelLabel(source: FeedbackSource): string {
  switch (source) {
    case 'inApp':
      return 'Centro de ayuda';
    case 'email':
      return 'Correo';
    case 'call':
      return 'Llamada';
  }
}

function renderStars(rating: number) {
  const full = Math.round(rating);
  return (
    <>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={12}
          className={i < full ? s.starFull : s.starEmpty}
        />
      ))}
    </>
  );
}

function sectionLabel(
  section?: AdminFeedback['landingSection'],
): string {
  switch (section) {
    case 'hero':
      return 'Hero principal';
    case 'midstrip':
      return 'Franja media';
    case 'footer':
      return 'Zona final';
    default:
      return 'Sección general';
  }
}
