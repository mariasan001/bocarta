// src/features/auth/components/RegisterWizard/RegisterWizard.tsx
'use client';

import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { User, Store, Palette, ListChecks, Sparkles, ArrowRight, ArrowLeft } from 'lucide-react';

import {
  type RegisterFormState,
  type RegisterMenuCategory,
  type RegisterMenuItem,
  type RegisterPlan,
  type AuthUser,
} from '../../auth/types';
import { useMockRegister } from '../../hooks/useMockRegister';

import s from './RegisterWizard.module.css';

const INITIAL_FORM: RegisterFormState = {
  account: {
    name: '',
    email: '',
    password: '',
    acceptTerms: false,
    acceptPrivacy: false,
  },
  business: {
    businessName: '',
    businessType: 'Taquería',
    city: '',
    phone: '',
  },
  branding: {
    primaryColor: '#DCD917',
    hasLogo: false,
    hasCover: false,
  },
  menu: {
    categories: [
      { id: 'cat-1', name: 'Tacos' },
      { id: 'cat-2', name: 'Bebidas' },
      { id: 'cat-3', name: 'Postres' },
    ],
    items: [
      { id: 'item-1', name: 'Taco al pastor', price: '25', categoryId: 'cat-1' },
      { id: 'item-2', name: 'Agua de horchata', price: '18', categoryId: 'cat-2' },
    ],
  },
  plan: null,
};

const steps = [
  { id: 0, label: 'Cuenta', icon: User },
  { id: 1, label: 'Negocio', icon: Store },
  { id: 2, label: 'Branding', icon: Palette },
  { id: 3, label: 'Primer menú', icon: ListChecks },
  { id: 4, label: 'Plan', icon: Sparkles },
];

export default function RegisterWizard() {
  const router = useRouter();
  const { register, loading } = useMockRegister();

  const [step, setStep] = useState(0);
  const [form, setForm] = useState<RegisterFormState>(INITIAL_FORM);
  const [error, setError] = useState<string | null>(null);

  const isLastStep = step === steps.length - 1;
  const currentStep = steps[step];

  function goNext() {
    if (step < steps.length - 1) {
      setStep((s) => s + 1);
      setError(null);
    }
  }

  function goPrev() {
    if (step > 0) {
      setStep((s) => s - 1);
      setError(null);
    }
  }

  async function handleSubmitFinal() {
    setError(null);
    const result = await register(form);

    if (!result.ok) {
      setError(result.message);
      return;
    }

    redirectAfterRegister(result.user);
  }

  function redirectAfterRegister(user: AuthUser) {
    // Siempre entra como Owner de negocio
    router.push('/app');
  }

  /* Helpers de actualización */

  function updateAccount<K extends keyof RegisterFormState['account']>(
    key: K,
    value: RegisterFormState['account'][K],
  ) {
    setForm((prev) => ({
      ...prev,
      account: { ...prev.account, [key]: value },
    }));
  }

  function updateBusiness<K extends keyof RegisterFormState['business']>(
    key: K,
    value: RegisterFormState['business'][K],
  ) {
    setForm((prev) => ({
      ...prev,
      business: { ...prev.business, [key]: value },
    }));
  }

  function updateBranding<K extends keyof RegisterFormState['branding']>(
    key: K,
    value: RegisterFormState['branding'][K],
  ) {
    setForm((prev) => ({
      ...prev,
      branding: { ...prev.branding, [key]: value },
    }));
  }

  function updateMenuCategory(id: string, name: string) {
    setForm((prev) => ({
      ...prev,
      menu: {
        ...prev.menu,
        categories: prev.menu.categories.map((c) =>
          c.id === id ? { ...c, name } : c,
        ),
      },
    }));
  }

  function updateMenuItem(id: string, patch: Partial<RegisterMenuItem>) {
    setForm((prev) => ({
      ...prev,
      menu: {
        ...prev.menu,
        items: prev.menu.items.map((i) =>
          i.id === id ? { ...i, ...patch } : i,
        ),
      },
    }));
  }

  function addMenuItem() {
    setForm((prev) => {
      const newId = `item-${prev.menu.items.length + 1}`;
      const firstCat = prev.menu.categories[0]?.id ?? 'cat-1';
      const newItem: RegisterMenuItem = {
        id: newId,
        name: '',
        price: '',
        categoryId: firstCat,
      };
      return {
        ...prev,
        menu: {
          ...prev.menu,
          items: [...prev.menu.items, newItem],
        },
      };
    });
  }

  function setPlan(plan: RegisterPlan) {
    setForm((prev) => ({ ...prev, plan }));
  }

  const progress = useMemo(
    () => ((step + 1) / steps.length) * 100,
    [step],
  );

  return (
    <div className={s.card}>
      {/* Header + paso actual */}
      <header className={s.header}>
        <h1 className={s.title}>Crear nueva cuenta</h1>
        <p className={s.subtitle}>
          Arranca con Bocarta en unos pasos. Al final podrás entrar directo a tu panel.
        </p>
      </header>

      {/* Stepper */}
      <div className={s.stepper}>
        {steps.map(({ id, label, icon: Icon }) => {
          const active = id === step;
          const done = id < step;
          return (
            <div
              key={id}
              className={`${s.step} ${active ? s.stepActive : ''} ${
                done ? s.stepDone : ''
              }`}
            >
              <div className={s.stepIconWrapper}>
                <Icon size={14} />
              </div>
              <span className={s.stepLabel}>{label}</span>
            </div>
          );
        })}
      </div>

      <div className={s.progressBarOuter}>
        <div className={s.progressBarInner} style={{ width: `${progress}%` }} />
      </div>

      {/* Contenido del paso */}
      <div className={s.body}>
        {step === 0 && (
          <StepAccount
            value={form.account}
            onChange={updateAccount}
          />
        )}

        {step === 1 && (
          <StepBusiness
            value={form.business}
            onChange={updateBusiness}
          />
        )}

        {step === 2 && (
          <StepBranding
            value={form.branding}
            onChange={updateBranding}
          />
        )}

        {step === 3 && (
          <StepMenu
            categories={form.menu.categories}
            items={form.menu.items}
            onChangeCategory={updateMenuCategory}
            onChangeItem={updateMenuItem}
            onAddItem={addMenuItem}
          />
        )}

        {step === 4 && (
          <StepPlan
            selected={form.plan}
            onSelect={setPlan}
          />
        )}
      </div>

      {error && <p className={s.error}>{error}</p>}

      {/* Controles inferiores */}
      <footer className={s.footer}>
        <button
          type="button"
          className={s.secondaryBtn}
          onClick={goPrev}
          disabled={step === 0 || loading}
        >
          <ArrowLeft size={14} />
          <span>Atrás</span>
        </button>

        <div className={s.footerRight}>
          <span className={s.stepHint}>
            Paso {step + 1} de {steps.length}
          </span>

          {!isLastStep ? (
            <button
              type="button"
              className={s.primaryBtn}
              onClick={goNext}
              disabled={loading}
            >
              <span>Siguiente</span>
              <ArrowRight size={14} />
            </button>
          ) : (
            <button
              type="button"
              className={s.primaryBtn}
              onClick={handleSubmitFinal}
              disabled={loading}
            >
              <span>
                {loading ? 'Creando cuenta…' : 'Crear cuenta y entrar'}
              </span>
              {!loading && <ArrowRight size={14} />}
            </button>
          )}
        </div>
      </footer>
    </div>
  );
}

/* ===== Subcomponentes de cada paso ===== */

type AccountProps = {
  value: RegisterFormState['account'];
  onChange: <K extends keyof RegisterFormState['account']>(
    key: K,
    value: RegisterFormState['account'][K],
  ) => void;
};

function StepAccount({ value, onChange }: AccountProps) {
  return (
    <div className={s.stepContent}>
      <h2 className={s.stepTitle}>Tu cuenta</h2>
      <p className={s.stepCopy}>
        Estos datos son solo para que puedas acceder a tu panel y recibir comunicaciones.
      </p>

      <div className={s.grid}>
        <div className={s.field}>
          <label htmlFor="acc-name">Nombre y apellido</label>
          <input
            id="acc-name"
            type="text"
            placeholder="ej. Ana López"
            value={value.name}
            onChange={(e) => onChange('name', e.target.value)}
          />
        </div>

        <div className={s.field}>
          <label htmlFor="acc-email">Correo electrónico</label>
          <input
            id="acc-email"
            type="email"
            placeholder="ej. ana@tutaqueria.mx"
            value={value.email}
            onChange={(e) => onChange('email', e.target.value)}
          />
        </div>

        <div className={s.field}>
          <label htmlFor="acc-password">Contraseña</label>
          <input
            id="acc-password"
            type="password"
            placeholder="Mínimo 8 caracteres"
            value={value.password}
            onChange={(e) => onChange('password', e.target.value)}
          />
        </div>
      </div>

      <div className={s.checkRow}>
        <label className={s.checkboxLabel}>
          <input
            type="checkbox"
            checked={value.acceptTerms}
            onChange={(e) => onChange('acceptTerms', e.target.checked)}
          />
          <span>
            Acepto los <a href="#">términos y condiciones</a>.
          </span>
        </label>
        <label className={s.checkboxLabel}>
          <input
            type="checkbox"
            checked={value.acceptPrivacy}
            onChange={(e) => onChange('acceptPrivacy', e.target.checked)}
          />
          <span>
            Acepto la <a href="#">política de privacidad</a>.
          </span>
        </label>
      </div>
    </div>
  );
}

type BusinessProps = {
  value: RegisterFormState['business'];
  onChange: <K extends keyof RegisterFormState['business']>(
    key: K,
    value: RegisterFormState['business'][K],
  ) => void;
};

function StepBusiness({ value, onChange }: BusinessProps) {
  return (
    <div className={s.stepContent}>
      <h2 className={s.stepTitle}>Datos del negocio</h2>
      <p className={s.stepCopy}>
        Esto nos ayuda a adaptar el panel y el micrositio a tu tipo de negocio.
      </p>

      <div className={s.grid}>
        <div className={s.field}>
          <label htmlFor="biz-name">Nombre del negocio</label>
          <input
            id="biz-name"
            type="text"
            placeholder="ej. Taquería El Barrio"
            value={value.businessName}
            onChange={(e) => onChange('businessName', e.target.value)}
          />
        </div>

        <div className={s.field}>
          <label htmlFor="biz-type">Tipo de negocio</label>
          <select
            id="biz-type"
            value={value.businessType}
            onChange={(e) => onChange('businessType', e.target.value)}
          >
            <option>Taquería</option>
            <option>Café</option>
            <option>Bar</option>
            <option>Restaurante</option>
            <option>Food truck</option>
            <option>Otro</option>
          </select>
        </div>

        <div className={s.field}>
          <label htmlFor="biz-city">Ciudad / colonia</label>
          <input
            id="biz-city"
            type="text"
            placeholder="ej. Toluca, Centro"
            value={value.city}
            onChange={(e) => onChange('city', e.target.value)}
          />
        </div>

        <div className={s.field}>
          <label htmlFor="biz-phone">(Opcional) Teléfono de contacto</label>
          <input
            id="biz-phone"
            type="tel"
            placeholder="ej. 722 123 4567"
            value={value.phone}
            onChange={(e) => onChange('phone', e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}

type BrandingProps = {
  value: RegisterFormState['branding'];
  onChange: <K extends keyof RegisterFormState['branding']>(
    key: K,
    value: RegisterFormState['branding'][K],
  ) => void;
};

function StepBranding({ value, onChange }: BrandingProps) {
  return (
    <div className={s.stepContent}>
      <h2 className={s.stepTitle}>Branding rápido</h2>
      <p className={s.stepCopy}>
        Si quieres, deja listo el color y algunos elementos para que tu micrositio no se vea vacío.
        Puedes cambiar todo después.
      </p>

      <div className={s.grid}>
        <div className={s.field}>
          <label>Color principal</label>
          <div className={s.colorRow}>
            <button
              type="button"
              className={`${s.colorSwatch} ${
                value.primaryColor === '#DCD917' ? s.colorSwatchActive : ''
              }`}
              style={{ backgroundColor: '#DCD917' }}
              onClick={() => onChange('primaryColor', '#DCD917')}
            >
              Amarillo Bocarta
            </button>
            <button
              type="button"
              className={`${s.colorSwatch} ${
                value.primaryColor === '#000000' ? s.colorSwatchActive : ''
              }`}
              style={{ backgroundColor: '#000000', color: '#fff' }}
              onClick={() => onChange('primaryColor', '#000000')}
            >
              Negro
            </button>
            <button
              type="button"
              className={`${s.colorSwatch} ${
                value.primaryColor === '#C6C6C6' ? s.colorSwatchActive : ''
              }`}
              style={{ backgroundColor: '#C6C6C6' }}
              onClick={() => onChange('primaryColor', '#C6C6C6')}
            >
              Gris claro
            </button>
          </div>
        </div>

        <div className={s.field}>
          <label>Logo del negocio</label>
          <div className={s.toggleRow}>
            <label className={s.checkboxLabel}>
              <input
                type="checkbox"
                checked={value.hasLogo}
                onChange={(e) => onChange('hasLogo', e.target.checked)}
              />
              <span>Subiré logo más adelante</span>
            </label>
          </div>
        </div>

        <div className={s.field}>
          <label>Imagen de portada</label>
          <div className={s.toggleRow}>
            <label className={s.checkboxLabel}>
              <input
                type="checkbox"
                checked={value.hasCover}
                onChange={(e) => onChange('hasCover', e.target.checked)}
              />
              <span>Configuraré mi portada después</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}

type MenuProps = {
  categories: RegisterMenuCategory[];
  items: RegisterMenuItem[];
  onChangeCategory: (id: string, name: string) => void;
  onChangeItem: (id: string, patch: Partial<RegisterMenuItem>) => void;
  onAddItem: () => void;
};

function StepMenu({
  categories,
  items,
  onChangeCategory,
  onChangeItem,
  onAddItem,
}: MenuProps) {
  return (
    <div className={s.stepContent}>
      <h2 className={s.stepTitle}>Primer menú</h2>
      <p className={s.stepCopy}>
        Deja algunos platillos listos para que tu carta no aparezca vacía. Puedes cambiarlos cuando
        quieras.
      </p>

      <div className={s.menuGrid}>
        <div>
          <h3 className={s.menuSubTitle}>Categorías</h3>
          <p className={s.menuHint}>Puedes editar estos nombres luego en el panel.</p>
          <div className={s.menuList}>
            {categories.map((cat) => (
              <div key={cat.id} className={s.field}>
                <input
                  type="text"
                  value={cat.name}
                  onChange={(e) => onChangeCategory(cat.id, e.target.value)}
                />
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className={s.menuSubTitle}>Platillos iniciales</h3>
          <p className={s.menuHint}>Solo nombre y precio. El resto lo detallamos después.</p>
          <div className={s.menuItems}>
            {items.map((item) => (
              <div key={item.id} className={s.menuItemRow}>
                <input
                  type="text"
                  placeholder="Nombre"
                  value={item.name}
                  onChange={(e) => onChangeItem(item.id, { name: e.target.value })}
                />
                <input
                  type="text"
                  placeholder="$"
                  value={item.price}
                  onChange={(e) => onChangeItem(item.id, { price: e.target.value })}
                />
                <select
                  value={item.categoryId}
                  onChange={(e) => onChangeItem(item.id, { categoryId: e.target.value })}
                >
                  {categories.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>
            ))}
          </div>

          <button type="button" className={s.secondaryBtnSmall} onClick={onAddItem}>
            + Agregar platillo
          </button>
        </div>
      </div>
    </div>
  );
}

type PlanProps = {
  selected: RegisterPlan | null;
  onSelect: (plan: RegisterPlan) => void;
};

function StepPlan({ selected, onSelect }: PlanProps) {
  return (
    <div className={s.stepContent}>
      <h2 className={s.stepTitle}>Elige tu plan inicial</h2>
      <p className={s.stepCopy}>
        Puedes cambiar de plan cuando quieras. Para pruebas, usarás el modo Entrada o Fundador.
      </p>

      <div className={s.planGrid}>
        <button
          type="button"
          className={`${s.planCard} ${
            selected === 'entrada' ? s.planCardActive : ''
          }`}
          onClick={() => onSelect('entrada')}
        >
          <span className={s.planBadge}>Recomendado para empezar</span>
          <h3 className={s.planName}>Entrada</h3>
          <p className={s.planDesc}>Para un solo negocio, menú ilimitado, un QR.</p>
        </button>

        <button
          type="button"
          className={`${s.planCard} ${
            selected === 'fuerte' ? s.planCardActive : ''
          }`}
          onClick={() => onSelect('fuerte')}
        >
          <h3 className={s.planName}>Fuerte</h3>
          <p className={s.planDesc}>Más sucursales, más usuarios de equipo y más QRs.</p>
        </button>

        <button
          type="button"
          className={`${s.planCard} ${
            selected === 'fundador' ? s.planCardActive : ''
          }`}
          onClick={() => onSelect('fundador')}
        >
          <span className={s.planBadgePlanFundador}>Plan Fundador</span>
          <h3 className={s.planName}>Casa Llena</h3>
          <p className={s.planDesc}>
            Descuento especial para los primeros negocios que se unan a Bocarta.
          </p>
        </button>
      </div>
    </div>
  );
}
