'use client';

import { useMemo, useState } from 'react';
import { mockPromos } from '../fixtures/mockPromos';
import type { Promo, PromoStatus, PromoType } from '../types';

type StatusFilter = 'all' | PromoStatus;
type TypeFilter = 'all' | PromoType;

export function usePromosState() {
  const [promos, setPromos] = useState<Promo[]>(mockPromos);
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');
  const [typeFilter, setTypeFilter] = useState<TypeFilter>('all');

  function togglePause(id: string) {
    setPromos((prev) =>
      prev.map((promo) => {
        if (promo.id !== id) return promo;

        if (promo.status === 'active') {
          return { ...promo, status: 'paused' };
        }
        if (promo.status === 'paused') {
          return { ...promo, status: 'active' };
        }
        // scheduled / finished no cambian aquí
        return promo;
      }),
    );
  }

  function movePromo(id: string, direction: 'up' | 'down') {
    setPromos((prev) => {
      const arr = [...prev];
      const index = arr.findIndex((p) => p.id === id);
      if (index === -1) return prev;

      const newIndex = direction === 'up' ? index - 1 : index + 1;
      if (newIndex < 0 || newIndex >= arr.length) return prev;

      const temp = arr[index];
      arr[index] = arr[newIndex];
      arr[newIndex] = temp;
      return arr;
    });
  }

  function setStatus(status: StatusFilter) {
    setStatusFilter(status);
  }

  function setType(type: TypeFilter) {
    setTypeFilter(type);
  }

  const filteredPromos = useMemo(() => {
    return promos.filter((promo) => {
      if (statusFilter !== 'all' && promo.status !== statusFilter) return false;
      if (typeFilter !== 'all' && promo.type !== typeFilter) return false;
      return true;
    });
  }, [promos, statusFilter, typeFilter]);

  return {
    promos,
    filteredPromos,
    statusFilter,
    typeFilter,
    setStatus,
    setType,
    togglePause,
    movePromo,
  };
}
