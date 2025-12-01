// src/features/home/components/NoticesCard/NoticesCard.tsx
'use client';

import { useState } from 'react';
import { AlertTriangle, Plus, Clock, X } from 'lucide-react';

import s from './NoticesCard.module.css';

type NoticeType = 'highTraffic' | 'earlyClose' | 'custom';

type Notice = {
  id: string;
  type: NoticeType;
  title: string;
  message: string;
  active: boolean;
  scope: 'today' | 'range';
};

const seedNotices: Notice[] = [
  {
    id: '1',
    type: 'highTraffic',
    title: 'Afluencia alta',
    message:
      'Hoy tenemos mucha demanda, tu orden puede tardar un poco más de lo normal 🕒',
    active: true,
    scope: 'today',
  },
  {
    id: '2',
    type: 'earlyClose',
    title: 'Cerramos más temprano',
    message: 'Este viernes cerramos a las 19:00 por evento privado.',
    active: false,
    scope: 'range',
  },
];

export default function NoticesCard() {
  const [notices, setNotices] = useState<Notice[]>(seedNotices);
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState<Notice | null>(null);

  function openNewModal() {
    setDraft({
      id: String(Date.now()),
      type: 'highTraffic',
      title: 'Afluencia alta',
      message:
        'Hoy tenemos mucha demanda, tu orden puede tardar un poco más de lo normal 🕒',
      active: true,
      scope: 'today',
    });
    setOpen(true);
  }

  function handleEdit(n: Notice) {
    setDraft(n);
    setOpen(true);
  }

  function handleToggleActive(id: string) {
    setNotices((prev) =>
      prev.map((n) => (n.id === id ? { ...n, active: !n.active } : n)),
    );
  }

  function handleDelete(id: string) {
    setNotices((prev) => prev.filter((n) => n.id !== id));
  }

  function handleCancel() {
    setOpen(false);
    setDraft(null);
  }

  function handleSave() {
    if (!draft) return;
    setNotices((prev) => {
      const exists = prev.some((n) => n.id === draft.id);
      if (exists) {
        return prev.map((n) => (n.id === draft.id ? draft : n));
      }
      return [draft, ...prev];
    });
    setOpen(false);
    setDraft(null);
  }

  function handleTypeChange(type: NoticeType) {
    if (!draft) return;
    let next = { ...draft, type };

    if (type === 'highTraffic') {
      next.title = 'Afluencia alta';
      next.message =
        'Hoy tenemos mucha demanda, tu orden puede tardar un poco más de lo normal 🕒';
    } else if (type === 'earlyClose') {
      next.title = 'Cerramos más temprano';
      next.message =
        'Hoy cerraremos antes de lo habitual. Te recomendamos hacer tu pedido con anticipación.';
    } else {
      // custom
      if (next.title === 'Afluencia alta' || next.title === 'Cerramos más temprano') {
        next.title = '';
      }
    }

    setDraft(next);
  }

  return (
    <div className={s.card}>
      {/* Header */}
      <div className={s.header}>
        <div className={s.headerLeft}>
          <div className={s.iconBadge}>
            <AlertTriangle size={16} />
          </div>
          <div>
            <h2 className={s.title}>Avisos para tus clientes</h2>
            <p className={s.subtitle}>
              Mensajes cortos que aparecerán arriba de tu menú digital para avisar
              de afluencia, cambios de horario o notas especiales del día.
            </p>
          </div>
        </div>

        <div className={s.headerRight}>
          <button
            type="button"
            className={s.ghostBtn}
            onClick={openNewModal}
          >
            <Plus size={14} />
            Nuevo aviso
          </button>
        </div>
      </div>

      {/* Lista de avisos */}
      {notices.length === 0 ? (
        <div className={s.empty}>
          <p className={s.emptyTitle}>Sin avisos activos</p>
          <p className={s.emptyText}>
            Cuando crees un aviso, tus clientes lo verán en la parte superior del
            menú digital. Úsalo para comunicar cierres especiales o tiempos de espera.
          </p>
          <button
            type="button"
            className={s.primaryBtn}
            onClick={openNewModal}
          >
            <Plus size={14} />
            Crear primer aviso
          </button>
        </div>
      ) : (
        <ul className={s.list}>
          {notices.map((notice) => (
            <li key={notice.id} className={s.item}>
              <div className={s.itemMain}>
                <div className={s.itemTitleRow}>
                  <span className={s.badge}>
                    {notice.type === 'highTraffic' && 'Afluencia alta'}
                    {notice.type === 'earlyClose' && 'Cierre temprano'}
                    {notice.type === 'custom' && 'Mensaje personalizado'}
                  </span>

                  {notice.scope === 'today' ? (
                    <span className={s.chipScope}>
                      <Clock size={12} />
                      Solo hoy
                    </span>
                  ) : (
                    <span className={s.chipScopeMuted}>
                      <Clock size={12} />
                      Rango de fechas
                    </span>
                  )}
                </div>

                <div className={s.itemTextBlock}>
                  <p className={s.itemTitle}>{notice.title || 'Sin título'}</p>
                  <p className={s.itemMessage}>{notice.message}</p>
                </div>
              </div>

              <div className={s.itemActions}>
                <label className={s.switchLabel}>
                  <input
                    type="checkbox"
                    checked={notice.active}
                    onChange={() => handleToggleActive(notice.id)}
                  />
                  <span>{notice.active ? 'Mostrando en menú' : 'Oculto'}</span>
                </label>

                <div className={s.itemButtons}>
                  <button
                    type="button"
                    className={s.textBtn}
                    onClick={() => handleEdit(notice)}
                  >
                    Editar
                  </button>
                  <button
                    type="button"
                    className={s.textBtnDanger}
                    onClick={() => handleDelete(notice.id)}
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}

      {/* Modal crear/editar */}
      {open && draft && (
        <div className={s.modalBackdrop}>
          <div className={s.modal}>
            <div className={s.modalHeader}>
              <h3 className={s.modalTitle}>
                {seedNotices.some((n) => n.id === draft.id)
                  ? 'Editar aviso'
                  : 'Nuevo aviso'}
              </h3>
              <button
                type="button"
                className={s.iconBtn}
                onClick={handleCancel}
              >
                <X size={14} />
              </button>
            </div>

            {/* Tipo de aviso */}
            <div className={s.modalSection}>
              <p className={s.label}>Tipo de aviso</p>
              <div className={s.typeGrid}>
                <button
                  type="button"
                  className={`${s.typeCard} ${
                    draft.type === 'highTraffic' ? s.typeCardActive : ''
                  }`}
                  onClick={() => handleTypeChange('highTraffic')}
                >
                  <span className={s.typeTitle}>Afluencia alta</span>
                  <span className={s.typeText}>
                    Para días en los que hay mucha gente y el servicio va más lento.
                  </span>
                </button>

                <button
                  type="button"
                  className={`${s.typeCard} ${
                    draft.type === 'earlyClose' ? s.typeCardActive : ''
                  }`}
                  onClick={() => handleTypeChange('earlyClose')}
                >
                  <span className={s.typeTitle}>Cierre temprano</span>
                  <span className={s.typeText}>
                    Úsalo cuando vas a cerrar antes por evento, mantenimiento, etc.
                  </span>
                </button>

                <button
                  type="button"
                  className={`${s.typeCard} ${
                    draft.type === 'custom' ? s.typeCardActive : ''
                  }`}
                  onClick={() => handleTypeChange('custom')}
                >
                  <span className={s.typeTitle}>Mensaje personalizado</span>
                  <span className={s.typeText}>
                    Para cualquier otro aviso que quieras mostrar a tus clientes.
                  </span>
                </button>
              </div>
            </div>

            {/* Contenido */}
            <div className={s.modalSection}>
              <label className={s.label}>
                Título visible
                <input
                  className={s.input}
                  value={draft.title}
                  onChange={(e) =>
                    setDraft({ ...draft, title: e.target.value })
                  }
                  placeholder="Ej. Hoy cerramos a las 7:00 pm"
                />
              </label>

              <label className={s.label}>
                Mensaje para tus clientes
                <textarea
                  className={s.textarea}
                  value={draft.message}
                  onChange={(e) =>
                    setDraft({ ...draft, message: e.target.value })
                  }
                  placeholder="Ej. Hoy hay evento privado, tu orden puede tardar unos minutos extra."
                  rows={3}
                />
              </label>
            </div>

            {/* Alcance */}
            <div className={s.modalSection}>
              <p className={s.label}>¿Hasta cuándo se mostrará?</p>
              <div className={s.pillRow}>
                <button
                  type="button"
                  className={`${s.pill} ${
                    draft.scope === 'today' ? s.pillActive : ''
                  }`}
                  onClick={() =>
                    setDraft({ ...draft, scope: 'today' })
                  }
                >
                  Solo hoy
                </button>
                <button
                  type="button"
                  className={`${s.pill} ${
                    draft.scope === 'range' ? s.pillActive : ''
                  }`}
                  onClick={() =>
                    setDraft({ ...draft, scope: 'range' })
                  }
                >
                  Rango de fechas
                </button>
              </div>
              {draft.scope === 'range' && (
                <p className={s.rangeHint}>
                  Más adelante aquí podrás elegir fechas exactas desde el
                  calendario de Bocarta.
                </p>
              )}
            </div>

            {/* Footer modal */}
            <div className={s.modalFooter}>
              <button
                type="button"
                className={s.ghostBtn}
                onClick={handleCancel}
              >
                Cancelar
              </button>
              <button
                type={draft.active ? 'submit' : 'button'}
                className={s.primaryBtn}
                onClick={handleSave}
              >
                Guardar aviso
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
