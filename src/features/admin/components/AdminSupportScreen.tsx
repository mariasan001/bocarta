'use client';

import { useMemo, useState } from 'react';
import {
  TicketCheck,
  AlertCircle,
  CheckCircle2,
  Clock3,
  Filter,
  Search,
  Mail,
  MessageCircleMore,
  User2,
  Tag,
  ChevronRight,
} from 'lucide-react';

import s from './AdminSupportScreen.module.css';

type TicketStatus = 'open' | 'inProgress' | 'waiting' | 'solved' | 'closed';

type TicketPriority = 'low' | 'medium' | 'high';

type SupportTicket = {
  id: string;
  subject: string;
  businessName: string;
  contactName: string;
  contactEmail: string;
  plan: 'Ligero' | 'Fuerte' | 'Alto';
  priority: TicketPriority;
  status: TicketStatus;
  channel: 'inApp' | 'email' | 'whatsapp';
  createdAtLabel: string;
  lastUpdateLabel: string;
  unread: boolean;
  area: 'Cobranza' | 'Soporte técnico' | 'Onboarding';
  summary: string;
  details: string;
};

const ticketsFixture: SupportTicket[] = [
  {
    id: 'TCK-1042',
    subject: 'El QR apunta a un menú viejo',
    businessName: 'Taquería El Barrio',
    contactName: 'Laura Gómez',
    contactEmail: 'laura@taqueriaelbarrio.mx',
    plan: 'Fuerte',
    priority: 'high',
    status: 'open',
    channel: 'inApp',
    createdAtLabel: 'Hoy · 11:24 am',
    lastUpdateLabel: 'Hace 8 min',
    unread: true,
    area: 'Soporte técnico',
    summary: 'Algunos clientes siguen viendo precios antiguos en el QR.',
    details:
      'El negocio actualizó precios ayer, pero al escanear el QR en algunas mesas se sigue viendo el menú anterior. Sospechan que tienen impresos viejos mezclados con los nuevos.',
  },
  {
    id: 'TCK-1038',
    subject: 'Duda sobre cambio de plan a anual',
    businessName: 'Café Estación Centro',
    contactName: 'Mario Ruiz',
    contactEmail: 'facturacion@cafeestacion.mx',
    plan: 'Alto',
    priority: 'medium',
    status: 'inProgress',
    channel: 'email',
    createdAtLabel: 'Ayer · 4:12 pm',
    lastUpdateLabel: 'Hoy · 9:01 am',
    unread: false,
    area: 'Cobranza',
    summary:
      'Pregunta si el cambio a plan anual respeta el precio de Founder Bocarta.',
    details:
      'Negocio con más de 8 meses en Bocarta. Tiene promo Founder activa y quiere saber si al pasar a anual conserva el mismo precio de lista con el descuento aplicado.',
  },
  {
    id: 'TCK-1027',
    subject: 'No encuentran dónde crear promos nuevas',
    businessName: 'Burger Norte',
    contactName: 'Ana Pérez',
    contactEmail: 'contacto@burgernorte.mx',
    plan: 'Ligero',
    priority: 'low',
    status: 'waiting',
    channel: 'whatsapp',
    createdAtLabel: 'Hace 3 días',
    lastUpdateLabel: 'Hace 1 día',
    unread: false,
    area: 'Onboarding',
    summary:
      'Preguntan si en su plan está incluida la sección de “Promos y precios”.',
    details:
      'Negocio recién activado. Viene de una demo donde sí vio la sección completa y ahora no la encuentra en su panel. Podría ser buen candidato para upsell de plan.',
  },
  {
    id: 'TCK-1009',
    subject: 'Solicitan factura de meses anteriores',
    businessName: 'Bar La Oficina',
    contactName: 'Jorge Salas',
    contactEmail: 'administracion@laoficina.mx',
    plan: 'Fuerte',
    priority: 'medium',
    status: 'solved',
    channel: 'email',
    createdAtLabel: 'Hace 1 semana',
    lastUpdateLabel: 'Hace 2 días',
    unread: false,
    area: 'Cobranza',
    summary: 'Pidieron facturas de enero a marzo 2025.',
    details:
      'Se enviaron por correo y se agregó recordatorio para explicar cómo descargarlas desde “Plan & facturación” en su propio panel.',
  },
];

type StatusFilter = 'all' | TicketStatus;
type PriorityFilter = 'all' | TicketPriority;

export default function AdminSupportScreen() {
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('open');
  const [priorityFilter, setPriorityFilter] =
    useState<PriorityFilter>('all');
  const [search, setSearch] = useState('');
  const [selectedId, setSelectedId] = useState<string | null>(
    ticketsFixture[0]?.id ?? null,
  );

  const filteredTickets = useMemo(() => {
    return ticketsFixture.filter((t) => {
      if (statusFilter !== 'all' && t.status !== statusFilter) return false;
      if (priorityFilter !== 'all' && t.priority !== priorityFilter)
        return false;
      if (!search.trim()) return true;
      const q = search.toLowerCase();
      return (
        t.subject.toLowerCase().includes(q) ||
        t.businessName.toLowerCase().includes(q) ||
        t.id.toLowerCase().includes(q)
      );
    });
  }, [statusFilter, priorityFilter, search]);

  const selectedTicket =
    filteredTickets.find((t) => t.id === selectedId) ??
    filteredTickets[0] ??
    null;

  const openCount = ticketsFixture.filter((t) => t.status === 'open').length;
  const inProgressCount = ticketsFixture.filter(
    (t) => t.status === 'inProgress',
  ).length;
  const waitingCount = ticketsFixture.filter(
    (t) => t.status === 'waiting',
  ).length;

  return (
    <div className={s.layout}>
      {/* HEADER */}
      <div className={s.header}>
        <div className={s.headerLeft}>
          <div className={s.iconBadge}>
            <TicketCheck size={18} />
          </div>
          <div>
            <h1 className={s.title}>Soporte & tickets</h1>
            <p className={s.subtitle}>
              Centraliza las conversaciones con negocios: tickets abiertos,
              seguimiento y métricas ligeras. Más adelante se conectará con
              email, WhatsApp y el chat in-app de Bocarta.
            </p>
          </div>
        </div>

        <div className={s.headerStats}>
          <div className={s.statPill}>
            <span className={s.statLabel}>Abiertos</span>
            <span className={s.statValue}>{openCount}</span>
          </div>
          <div className={s.statPill}>
            <span className={s.statLabel}>En progreso</span>
            <span className={s.statValue}>{inProgressCount}</span>
          </div>
          <div className={s.statPill}>
            <span className={s.statLabel}>En espera</span>
            <span className={s.statValue}>{waitingCount}</span>
          </div>
        </div>
      </div>

      {/* FILTROS SUPERIORES */}
      <div className={s.filtersRow}>
        <div className={s.statusFilters}>
          <span className={s.filtersLabel}>Estado</span>
          <div className={s.filtersGroup}>
            <StatusChip
              label="Abiertos"
              status="open"
              active={statusFilter === 'open'}
              dotClass={s.dotOpen}
              onClick={() => setStatusFilter('open')}
            />
            <StatusChip
              label="En progreso"
              status="inProgress"
              active={statusFilter === 'inProgress'}
              dotClass={s.dotInProgress}
              onClick={() => setStatusFilter('inProgress')}
            />
            <StatusChip
              label="En espera negocio"
              status="waiting"
              active={statusFilter === 'waiting'}
              dotClass={s.dotWaiting}
              onClick={() => setStatusFilter('waiting')}
            />
            <StatusChip
              label="Resueltos"
              status="solved"
              active={statusFilter === 'solved'}
              dotClass={s.dotSolved}
              onClick={() => setStatusFilter('solved')}
            />
            <StatusChip
              label="Cerrados"
              status="closed"
              active={statusFilter === 'closed'}
              dotClass={s.dotClosed}
              onClick={() => setStatusFilter('closed')}
            />
            <StatusChip
              label="Todos"
              status="all"
              active={statusFilter === 'all'}
              onClick={() => setStatusFilter('all')}
            />
          </div>
        </div>

        <div className={s.rightFilters}>
          <div className={s.pillGroup}>
            <button
              type="button"
              className={`${s.pillBtn} ${
                priorityFilter === 'all' ? s.pillBtnActive : ''
              }`}
              onClick={() => setPriorityFilter('all')}
            >
              Todo
            </button>
            <button
              type="button"
              className={`${s.pillBtn} ${
                priorityFilter === 'high' ? s.pillBtnActive : ''
              }`}
              onClick={() => setPriorityFilter('high')}
            >
              Alta
            </button>
            <button
              type="button"
              className={`${s.pillBtn} ${
                priorityFilter === 'medium' ? s.pillBtnActive : ''
              }`}
              onClick={() => setPriorityFilter('medium')}
            >
              Media
            </button>
            <button
              type="button"
              className={`${s.pillBtn} ${
                priorityFilter === 'low' ? s.pillBtnActive : ''
              }`}
              onClick={() => setPriorityFilter('low')}
            >
              Baja
            </button>
          </div>

          <div className={s.searchBox}>
            <Search size={14} />
            <input
              className={s.searchInput}
              placeholder="Buscar por negocio, asunto o ID…"
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
        {/* COLUMNA LISTA */}
        <section className={s.listColumn}>
          <div className={s.listCard}>
            <div className={s.listHeaderRow}>
              <span className={s.listHeaderTitle}>Bandeja de tickets</span>
              <span className={s.listHeaderHint}>
                {filteredTickets.length} resultados
              </span>
            </div>

            <div className={s.ticketList}>
              {filteredTickets.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  className={`${s.ticketRow} ${
                    selectedTicket?.id === t.id ? s.ticketRowActive : ''
                  }`}
                  onClick={() => setSelectedId(t.id)}
                >
                  <div className={s.ticketRowMain}>
                    <div className={s.ticketRowTop}>
                      <span className={s.ticketSubject}>{t.subject}</span>
                      <span className={`${s.badge} ${priorityClass(t.priority)}`}>
                        {priorityLabel(t.priority)}
                      </span>
                    </div>

                    <div className={s.ticketRowMeta}>
                      <span className={s.metaBusiness}>{t.businessName}</span>
                      <span className={s.metaDot}>·</span>
                      <span className={s.metaId}>{t.id}</span>
                      <span className={s.metaDot}>·</span>
                      <span className={s.metaStatus}>
                        {statusLabel(t.status)}
                      </span>
                    </div>
                  </div>

                  <div className={s.ticketRowSide}>
                    {t.unread && <span className={s.unreadDot} />}
                    <span className={s.metaTime}>{t.lastUpdateLabel}</span>
                    <ChevronRight size={14} className={s.rowChevron} />
                  </div>
                </button>
              ))}

              {filteredTickets.length === 0 && (
                <div className={s.emptyList}>
                  <p className={s.emptyTitle}>No hay tickets con ese filtro</p>
                  <p className={s.emptyText}>
                    Cambia el estado o prioridad, o limpia la búsqueda.
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* COLUMNA DETALLE */}
        <section className={s.detailColumn}>
          {selectedTicket ? (
            <div className={s.detailCard}>
              <div className={s.detailHeader}>
                <div>
                  <div className={s.detailIdRow}>
                    <span className={s.detailId}>{selectedTicket.id}</span>
                    <span className={s.detailStatusPill}>
                      {statusLabel(selectedTicket.status)}
                    </span>
                  </div>
                  <h2 className={s.detailSubject}>
                    {selectedTicket.subject}
                  </h2>
                  <p className={s.detailCreated}>
                    Creado: {selectedTicket.createdAtLabel} · Última
                    actualización: {selectedTicket.lastUpdateLabel}
                  </p>
                </div>

                <div className={s.detailActions}>
                  <button type="button" className={s.primaryMiniBtn}>
                    <CheckCircle2 size={14} />
                    Marcar como resuelto
                  </button>
                  <button type="button" className={s.secondaryMiniBtn}>
                    <Clock3 size={14} />
                    Poner en espera
                  </button>
                </div>
              </div>

              <div className={s.detailGrid}>
                <div className={s.detailMain}>
                  <div className={s.sectionBlock}>
                    <h3 className={s.sectionTitle}>Resumen rápido</h3>
                    <p className={s.sectionText}>
                      {selectedTicket.summary}
                    </p>
                  </div>

                  <div className={s.sectionBlock}>
                    <h3 className={s.sectionTitle}>
                      Contexto y siguiente paso
                    </h3>
                    <p className={s.sectionText}>{selectedTicket.details}</p>

                    <div className={s.cannedActions}>
                      <button
                        type="button"
                        className={s.cannedBtn}
                      >
                        Plantilla · Explicar QR y versiones
                      </button>
                      <button
                        type="button"
                        className={s.cannedBtn}
                      >
                        Plantilla · Explicar cambio de plan
                      </button>
                    </div>
                  </div>

                  <div className={s.sectionBlock}>
                    <h3 className={s.sectionTitle}>Responder</h3>
                    <div className={s.replyBox}>
                      <textarea
                        className={s.replyTextarea}
                        rows={4}
                        placeholder="Escribe una respuesta para el negocio (no se enviará, es maqueta)."
                      />
                      <div className={s.replyFooter}>
                        <span className={s.replyHint}>
                          Más adelante se conectará con correo, WhatsApp o
                          chat in-app.
                        </span>
                        <button
                          type="button"
                          className={s.primaryMiniBtn}
                        >
                          Enviar respuesta
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* PANEL LATERAL */}
                <aside className={s.detailSide}>
                  <div className={s.cardSide}>
                    <h3 className={s.cardSideTitle}>Negocio</h3>
                    <p className={s.cardSideBusiness}>
                      {selectedTicket.businessName}
                    </p>

                    <div className={s.sideRow}>
                      <User2 size={13} />
                      <span>
                        {selectedTicket.contactName}
                        {' · '}
                        <span className={s.sideLabel}>Contacto</span>
                      </span>
                    </div>
                    <div className={s.sideRow}>
                      <Mail size={13} />
                      <span>{selectedTicket.contactEmail}</span>
                    </div>
                    <div className={s.sideRow}>
                      <Tag size={13} />
                      <span>Plan {selectedTicket.plan}</span>
                    </div>
                    <div className={s.sideRow}>
                      <MessageCircleMore size={13} />
                      <span>Canal: {channelLabel(selectedTicket.channel)}</span>
                    </div>
                  </div>

                  <div className={s.cardSide}>
                    <h3 className={s.cardSideTitle}>Clasificación</h3>
                    <p className={s.cardSideText}>
                      Estas etiquetas ayudan a priorizar y luego sacar
                      reportes de temas frecuentes.
                    </p>

                    <ul className={s.tagList}>
                      <li>
                        <span className={s.tagLabel}>Área</span>
                        <span className={s.tagValue}>
                          {selectedTicket.area}
                        </span>
                      </li>
                      <li>
                        <span className={s.tagLabel}>Prioridad</span>
                        <span
                          className={`${s.tagValue} ${priorityClass(
                            selectedTicket.priority,
                          )}`}
                        >
                          {priorityLabel(selectedTicket.priority)}
                        </span>
                      </li>
                      <li>
                        <span className={s.tagLabel}>
                          Impacto estimado
                        </span>
                        <span className={s.tagValue}>
                          Menú & experiencia de clientes
                        </span>
                      </li>
                    </ul>

                    <div className={s.noteBox}>
                      <AlertCircle size={13} />
                      <p>
                        Más adelante, desde aquí podrás ver el historial
                        completo de tickets del negocio y su satisfacción
                        promedio.
                      </p>
                    </div>
                  </div>
                </aside>
              </div>
            </div>
          ) : (
            <div className={s.emptyDetail}>
              <p className={s.emptyTitle}>Selecciona un ticket</p>
              <p className={s.emptyText}>
                El panel derecho mostrará el contexto, datos del negocio y
                sugerencias de respuesta.
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

function statusLabel(status: TicketStatus): string {
  switch (status) {
    case 'open':
      return 'Abierto';
    case 'inProgress':
      return 'En progreso';
    case 'waiting':
      return 'En espera';
    case 'solved':
      return 'Resuelto';
    case 'closed':
      return 'Cerrado';
  }
}

function priorityLabel(priority: TicketPriority): string {
  switch (priority) {
    case 'high':
      return 'Alta';
    case 'medium':
      return 'Media';
    case 'low':
      return 'Baja';
  }
}

function priorityClass(priority: TicketPriority): string {
  switch (priority) {
    case 'high':
      return s.priorityHigh;
    case 'medium':
      return s.priorityMedium;
    case 'low':
      return s.priorityLow;
  }
}

function channelLabel(channel: SupportTicket['channel']): string {
  switch (channel) {
    case 'inApp':
      return 'Centro de ayuda';
    case 'email':
      return 'Correo';
    case 'whatsapp':
      return 'WhatsApp';
  }
}
