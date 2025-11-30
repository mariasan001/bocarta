// src/features/auth/fixtures/users.ts

import { AuthUser } from "../auth/types";

export const mockUsers: Array<AuthUser & { password: string }> = [
  {
    id: 'u-owner-1',
    name: 'Dueño Demo Taquería',
    email: 'owner@demo.com',
    password: 'demo1234',
    role: 'owner',
    businessId: 'biz-taqueria-1',
  },
  {
    id: 'u-staff-1',
    name: 'Staff Demo',
    email: 'staff@demo.com',
    password: 'demo1234',
    role: 'staff',
    businessId: 'biz-taqueria-1',
  },
  {
    id: 'u-viewer-1',
    name: 'Viewer Demo',
    email: 'viewer@demo.com',
    password: 'demo1234',
    role: 'viewer',
    businessId: 'biz-taqueria-1',
  },
  {
    id: 'u-admin-1',
    name: 'Bocarta Owner',
    email: 'admin@bocarta.com',
    password: 'demo1234',
    role: 'bocartaOwner',
  },
  {
    id: 'u-support-1',
    name: 'Soporte Bocarta',
    email: 'soporte@bocarta.com',
    password: 'demo1234',
    role: 'support',
  },
];
