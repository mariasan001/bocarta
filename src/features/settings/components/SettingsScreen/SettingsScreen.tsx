// src/features/settings/components/SettingsScreen/SettingsScreen.tsx
'use client';

import { useState } from 'react';
import {
  Settings,
  Store,
  Globe2,
  Bell,
  Shield,
  Mail,
  Smartphone,
  MoonStar,
  SunMedium,
  Trash2,
} from 'lucide-react';

import s from './SettingsScreen.module.css';

type MicrositeStyle = 'compacto' | 'visual' | 'destacado';

export default function SettingsScreen() {
  const [micrositeStyle, setMicrositeStyle] = useState<MicrositeStyle>('visual');
  const [darkModeMicrosite, setDarkModeMicrosite] = useState(false);
  const [showPictures, setShowPictures] = useState(true);
  const [showDecimals, setShowDecimals] = useState(true);
  const [emailWeekly, setEmailWeekly] = useState(true);
  const [emailReviews, setEmailReviews] = useState(true);
  const [emailBilling, setEmailBilling] = useState(true);

  return (
    <div className={s.layout}>
      {/* Header */}
      <header className={s.header}>
        <div className={s.headerLeft}>
          <div className={s.iconBadge}>
            <Settings size={18} />
          </div>
          <div>
            <h1 className={s.title}>Configuración</h1>
            <p className={s.subtitle}>
              Ajusta la identidad del negocio, la apariencia del menú, las notificaciones
              y la seguridad de tu cuenta.
            </p>
          </div>
        </div>

        <div className={s.headerRight}>
          <button type="button" className={s.ghostBtn}>
            Restaurar valores sugeridos
          </button>
          <button type="button" className={s.primaryBtn}>
            Guardar cambios
          </button>
        </div>
      </header>

      {/* Resumen superior */}
      <section className={s.summaryStrip}>
        <article className={s.summaryCard}>
          <span className={s.summaryLabel}>Negocio</span>
          <span className={s.summaryValue}>Taquería El Barrio</span>
          <span className={s.summaryNote}>Plan Fuerte · 2 sucursales activas</span>
        </article>

        <article className={s.summaryCard}>
          <span className={s.summaryLabel}>Zona &amp; formato</span>
          <span className={s.summaryValue}>CDMX (GMT-6)</span>
          <span className={s.summaryNote}>Idioma: Español · Moneda: MXN</span>
        </article>

        <article className={s.summaryCard}>
          <span className={s.summaryLabel}>Notificaciones</span>
          <span className={s.summaryValue}>
            {emailWeekly || emailReviews || emailBilling ? 'Activas' : 'Inactivas'}
          </span>
          <span className={s.summaryNote}>Resúmenes, reseñas y pagos</span>
        </article>
      </section>

      <div className={s.grid}>
        {/* Columna izquierda: negocio + menú */}
        <section className={s.main}>
          {/* Perfil del negocio */}
          <section className={s.card}>
            <header className={s.cardHeader}>
              <div className={s.cardTitleRow}>
                <Store size={16} />
                <div>
                  <h2 className={s.cardTitle}>Perfil del negocio</h2>
                  <p className={s.cardText}>
                    Estos datos se usan en tu micrositio, QR y algunas comunicaciones.
                  </p>
                </div>
              </div>
            </header>

            <div className={s.formGrid}>
              <div className={s.formField}>
                <label className={s.label}>Nombre del negocio</label>
                <input
                  className={s.input}
                  defaultValue="Taquería El Barrio"
                  placeholder="Ej. Taquería El Barrio"
                />
              </div>

              <div className={s.formField}>
                <label className={s.label}>Tipo de negocio</label>
                <select className={s.select} defaultValue="taqueria">
                  <option value="taqueria">Taquería</option>
                  <option value="cafe">Café</option>
                  <option value="bar">Bar</option>
                  <option value="foodtruck">Food truck</option>
                  <option value="restaurante">Restaurante</option>
                </select>
              </div>

              <div className={s.formField}>
                <label className={s.label}>Ciudad / colonia</label>
                <input
                  className={s.input}
                  defaultValue="Toluca · Col. Centro"
                  placeholder="Ej. Toluca · Col. Centro"
                />
              </div>

              <div className={s.formField}>
                <label className={s.label}>Teléfono de contacto</label>
                <input
                  className={s.input}
                  defaultValue="722 123 45 67"
                  placeholder="Ej. 55 1234 5678"
                />
              </div>
            </div>

            <div className={s.formGridCompact}>
              <div className={s.formField}>
                <label className={s.label}>Zona horaria</label>
                <div className={s.inputWithIcon}>
                  <Globe2 size={14} className={s.inputIcon} />
                  <select className={s.selectBare} defaultValue="cdmx">
                    <option value="cdmx">CDMX (GMT-6)</option>
                    <option value="monterrey">Monterrey (GMT-6)</option>
                    <option value="tijuana">Tijuana (GMT-8)</option>
                  </select>
                </div>
              </div>

              <div className={s.formField}>
                <label className={s.label}>Idioma &amp; moneda</label>
                <div className={s.inlineTags}>
                  <span className={s.tag}>Español</span>
                  <span className={s.tag}>MXN</span>
                </div>
                <p className={s.hint}>Por ahora Bocarta opera en MXN.</p>
              </div>
            </div>
          </section>

          {/* Preferencias del menú */}
          <section className={s.card}>
            <header className={s.cardHeader}>
              <div className={s.cardTitleRow}>
                <Globe2 size={16} />
                <div>
                  <h2 className={s.cardTitle}>Preferencias del menú digital</h2>
                  <p className={s.cardText}>
                    Controla cómo se ve y se siente tu menú para tus clientes.
                  </p>
                </div>
              </div>
            </header>

            <div className={s.sectionBlock}>
              <h3 className={s.sectionTitle}>Estilo del micrositio</h3>
              <div className={s.styleChips}>
                <StyleChip
                  label="Compacto"
                  description="Lista rápida, ideal para servicio muy ágil."
                  active={micrositeStyle === 'compacto'}
                  onClick={() => setMicrositeStyle('compacto')}
                />
                <StyleChip
                  label="Visual"
                  description="Fotos visibles y secciones claras."
                  active={micrositeStyle === 'visual'}
                  onClick={() => setMicrositeStyle('visual')}
                />
                <StyleChip
                  label="Destacado"
                  description="Platillos estrella bien marcados."
                  active={micrositeStyle === 'destacado'}
                  onClick={() => setMicrositeStyle('destacado')}
                />
              </div>
            </div>

            <div className={s.sectionBlock}>
              <h3 className={s.sectionTitle}>Contenido que se muestra</h3>
              <div className={s.toggleList}>
                <ToggleRow
                  label="Mostrar fotos de platillos en el listado"
                  description="Recomendado para antojar; puedes ocultarlas si el internet es lento."
                  active={showPictures}
                  onToggle={() => setShowPictures((v) => !v)}
                />
                <ToggleRow
                  label="Mostrar precios con $ y decimales"
                  description="Ej. $42.00 en lugar de 42."
                  active={showDecimals}
                  onToggle={() => setShowDecimals((v) => !v)}
                />
                <ToggleRow
                  label="Resaltar platillos estrella"
                  description="Muestra una insignia en tus platillos más vendidos."
                  active={true}
                  onToggle={() => {}}
                  locked
                />
              </div>
            </div>

            <div className={s.sectionBlock}>
              <h3 className={s.sectionTitle}>Tema del micrositio</h3>
              <div className={s.themeRow}>
                <div className={s.themePreview}>
                  <div className={s.themeSwatchLight} />
                  <span className={s.themeLabel}>
                    Vista previa modo{' '}
                    {darkModeMicrosite ? 'oscuro (beta)' : 'claro'}
                  </span>
                </div>
                <button
                  type="button"
                  className={s.switchBtn}
                  onClick={() => setDarkModeMicrosite((v) => !v)}
                >
                  <span className={s.switchLabel}>
                    {darkModeMicrosite ? 'Modo oscuro' : 'Modo claro'}
                  </span>
                  <span
                    className={`${s.switchTrack} ${
                      darkModeMicrosite ? s.switchTrackOn : ''
                    }`}
                  >
                    <span
                      className={`${s.switchThumb} ${
                        darkModeMicrosite ? s.switchThumbOn : ''
                      }`}
                    >
                      {darkModeMicrosite ? (
                        <MoonStar size={11} />
                      ) : (
                        <SunMedium size={11} />
                      )}
                    </span>
                  </span>
                </button>
              </div>
              <p className={s.hint}>
                El tema del dashboard se mantiene neutro. Aquí controlas solo cómo se ve
                tu menú público.
              </p>
            </div>
          </section>
        </section>

        {/* Columna derecha: notificaciones + seguridad */}
        <aside className={s.side}>
          {/* Notificaciones */}
          <section className={s.card}>
            <header className={s.cardHeader}>
              <div className={s.cardTitleRow}>
                <Bell size={16} />
                <div>
                  <h2 className={s.cardTitle}>Notificaciones</h2>
                  <p className={s.cardText}>
                    Elige qué correos quieres recibir de Bocarta.
                  </p>
                </div>
              </div>
            </header>

            <div className={s.formField}>
              <label className={s.label}>Correo principal</label>
              <div className={s.inputWithIcon}>
                <Mail size={14} className={s.inputIcon} />
                <input
                  className={s.inputBare}
                  defaultValue="admin@elbarrio.mx"
                  placeholder="Correo para notificaciones"
                />
              </div>
            </div>

            <div className={s.toggleList}>
              <ToggleRow
                label="Resumen semanal de actividad"
                description="Visitas, platillos más vistos y desempeño de promos."
                active={emailWeekly}
                onToggle={() => setEmailWeekly((v) => !v)}
              />
              <ToggleRow
                label="Nueva reseña recibida"
                description="Te avisamos cuando alguien deje un comentario desde el menú."
                active={emailReviews}
                onToggle={() => setEmailReviews((v) => !v)}
              />
              <ToggleRow
                label="Alertas de pago y facturación"
                description="Cobros fallidos, cambio de plan y facturas listas."
                active={emailBilling}
                onToggle={() => setEmailBilling((v) => !v)}
              />
            </div>
          </section>

          {/* Seguridad */}
          <section className={s.card}>
            <header className={s.cardHeader}>
              <div className={s.cardTitleRow}>
                <Shield size={16} />
                <div>
                  <h2 className={s.cardTitle}>Acceso &amp; seguridad</h2>
                  <p className={s.cardText}>
                    Control básico de acceso. Para roles del equipo usa la sección
                    &ldquo;Equipo&rdquo;.
                  </p>
                </div>
              </div>
            </header>

            <div className={s.formField}>
              <label className={s.label}>Correo de inicio de sesión</label>
              <div className={s.inlineTags}>
                <span className={s.tagStrong}>admin@elbarrio.mx</span>
              </div>
              <p className={s.hint}>Este correo pertenece al Owner del negocio.</p>
            </div>

            <div className={s.actionsColumn}>
              <button type="button" className={s.secondaryBtnFull}>
                Cambiar contraseña
              </button>
              <button type="button" className={s.secondaryBtnFull}>
                Cerrar sesión en otros dispositivos
              </button>
              <button type="button" className={s.secondaryBtnFull}>
                Configurar autenticación en dos pasos (próximamente)
              </button>
            </div>

            <div className={s.divider} />

            <div className={s.formField}>
              <label className={s.label}>Acceso móvil</label>
              <div className={s.inlineRow}>
                <Smartphone size={14} />
                <span className={s.inlineText}>
                  Bocarta funciona perfecto desde tu celular. Usa el mismo correo y
                  contraseña.
                </span>
              </div>
            </div>
          </section>

          {/* Zona de peligro */}
          <section className={s.cardDanger}>
            <div className={s.cardDangerHeader}>
              <Trash2 size={14} />
              <span className={s.cardDangerTitle}>Zona sensible</span>
            </div>
            <p className={s.cardDangerText}>
              Si necesitas pausar o eliminar el negocio en Bocarta, escríbenos primero
              para revisar alternativas.
            </p>
            <button type="button" className={s.dangerBtn}>
              Solicitar eliminación de negocio
            </button>
          </section>
        </aside>
      </div>
    </div>
  );
}

/* ===== Subcomponentes internos ===== */

type StyleChipProps = {
  label: string;
  description: string;
  active: boolean;
  onClick: () => void;
};

function StyleChip({ label, description, active, onClick }: StyleChipProps) {
  return (
    <button
      type="button"
      className={`${s.styleChip} ${active ? s.styleChipActive : ''}`}
      onClick={onClick}
    >
      <span className={s.styleChipLabel}>{label}</span>
      <span className={s.styleChipDescription}>{description}</span>
    </button>
  );
}

type ToggleRowProps = {
  label: string;
  description: string;
  active: boolean;
  onToggle: () => void;
  locked?: boolean;
};

function ToggleRow({ label, description, active, onToggle, locked }: ToggleRowProps) {
  return (
    <div className={s.toggleRow}>
      <div className={s.toggleTexts}>
        <span className={s.toggleLabel}>{label}</span>
        <span className={s.toggleDescription}>{description}</span>
      </div>
      <button
        type="button"
        className={`${s.switchBtn} ${locked ? s.switchBtnLocked : ''}`}
        onClick={locked ? undefined : onToggle}
      >
        <span className={s.switchTrack}>
          <span
            className={`${s.switchThumb} ${
              active ? s.switchThumbOnSimple : s.switchThumbOff
            }`}
          />
        </span>
      </button>
    </div>
  );
}
