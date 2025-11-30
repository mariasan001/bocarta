// src/features/auth/types.ts

export type BusinessRole = 'owner' | 'staff' | 'viewer';
export type BocartaRole = 'bocartaOwner' | 'support';

export type UserRole = BusinessRole | BocartaRole;

export type AuthUser = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  businessId?: string;
};

/* ===== Login ===== */

export type LoginPayload = {
  email: string;
  password: string;
};

export type LoginResult =
  | { ok: true; user: AuthUser }
  | { ok: false; message: string };

/* ===== Registro ===== */

export type RegisterAccountData = {
  name: string;
  email: string;
  password: string;
  acceptTerms: boolean;
  acceptPrivacy: boolean;
};

export type RegisterBusinessData = {
  businessName: string;
  businessType: string;
  city: string;
  phone?: string;
};

export type RegisterBrandingData = {
  primaryColor: string; // ej. '#DCD917'
  hasLogo: boolean;
  hasCover: boolean;
};

export type RegisterMenuCategory = {
  id: string;
  name: string;
};

export type RegisterMenuItem = {
  id: string;
  name: string;
  price: string;
  categoryId: string;
};

export type RegisterMenuData = {
  categories: RegisterMenuCategory[];
  items: RegisterMenuItem[];
};

export type RegisterPlan = 'entrada' | 'fuerte' | 'casa-llena' | 'fundador';

export type RegisterFormState = {
  account: RegisterAccountData;
  business: RegisterBusinessData;
  branding: RegisterBrandingData;
  menu: RegisterMenuData;
  plan: RegisterPlan | null;
};

export type RegisterResult =
  | { ok: true; user: AuthUser }
  | { ok: false; message: string };

  // ===== Recuperación de contraseña =====

export type RequestResetPayload = {
  email: string;
};

export type RequestResetResult =
  | { ok: true; message: string; token?: string } // token solo para modo demo
  | { ok: false; message: string };

export type ConfirmResetPayload = {
  token: string;
  password: string;
};

export type ConfirmResetResult =
  | { ok: true; message: string }
  | { ok: false; message: string };
