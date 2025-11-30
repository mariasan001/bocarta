export type PromoStatus = 'active' | 'paused' | 'scheduled' | 'finished';
export type PromoType = 'happyHour' | 'discount' | 'twoForOne' | 'combo';

export type PromoSchedule = {
  daysOfWeek: string[];   // ['L', 'M', 'X', 'J', 'V']
  startTime: string;      // '17:00'
  endTime: string;        // '19:00'
  startDate?: string;     // '2025-01-01'
  endDate?: string;       // '2025-02-01'
};

export type PromoScope = 'entireMenu' | 'categories' | 'items';

export type Promo = {
  id: string;
  name: string;
  type: PromoType;
  status: PromoStatus;
  schedule: PromoSchedule;
  scope: PromoScope;
  categoriesNames?: string[];   // para mostrar rápido
  itemsCount: number;           // cuántos platillos toca
  discountLabel: string;        // '-20%', '2x1', '$10 menos'
  highlight?: boolean;          // para resaltar promos clave
};
