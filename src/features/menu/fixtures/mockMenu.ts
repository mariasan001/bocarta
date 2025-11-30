// src/features/menu/fixtures/mockMenu.ts
import type { MenuCategory, MenuItem } from '../types';

export const mockCategories: MenuCategory[] = [
  { id: 'cat-tacos', name: 'Tacos', position: 1 },
  { id: 'cat-bebidas', name: 'Bebidas', position: 2 },
  { id: 'cat-postres', name: 'Postres', position: 3 },
];

export const mockItems: MenuItem[] = [
  {
    id: 'item-1',
    name: 'Taco al pastor',
    price: 25,
    description: 'Con piña, salsa verde o roja.',
    categoryId: 'cat-tacos',
    status: 'visible',
    tags: ['Popular', 'Spicy'],
    isSignature: true,
  },
  {
    id: 'item-2',
    name: 'Taco de suadero',
    price: 24,
    description: 'Suadero suave, cebolla y cilantro.',
    categoryId: 'cat-tacos',
    status: 'visible',
    tags: ['Clásico'],
  },
  {
    id: 'item-3',
    name: 'Agua de horchata',
    price: 18,
    description: 'Vaso grande.',
    categoryId: 'cat-bebidas',
    status: 'soldout',
    tags: ['Agotado hoy'],
  },
  {
    id: 'item-4',
    name: 'Agua de Jamaica',
    price: 18,
    description: 'Refrescante, sin gas.',
    categoryId: 'cat-bebidas',
    status: 'visible',
  },
  {
    id: 'item-5',
    name: 'Flan casero',
    price: 30,
    description: 'Con caramelo suave.',
    categoryId: 'cat-postres',
    status: 'hidden',
    tags: ['Próximamente'],
  },
];
