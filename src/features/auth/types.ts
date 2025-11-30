// src/features/auth/types.ts

export type BusinessRole = 'owner' | 'staff' | 'viewer';
export type BocartaRole = 'bocartaOwner' | 'support';

export type UserRole = BusinessRole | BocartaRole;

export type AuthUser = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  businessId?: string; // para roles de negocio
};

export type LoginPayload = {
  email: string;
  password: string;
};

export type LoginResult =
  | { ok: true; user: AuthUser }
  | { ok: false; message: string };
