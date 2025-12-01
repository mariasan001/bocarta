// src/features/microsite/components/MicrositeScreen/MicrositeScreen.tsx
'use client';

import { useState } from 'react';
import {
  Smartphone,
  MonitorSmartphone,
  Eye,
  EyeOff,
  LayoutTemplate,
  Image as ImageIcon,
  QrCode,
  Link2,
  Sparkles,
  Settings2,
} from 'lucide-react';

import s from './MicrositeScreen.module.css';

type Device = 'mobile' | 'desktop';

type VisibleKey = 'menu' | 'promos' | 'reviews' | 'discounts' | 'schedule' | 'contact';

type TemplateId = 'classic' | 'minimal';

type VisibleMap = Record<VisibleKey, boolean>;

const INITIAL_VISIBLE: VisibleMap = {
  menu: true,
  promos: true,
  reviews: true,
  discounts: true,
  schedule: true,
  contact: true,
};

export default function MicrositeScreen() {
  const [device, setDevice] = useState<Device>('mobile');
  const [template, setTemplate] = useState<TemplateId>('classic');
  const [visible, setVisible] = useState<VisibleMap>(INITIAL_VISIBLE);

  const accentColor = 'var(--bocarta-accent, #dcd917)';

  function toggleSection(key: VisibleKey) {
    setVisible((prev) => ({ ...prev, [key]: !prev[key] }));
  }

  return (
    <div className={s.layout}>
      {/* Header */}
      <header className={s.header}>
        <div className={s.headerLeft}>
          <div className={s.iconBadge}>
            <Smartphone size={18} />
          </div>
          <div>
            <h1 className={s.title}>Micrositio &amp; QR</h1>
            <p className={s.subtitle}>
              Ajusta cómo se ve tu menú público, oculta o muestra secciones y genera tus
              QRs principales y de campaña. Lo que ves aquí es casi lo mismo que ve tu
              cliente al escanear.
            </p>
          </div>
        </div>

        <div className={s.headerRight}>
          <button type="button" className={s.ghostBtn}>
            <Eye size={14} />
            Ver micrositio en nueva pestaña
          </button>
        </div>
      </header>

      {/* Grid principal: preview izquierda, panel derecho */}
      <div className={s.grid}>
        {/* Preview */}
        <section className={s.previewCard}>
          <div className={s.previewHeader}>
            <div className={s.previewHeaderLeft}>
              <span className={s.previewLabel}>Vista previa del micrositio</span>
              <span className={s.previewHint}>
                Responde a tus cambios de plantilla, secciones visibles y colores.
              </span>
            </div>

            <div className={s.previewControls}>
              <div className={s.deviceSwitch}>
                <button
                  type="button"
                  className={`${s.deviceBtn} ${
                    device === 'mobile' ? s.deviceBtnActive : ''
                  }`}
                  onClick={() => setDevice('mobile')}
                >
                  <Smartphone size={14} />
                </button>
                <button
                  type="button"
                  className={`${s.deviceBtn} ${
                    device === 'desktop' ? s.deviceBtnActive : ''
                  }`}
                  onClick={() => setDevice('desktop')}
                >
                  <MonitorSmartphone size={14} />
                </button>
              </div>
            </div>
          </div>

          <div
            className={`${s.previewFrame} ${
              device === 'mobile' ? s.previewFrameMobile : s.previewFrameDesktop
            }`}
          >
            {/* Phone / desktop placeholder */}
            <div
              className={`${s.phone} ${
                template === 'minimal' ? s.phoneMinimal : s.phoneClassic
              }`}
            >
              <div className={s.phoneHeader}>
                <div className={s.logoCircle}>TB</div>
                <div className={s.phoneHeaderTexts}>
                  <span className={s.phoneTitle}>Taquería El Barrio</span>
                  <span className={s.phoneSubtitle}>Tacos · Gringas · Volcanes</span>
                </div>
              </div>

              {/* Banner de promo si está activo */}
              {visible.discounts && (
                <div className={s.banner}>
                  <span className={s.bannerLabel}>Promo activa</span>
                  <span className={s.bannerText}>2x1 en tacos al pastor hoy 8–10 pm</span>
                </div>
              )}

              {/* Chips de secciones */}
              <div className={s.navChips}>
                {visible.menu && <span className={s.navChip}>Menú</span>}
                {visible.promos && <span className={s.navChip}>Promos</span>}
                {visible.reviews && <span className={s.navChip}>Reseñas</span>}
                {visible.schedule && <span className={s.navChip}>Horario &amp; mapa</span>}
              </div>

              {/* Bloque menú */}
              {visible.menu && (
                <div className={s.section}>
                  <div className={s.sectionHeader}>
                    <span className={s.sectionTitle}>Menú destacado</span>
                    <span className={s.sectionPill}>Vista cliente</span>
                  </div>

                  <div className={s.dishList}>
                    <div className={s.dishRow}>
                      <div>
                        <div className={s.dishName}>Taco pastor doble</div>
                        <div className={s.dishMeta}>Con piña · Medio picante</div>
                      </div>
                      <div className={s.dishRight}>
                        <span className={s.price}>$32</span>
                      </div>
                    </div>
                    <div className={s.dishRow}>
                      <div>
                        <div className={s.dishName}>Gringa de arrachera</div>
                        <div className={s.dishMeta}>Tortilla de harina · Queso</div>
                      </div>
                      <div className={s.dishRight}>
                        <span className={s.price}>$65</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Reseñas por platillo */}
              {visible.reviews && (
                <div className={s.section}>
                  <div className={s.sectionHeader}>
                    <span className={s.sectionTitle}>Reseñas recientes</span>
                  </div>
                  <div className={s.reviewBubble}>
                    <span className={s.reviewText}>
                      “Los tacos están increíbles, servicio rápido y súper amables.”
                    </span>
                    <span className={s.reviewMeta}>★ 4.8 · Ana · Hace 2 días</span>
                  </div>
                </div>
              )}

              {/* Horario / contacto */}
              {(visible.schedule || visible.contact) && (
                <div className={s.section}>
                  <div className={s.sectionHeader}>
                    <span className={s.sectionTitle}>Información del lugar</span>
                  </div>
                  {visible.schedule && (
                    <div className={s.infoRow}>
                      <span className={s.infoLabel}>Horario</span>
                      <span className={s.infoValue}>Lun–Dom · 1 pm – 12 am</span>
                    </div>
                  )}
                  {visible.contact && (
                    <div className={s.infoRow}>
                      <span className={s.infoLabel}>Ubicación</span>
                      <span className={s.infoValue}>Col. Centro · Toluca</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Panel de configuración */}
        <aside className={s.panel}>
          {/* Plantilla & branding */}
          <section className={s.panelCard}>
            <div className={s.panelHeader}>
              <div>
                <h2 className={s.panelTitle}>Plantilla &amp; branding</h2>
                <p className={s.panelText}>
                  Ajusta el estilo base del micrositio. Más adelante se conecta con el
                  branding real del negocio.
                </p>
              </div>
              <Settings2 size={16} className={s.panelIconSoft} />
            </div>

            <div className={s.templateGrid}>
              <TemplateCard
                label="Clásico Bocarta"
                description="Bloques con tarjetas, banner de promo y chips de secciones."
                icon={<LayoutTemplate size={16} />}
                active={template === 'classic'}
                accentColor={accentColor}
                onClick={() => setTemplate('classic')}
              />
              <TemplateCard
                label="Minimal limpio"
                description="Más aire, menos bordes. Ideal para menús sencillos."
                icon={<Sparkles size={16} />}
                active={template === 'minimal'}
                accentColor={accentColor}
                onClick={() => setTemplate('minimal')}
              />
            </div>

            <div className={s.fieldGroup}>
              <label className={s.fieldLabel}>Logo &amp; portada</label>
              <div className={s.inlineRow}>
                <button type="button" className={s.secondaryBtn}>
                  <ImageIcon size={14} />
                  Subir logo
                </button>
                <button type="button" className={s.secondaryBtn}>
                  <ImageIcon size={14} />
                  Portada del micrositio
                </button>
              </div>
              <p className={s.fieldHint}>
                Por ahora solo es visual. Luego se conecta a subida real de archivos.
              </p>
            </div>
          </section>

          {/* Secciones visibles */}
          <section className={s.panelCard}>
            <div className={s.panelHeader}>
              <div>
                <h2 className={s.panelTitle}>Secciones visibles</h2>
                <p className={s.panelText}>
                  Elige qué ve el cliente cuando abre tu micrositio. Puedes ocultar
                  módulos que aún no quieres usar.
                </p>
              </div>
            </div>

            <div className={s.toggleList}>
              <ToggleRow
                label="Menú"
                description="Categorías y platillos del negocio."
                checked={visible.menu}
                onChange={() => toggleSection('menu')}
              />
              <ToggleRow
                label="Promos"
                description="Promociones activas que vienen de la sección Promos y precios."
                checked={visible.promos}
                onChange={() => toggleSection('promos')}
              />
              <ToggleRow
                label="Banner de descuentos"
                description="Tiras superiores para comunicar campañas rápidas."
                checked={visible.discounts}
                onChange={() => toggleSection('discounts')}
              />
              <ToggleRow
                label="Reseñas"
                description="Opiniones que los clientes dejan desde el menú digital."
                checked={visible.reviews}
                onChange={() => toggleSection('reviews')}
              />
              <ToggleRow
                label="Horario & mapa"
                description="Ubicación y horarios de atención."
                checked={visible.schedule}
                onChange={() => toggleSection('schedule')}
              />
              <ToggleRow
                label="Contacto"
                description="Teléfono o links a redes sociales."
                checked={visible.contact}
                onChange={() => toggleSection('contact')}
              />
            </div>
          </section>

          {/* QRs */}
          <section className={s.panelCard}>
            <div className={s.panelHeader}>
              <div>
                <h2 className={s.panelTitle}>QR principal del menú</h2>
                <p className={s.panelText}>
                  Es el QR que va en mesas, barra y entrada. Siempre apunta al micrositio
                  actual.
                </p>
              </div>
              <QrCode size={16} className={s.panelIconSoft} />
            </div>

            <div className={s.qrRow}>
              <div className={s.qrPreviewBox}>
                <div className={s.qrFake} />
                <span className={s.qrLabel}>Previsualización</span>
              </div>
              <div className={s.qrActions}>
                <div className={s.urlBox}>
                  <span className={s.urlLabel}>URL del micrositio</span>
                  <div className={s.urlValueRow}>
                    <span className={s.urlValue}>bocarta.app/t/taqueria-el-barrio</span>
                    <button type="button" className={s.iconBtn} aria-label="Copiar URL">
                      <Link2 size={14} />
                    </button>
                  </div>
                </div>
                <div className={s.inlineRow}>
                  <button type="button" className={s.secondaryBtn}>
                    Descargar PNG
                  </button>
                  <button type="button" className={s.secondaryBtn}>
                    Descargar SVG
                  </button>
                </div>
                <p className={s.fieldHint}>
                  En producción este botón regenerará el QR con parámetros nuevos (UTMs,
                  campaña, etc.).
                </p>
              </div>
            </div>
          </section>

          {/* QRs de campañas */}
          <section className={s.panelCard}>
            <div className={s.panelHeader}>
              <div>
                <h2 className={s.panelTitle}>QRs de campaña</h2>
                <p className={s.panelText}>
                  Crea QRs especiales para promos puntuales: redes sociales, flyers o
                  mesas específicas.
                </p>
              </div>
            </div>

            <div className={s.campaignBox}>
              <p className={s.campaignText}>
                Más adelante podrás conectar estos QRs con Promos y precios para medir
                qué campaña trae más visitas.
              </p>
              <button type="button" className={s.primaryBtn}>
                <Sparkles size={14} />
                Crear QR de campaña
              </button>
            </div>
          </section>
        </aside>
      </div>
    </div>
  );
}

/* ===== Subcomponentes internos ===== */

type TemplateCardProps = {
  label: string;
  description: string;
  icon: React.ReactNode;
  active: boolean;
  accentColor: string;
  onClick: () => void;
};

function TemplateCard({
  label,
  description,
  icon,
  active,
  accentColor,
  onClick,
}: TemplateCardProps) {
  return (
    <button
      type="button"
      className={`${s.templateCard} ${active ? s.templateCardActive : ''}`}
      onClick={onClick}
    >
      <div className={s.templateIcon} style={{ background: active ? accentColor : '#f4f4f4' }}>
        {icon}
      </div>
      <div className={s.templateTexts}>
        <span className={s.templateLabel}>{label}</span>
        <span className={s.templateDescription}>{description}</span>
      </div>
    </button>
  );
}

type ToggleRowProps = {
  label: string;
  description: string;
  checked: boolean;
  onChange: () => void;
};

function ToggleRow({ label, description, checked, onChange }: ToggleRowProps) {
  return (
    <div className={s.toggleRow}>
      <div className={s.toggleTexts}>
        <span className={s.toggleLabel}>{label}</span>
        <span className={s.toggleDescription}>{description}</span>
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        className={`${s.toggleSwitch} ${checked ? s.toggleSwitchOn : ''}`}
        onClick={onChange}
      >
        <div className={s.toggleThumb} />
        <span className={s.toggleIcon}>{checked ? <Eye size={12} /> : <EyeOff size={12} />}</span>
      </button>
    </div>
  );
}
