// src/features/menu/types.ts

export type MenuItemStatus = 'visible' | 'hidden' | 'soldout';

export type MenuCategory = {
  id: string;
  name: string;
  position: number;
};

export type MenuItem = {
  id: string;
  name: string;
  price: number;
  description?: string;
  categoryId: string;
  status: MenuItemStatus;
  tags?: string[];
  isSignature?: boolean; // platillo estrella
};
