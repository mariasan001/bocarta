// src/features/menu/hooks/useMenuState.ts
'use client';

import { useMemo, useState } from 'react';
import { mockCategories, mockItems } from '../fixtures/mockMenu';
import type { MenuCategory, MenuItem, MenuItemStatus } from '../types';

type Filters = {
  search: string;
  status: 'all' | MenuItemStatus;
  categoryId: string | 'all';
};

export function useMenuState() {
  const [categories, setCategories] = useState<MenuCategory[]>(() =>
    [...mockCategories].sort((a, b) => a.position - b.position),
  );
  const [items, setItems] = useState<MenuItem[]>(mockItems);
  const [filters, setFilters] = useState<Filters>({
    search: '',
    status: 'all',
    categoryId: 'all',
  });

  /* ==== helpers ==== */

  function setSearch(search: string) {
    setFilters((prev) => ({ ...prev, search }));
  }

  function setStatus(status: Filters['status']) {
    setFilters((prev) => ({ ...prev, status }));
  }

  function setCategoryFilter(categoryId: Filters['categoryId']) {
    setFilters((prev) => ({ ...prev, categoryId }));
  }

  function toggleItemStatus(id: string, target: MenuItemStatus) {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, status: target } : item,
      ),
    );
  }

  function toggleSoldOut(id: string) {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              status: item.status === 'soldout' ? 'visible' : 'soldout',
            }
          : item,
      ),
    );
  }

  function toggleHidden(id: string) {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              status: item.status === 'hidden' ? 'visible' : 'hidden',
            }
          : item,
      ),
    );
  }

  function moveCategory(id: string, direction: 'up' | 'down') {
    setCategories((prev) => {
      const sorted = [...prev].sort((a, b) => a.position - b.position);
      const index = sorted.findIndex((c) => c.id === id);
      if (index === -1) return prev;

      const newIndex = direction === 'up' ? index - 1 : index + 1;
      if (newIndex < 0 || newIndex >= sorted.length) return prev;

      const temp = sorted[index];
      sorted[index] = sorted[newIndex];
      sorted[newIndex] = temp;

      return sorted.map((c, i) => ({ ...c, position: i + 1 }));
    });
  }

  function addCategory() {
    setCategories((prev) => {
      const nextPos = prev.length ? prev.length + 1 : 1;
      const id = `cat-${nextPos}-${Date.now()}`;
      return [
        ...prev,
        {
          id,
          name: 'Nueva categoría',
          position: nextPos,
        },
      ];
    });
  }

  function renameCategory(id: string, name: string) {
    setCategories((prev) =>
      prev.map((c) => (c.id === id ? { ...c, name } : c)),
    );
  }

  function addItemToCategory(categoryId: string) {
    setItems((prev) => {
      const id = `item-${prev.length + 1}-${Date.now()}`;
      return [
        ...prev,
        {
          id,
          name: 'Nuevo platillo',
          price: 0,
          categoryId,
          status: 'visible',
          description: '',
        },
      ];
    });
  }

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      if (filters.categoryId !== 'all' && item.categoryId !== filters.categoryId)
        return false;

      if (filters.status !== 'all' && item.status !== filters.status) return false;

      const query = filters.search.trim().toLowerCase();
      if (!query) return true;

      const cat = categories.find((c) => c.id === item.categoryId);
      return (
        item.name.toLowerCase().includes(query) ||
        (item.description ?? '').toLowerCase().includes(query) ||
        (cat?.name.toLowerCase().includes(query) ?? false)
      );
    });
  }, [items, filters, categories]);

  return {
    categories,
    items,
    filteredItems,
    filters,
    setSearch,
    setStatus,
    setCategoryFilter,
    toggleItemStatus,
    toggleSoldOut,
    toggleHidden,
    moveCategory,
    addCategory,
    renameCategory,
    addItemToCategory,
  };
}
