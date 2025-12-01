// src/features/admin/components/AdminSettingsScreen/AdminSettingsScreen.tsx
'use client';

import { useState } from 'react';
import {
  Settings,
  Globe2,
  CreditCard,
  Mail,
  Bell,
  ShieldCheck,
  Clock,
  Database,
  ArrowRight,
} from 'lucide-react';

import s from './AdminSettingsScreen.module.css';

export default function AdminSettingsScreen() {
  const [trialDays, setTrialDays] = useState(14);
  const [paymentsTestMode, setPaymentsTestMode] = useState(true);
  const [supportCanExtendTrial, setSupportCanExtendTrial] = useState(true);
  const [weeklyDigest, setWeeklyDigest] = useState(true);
  const [showBocartaBranding, setShowBocartaBranding] = useState(true);

  return (
    <div className={s.layout}>
      {/* HEADER */}
      <header className={s.header}>
        <div className={s.headerLeft}>
          <div className={s.iconBadge}>
            <Settings size={18} />
          </div>
          <div>
            <h1 className={s.title}>Configuración de plataforma</h1>
            <p className={s.subtitle}>
              Ajustes globales de Bocarta: reglas por defecto para nuevos
              negocios, integraciones de pago, correo y cómo se ve la marca
              Bocarta dentro de cada menú.
            </p>
          </div>
        </div>

        <div className={s.headerRight}>
          <div className={s.metaRow}>
            <div className={s.metaItem}>
              <span className={s.metaLabel}>Último cambio</span>
              <span className={s.metaValue}>Hace 3 horas</span>
            </div>
            <div className={s.metaItem}>
              <span className={s.metaLabel}>Admin actual</span>
              <span className={s.metaValue}>Owner Bocarta</span>
            </div>
          </div>
          <button type="button" className={s.primaryBtn}>
            Guardar cambios
          </button>
        </div>
      </header>

      {/* GRID PRINCIPAL */}
      <div className={s.grid}>
        {/* COLUMNA IZQUIERDA */}
        <section className={s.colMain}>
          {/* Reglas generales */}
          <div className={s.card}>
            <div className={s.cardHeader}>
              <div className={s.cardTitleRow}>
                <span className={s.cardIconWrap}>
                  <Globe2 size={14} />
                </span>
                <div>
                  <h2 className={s.cardTitle}>Reglas generales</h2>
                  <p className={s.cardText}>
                    Lo que ves aquí se aplica por defecto a todos los nuevos
                    negocios que se registran en Bocarta.
                  </p>
                </div>
              </div>
            </div>

            <div className={s.formGrid}>
              <div className={s.field}>
                <label className={s.label}>
                  Zona horaria por defecto
                </label>
                <div className={s.selectWrapper}>
                  <select className={s.select}>
                    <option>América/México_City (CDMX)</option>
                    <option>América/Monterrey</option>
                    <option>América/Guadalajara</option>
                  </select>
                </div>
                <p className={s.fieldHint}>
                  Los reportes y los horarios felices se calculan con esta
                  zona horaria si el negocio no personaliza la suya.
                </p>
              </div>

              <div className={s.fieldInline}>
                <div className={s.field}>
                  <label className={s.label}>
                    Días de prueba para nuevos negocios
                  </label>
                  <input
                    type="number"
                    min={0}
                    className={s.input}
                    value={trialDays}
                    onChange={(e) =>
                      setTrialDays(Number(e.target.value) || 0)
                    }
                  />
                  <p className={s.fieldHint}>
                    Se aplicará al plan de entrada cuando se active el
                    registro público.
                  </p>
                </div>

                <div className={s.field}>
                  <label className={s.label}>Moneda principal</label>
                  <div className={s.selectWrapper}>
                    <select className={s.select}>
                      <option>MXN · Peso mexicano</option>
                      <option>USD · Dólar estadounidense</option>
                    </select>
                  </div>
                  <p className={s.fieldHint}>
                    Afecta cómo se muestran precios y reportes de ingresos.
                  </p>
                </div>
              </div>

              <div className={s.field}>
                <label className={s.label}>Base de datos de países</label>
                <div className={s.pillRow}>
                  <button type="button" className={s.pillButtonActive}>
                    LATAM foco <Database size={12} />
                  </button>
                  <button type="button" className={s.pillButtonGhost}>
                    Global (futuro)
                  </button>
                </div>
                <p className={s.fieldHint}>
                  Por ahora la experiencia está optimizada para negocios de
                  México y LATAM.
                </p>
              </div>
            </div>
          </div>

          {/* Pagos & facturación */}
          <div className={s.card}>
            <div className={s.cardHeader}>
              <div className={s.cardTitleRow}>
                <span className={s.cardIconWrap}>
                  <CreditCard size={14} />
                </span>
                <div>
                  <h2 className={s.cardTitle}>Pagos & facturación</h2>
                  <p className={s.cardText}>
                    Ajustes globales de cómo Bocarta cobra suscripciones a
                    los negocios.
                  </p>
                </div>
              </div>
            </div>

            <div className={s.formGrid}>
              <div className={s.fieldInline}>
                <div className={s.field}>
                  <label className={s.label}>Proveedor de pagos</label>
                  <div className={s.selectWrapper}>
                    <select className={s.select}>
                      <option>Stripe</option>
                      <option>Mercado Pago (futuro)</option>
                    </select>
                  </div>
                  <p className={s.fieldHint}>
                    Esta pantalla solo simula la configuración. Más adelante
                    se conectará con claves reales.
                  </p>
                </div>

                <div className={s.field}>
                  <label className={s.label}>Modo de entorno</label>
                  <div className={s.toggleRow}>
                    <label className={s.toggleLabel}>
                      <input
                        type="checkbox"
                        checked={paymentsTestMode}
                        onChange={() =>
                          setPaymentsTestMode((v) => !v)
                        }
                      />
                      <span>Usar modo prueba para nuevos cobros</span>
                    </label>
                    <span className={s.badgeWarning}>
                      Solo test
                    </span>
                  </div>
                  <p className={s.fieldHint}>
                    Ideal mientras se hacen pruebas con cuentas de prueba
                    antes del lanzamiento público.
                  </p>
                </div>
              </div>

              <div className={s.field}>
                <label className={s.label}>
                  Permisos especiales para soporte
                </label>
                <label className={s.toggleLabel}>
                  <input
                    type="checkbox"
                    checked={supportCanExtendTrial}
                    onChange={() =>
                      setSupportCanExtendTrial((v) => !v)
                    }
                  />
                  <span>
                    Permitir que soporte extienda el trial hasta{' '}
                    <strong>+7 días</strong>
                  </span>
                </label>
                <p className={s.fieldHint}>
                  Estas reglas definen hasta dónde puede llegar el equipo de
                  soporte sin intervención directa del owner.
                </p>
              </div>
            </div>
          </div>

          {/* Correos & notificaciones */}
          <div className={s.card}>
            <div className={s.cardHeader}>
              <div className={s.cardTitleRow}>
                <span className={s.cardIconWrap}>
                  <Mail size={14} />
                </span>
                <div>
                  <h2 className={s.cardTitle}>Correos & notificaciones</h2>
                  <p className={s.cardText}>
                    Desde aquí se define cómo llegan los correos de Bocarta:
                    facturas, avisos de plan, alertas de uso, etc.
                  </p>
                </div>
              </div>
            </div>

            <div className={s.formGrid}>
              <div className={s.fieldInline}>
                <div className={s.field}>
                  <label className={s.label}>Remitente principal</label>
                  <input
                    className={s.input}
                    defaultValue="Bocarta <hola@bocarta.app>"
                  />
                  <p className={s.fieldHint}>
                    Lo que verán los dueños de negocio cuando reciban un
                    correo del sistema.
                  </p>
                </div>
                <div className={s.field}>
                  <label className={s.label}>Correo de soporte</label>
                  <input
                    className={s.input}
                    defaultValue="soporte@bocarta.app"
                  />
                  <p className={s.fieldHint}>
                    Se usará como reply-to en la mayoría de los mensajes.
                  </p>
                </div>
              </div>

              <div className={s.fieldInline}>
                <div className={s.field}>
                  <label className={s.label}>
                    Digest de actividad para negocios
                  </label>
                  <label className={s.toggleLabel}>
                    <input
                      type="checkbox"
                      checked={weeklyDigest}
                      onChange={() => setWeeklyDigest((v) => !v)}
                    />
                    <span>
                      Enviar resumen semanal de visitas, reseñas y promos
                      usadas
                    </span>
                  </label>
                  <p className={s.fieldHint}>
                    Solo se enviará a negocios con actividad suficiente en
                    la semana.
                  </p>
                </div>

                <div className={s.field}>
                  <label className={s.label}>Frecuencia por defecto</label>
                  <div className={s.selectWrapper}>
                    <select className={s.select}>
                      <option>Semanal</option>
                      <option>Quincenal</option>
                      <option>Mensual</option>
                    </select>
                  </div>
                  <p className={s.fieldHint}>
                    El negocio podrá ajustar esto desde su propia
                    configuración.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* COLUMNA DERECHA */}
        <section className={s.colSide}>
          {/* Identidad Bocarta en el menú */}
          <div className={s.card}>
            <div className={s.cardHeader}>
              <div className={s.cardTitleRow}>
                <span className={s.cardIconWrap}>
                  <Bell size={14} />
                </span>
                <div>
                  <h2 className={s.cardTitle}>Identidad Bocarta</h2>
                  <p className={s.cardText}>
                    Cómo aparece la marca Bocarta dentro del menú digital
                    del restaurante.
                  </p>
                </div>
              </div>
            </div>

            <div className={s.field}>
              <label className={s.label}>Branding en menú digital</label>
              <label className={s.toggleLabel}>
                <input
                  type="checkbox"
                  checked={showBocartaBranding}
                  onChange={() =>
                    setShowBocartaBranding((v) => !v)
                  }
                />
                <span>
                  Mostrar “Hecho con Bocarta” en el pie del menú
                </span>
              </label>
              <p className={s.fieldHint}>
                Sirve como pequeño crédito y puede ayudar a traer nuevos
                negocios. Más adelante podrás ajustar esto por plan.
              </p>
            </div>

            <div className={s.fieldInline}>
              <div className={s.field}>
                <label className={s.label}>Color de acento Bocarta</label>
                <div className={s.accentPreviewRow}>
                  <div className={s.accentDot} />
                  <span className={s.accentCode}>
                    #DCD917 (Bocarta)
                  </span>
                </div>
                <p className={s.fieldHint}>
                  Usado en chips, pequeños detalles y CTA secundarios dentro
                  del panel.
                </p>
              </div>
              <div className={s.field}>
                <label className={s.label}>Versión de logo</label>
                <div className={s.selectWrapper}>
                  <select className={s.select}>
                    <option>Logotipo horizontal</option>
                    <option>Isotipo + texto</option>
                  </select>
                </div>
                <p className={s.fieldHint}>
                  Solo visual. El archivo real se configurará cuando
                  conectemos el asset manager.
                </p>
              </div>
            </div>
          </div>

          {/* Seguridad & acceso */}
          <div className={s.card}>
            <div className={s.cardHeader}>
              <div className={s.cardTitleRow}>
                <span className={s.cardIconWrap}>
                  <ShieldCheck size={14} />
                </span>
                <div>
                  <h2 className={s.cardTitle}>Seguridad & acceso</h2>
                  <p className={s.cardText}>
                    Políticas generales de seguridad para roles internos de
                    Bocarta.
                  </p>
                </div>
              </div>
            </div>

            <div className={s.field}>
              <label className={s.label}>Sesiones</label>
              <p className={s.inlineText}>
                Duración de sesión para roles internos:
                <strong> 12 horas</strong>
              </p>
              <p className={s.fieldHint}>
                Más adelante podrás ajustar esta política y exigir re-login
                para ciertas acciones sensibles.
              </p>
            </div>

            <div className={s.field}>
              <label className={s.label}>Verificación extra</label>
              <div className={s.pillRow}>
                <button
                  type="button"
                  className={s.pillButtonActive}
                >
                  Código por correo
                </button>
                <button
                  type="button"
                  className={s.pillButtonGhost}
                  aria-disabled="true"
                >
                  2FA por app (futuro)
                </button>
              </div>
              <p className={s.fieldHint}>
                En esta fase inicial solo se simula la lógica, pero el diseño
                ya respeta un flujo realista.
              </p>
            </div>

            <div className={s.field}>
              <label className={s.label}>Ventana de auditoría</label>
              <div className={s.inlineRow}>
                <Clock size={14} />
                <span className={s.inlineText}>
                  Mantener historial detallado de acciones durante{' '}
                  <strong>90 días</strong>
                </span>
              </div>
              <p className={s.fieldHint}>
                Afecta vistas como soporte y negocios, que muestran quién
                tocó qué en la cuenta.
              </p>
            </div>
          </div>

          {/* Acciones rápidas */}
          <div className={s.card}>
            <div className={s.cardHeader}>
              <div className={s.cardTitleRow}>
                <span className={s.cardIconWrap}>
                  <Settings size={14} />
                </span>
                <div>
                  <h2 className={s.cardTitle}>Acciones rápidas</h2>
                  <p className={s.cardText}>
                    Herramientas que más adelante controlarán cambios
                    globales delicados.
                  </p>
                </div>
              </div>
            </div>

            <div className={s.quickActions}>
              <button
                type="button"
                className={s.quickBtn}
                disabled
              >
                <ArrowRight size={14} />
                Pasar todos los trials a 21 días
              </button>
              <button
                type="button"
                className={s.quickBtn}
                disabled
              >
                <ArrowRight size={14} />
                Forzar modo prueba de pagos
              </button>
              <button
                type="button"
                className={s.quickBtn}
                disabled
              >
                <ArrowRight size={14} />
                Limpiar sesiones internas activas
              </button>
            </div>

            <p className={s.fieldHint}>
              Estas acciones solo se muestran como prototipo. Cuando el
              backend esté listo se conectarán a operaciones reales.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
