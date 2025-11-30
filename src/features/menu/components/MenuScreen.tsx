// src/features/menu/components/MenuScreen/MenuScreen.tsx
'use client';

import {
  Plus,
  Search,
  Filter,
  GripVertical,
  Eye,
  EyeOff,
  CircleDot,
  CircleSlash2,
  Star,
  ArrowUp,
  ArrowDown,
  QrCode,
  ExternalLink,
} from 'lucide-react';

import { useMenuState } from '../hooks/useMenuState';
import type { MenuCategory, MenuItem } from '../types';

import s from './MenuScreen.module.css';

export default function MenuScreen() {
  const {
    categories,
    filteredItems,
    filters,
    setSearch,
    setStatus,
    setCategoryFilter,
    toggleSoldOut,
    toggleHidden,
    moveCategory,
    addCategory,
    renameCategory,
    addItemToCategory,
  } = useMenuState();

  const totalVisible = filteredItems.filter((i) => i.status === 'visible').length;
  const totalHidden = filteredItems.filter((i) => i.status === 'hidden').length;
  const totalSoldOut = filteredItems.filter((i) => i.status === 'soldout').length;

  return (
    <div className={s.layout}>
      {/* Cabecera */}
      <header className={s.header}>
        <div>
          <h1 className={s.title}>Menú digital</h1>
          <p className={s.subtitle}>
            Administra tu carta por categorías, marca platillos como agotados y ajusta
            precios en segundos. Todo se refleja al instante en tu código QR.
          </p>
        </div>

        <div className={s.headerActions}>
          <button type="button" className={s.ghostBtn}>
            <QrCode size={16} />
            <span>Ver QR y micrositio</span>
          </button>
          <button type="button" className={s.primaryBtn}>
            <Plus size={16} />
            <span>Nuevo platillo</span>
          </button>
        </div>
      </header>

      <div className={s.grid}>
        {/* Columna izquierda: categorías */}
        <aside className={s.sidebar}>
          <div className={s.sectionHeader}>
            <span className={s.sectionTitle}>Categorías</span>
            <button
              type="button"
              className={s.chipBtn}
              onClick={addCategory}
            >
              <Plus size={14} />
              <span>Agregar</span>
            </button>
          </div>

          <ul className={s.categoryList}>
            {categories.map((cat) => (
              <CategoryRow
                key={cat.id}
                category={cat}
                isActive={filters.categoryId === cat.id}
                onSelect={() =>
                  setCategoryFilter(
                    filters.categoryId === cat.id ? 'all' : cat.id,
                  )
                }
                onRename={(name) => renameCategory(cat.id, name)}
                onMoveUp={() => moveCategory(cat.id, 'up')}
                onMoveDown={() => moveCategory(cat.id, 'down')}
                onAddItem={() => addItemToCategory(cat.id)}
              />
            ))}
          </ul>

          <button
            type="button"
            className={s.secondaryFullBtn}
            onClick={() => setCategoryFilter('all')}
          >
            Ver todo el menú
          </button>
        </aside>

        {/* Centro: buscador + lista de platillos */}
        <section className={s.center}>
          <div className={s.filtersBar}>
            <div className={s.searchWrapper}>
              <Search size={16} className={s.searchIcon} />
              <input
                type="search"
                placeholder="Buscar por nombre, descripción o categoría…"
                value={filters.search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <div className={s.filtersRight}>
              <button
                type="button"
                className={`${s.filterChip} ${
                  filters.status === 'all' ? s.filterChipActive : ''
                }`}
                onClick={() => setStatus('all')}
              >
                <CircleDot size={14} />
                <span>Todos</span>
              </button>
              <button
                type="button"
                className={`${s.filterChip} ${
                  filters.status === 'visible' ? s.filterChipActive : ''
                }`}
                onClick={() => setStatus('visible')}
              >
                <Eye size={14} />
                <span>Visibles</span>
              </button>
              <button
                type="button"
                className={`${s.filterChip} ${
                  filters.status === 'soldout' ? s.filterChipActive : ''
                }`}
                onClick={() => setStatus('soldout')}
              >
                <CircleSlash2 size={14} />
                <span>Agotados</span>
              </button>
              <button
                type="button"
                className={`${s.filterChip} ${
                  filters.status === 'hidden' ? s.filterChipActive : ''
                }`}
                onClick={() => setStatus('hidden')}
              >
                <EyeOff size={14} />
                <span>Ocultos</span>
              </button>

              <button type="button" className={s.iconOnlyBtn}>
                <Filter size={16} />
              </button>
            </div>
          </div>

          <div className={s.table}>
            <div className={s.tableHeader}>
              <span className={s.thName}>Platillo</span>
              <span className={s.thPrice}>Precio</span>
              <span className={s.thStatus}>Estado</span>
              <span className={s.thActions}>Acciones</span>
            </div>

            <div className={s.tableBody}>
              {filteredItems.map((item) => (
                <MenuItemRow
                  key={item.id}
                  item={item}
                  onToggleSoldOut={() => toggleSoldOut(item.id)}
                  onToggleHidden={() => toggleHidden(item.id)}
                />
              ))}

              {filteredItems.length === 0 && (
                <div className={s.emptyState}>
                  <p className={s.emptyTitle}>No encontramos platillos</p>
                  <p className={s.emptyText}>
                    Ajusta los filtros o revisa si la categoría seleccionada tiene elementos.
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Derecha: resumen / preview */}
        <aside className={s.right}>
          <section className={s.card}>
            <h2 className={s.cardTitle}>Resumen rápido</h2>
            <ul className={s.summaryList}>
              <li>
                <span className={s.summaryLabel}>Visibles en carta</span>
                <span className={s.summaryValue}>{totalVisible}</span>
              </li>
              <li>
                <span className={s.summaryLabel}>Marcados como agotados</span>
                <span className={s.summaryValue}>{totalSoldOut}</span>
              </li>
              <li>
                <span className={s.summaryLabel}>Ocultos</span>
                <span className={s.summaryValue}>{totalHidden}</span>
              </li>
            </ul>
          </section>

          <section className={s.card}>
            <h2 className={s.cardTitle}>Vista previa del micrositio</h2>
            <p className={s.cardText}>
              Así se verá tu menú en el celular del cliente. Todo lo que edites aquí se
              actualiza en tiempo real.
            </p>

            <div className={s.previewPhone}>
              <div className={s.previewTopBar} />
              <div className={s.previewScreen}>
                <div className={s.previewHeader}>
                  <div className={s.previewDot} />
                  <div>
                    <p className={s.previewName}>Taquería El Barrio</p>
                    <p className={s.previewHint}>Menú QR · Bocarta</p>
                  </div>
                </div>
                <div className={s.previewCategoryPills}>
                  {categories.slice(0, 3).map((c) => (
                    <span key={c.id} className={s.previewPill}>
                      {c.name}
                    </span>
                  ))}
                </div>
                <div className={s.previewItemRow}>
                  <div>
                    <p className={s.previewItemName}>Taco al pastor</p>
                    <p className={s.previewItemDesc}>Con piña, salsa verde o roja.</p>
                  </div>
                  <span className={s.previewItemPrice}>$25</span>
                </div>
                <div className={s.previewFooter}>
                  <span className={s.previewBadge}>Actualizado hace 2 min</span>
                </div>
              </div>
            </div>

            <button type="button" className={s.linkBtn}>
              Abrir micrositio público
              <ExternalLink size={14} />
            </button>
          </section>
        </aside>
      </div>
    </div>
  );
}

/* ===== Subcomponentes ===== */

type CategoryRowProps = {
  category: MenuCategory;
  isActive: boolean;
  onSelect: () => void;
  onRename: (name: string) => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
  onAddItem: () => void;
};

function CategoryRow({
  category,
  isActive,
  onSelect,
  onRename,
  onMoveUp,
  onMoveDown,
  onAddItem,
}: CategoryRowProps) {
  return (
    <li
      className={`${s.categoryRow} ${isActive ? s.categoryRowActive : ''}`}
    >
      <button type="button" className={s.dragHandle} aria-label="Reordenar categoría">
        <GripVertical size={14} />
      </button>

      <button
        type="button"
        className={s.categoryMain}
        onClick={onSelect}
      >
        <input
          className={s.categoryInput}
          value={category.name}
          onChange={(e) => onRename(e.target.value)}
        />
      </button>

      <div className={s.categoryActions}>
        <button
          type="button"
          className={s.smallIconBtn}
          onClick={onMoveUp}
          aria-label="Subir"
        >
          <ArrowUp size={12} />
        </button>
        <button
          type="button"
          className={s.smallIconBtn}
          onClick={onMoveDown}
          aria-label="Bajar"
        >
          <ArrowDown size={12} />
        </button>
        <button
          type="button"
          className={s.smallIconBtn}
          onClick={onAddItem}
        >
          <Plus size={12} />
        </button>
      </div>
    </li>
  );
}

type MenuItemRowProps = {
  item: MenuItem;
  onToggleSoldOut: () => void;
  onToggleHidden: () => void;
};

function MenuItemRow({ item, onToggleSoldOut, onToggleHidden }: MenuItemRowProps) {
  const isSoldOut = item.status === 'soldout';
  const isHidden = item.status === 'hidden';

  return (
    <div className={s.row}>
      <div className={s.tdName}>
        <div className={s.rowTitleLine}>
          <span className={s.rowName}>{item.name}</span>
          {item.isSignature && (
            <span className={s.badgeStar}>
              <Star size={12} />
              Estrella
            </span>
          )}
        </div>
        {item.description && (
          <p className={s.rowDesc}>{item.description}</p>
        )}
        {item.tags && item.tags.length > 0 && (
          <div className={s.tagRow}>
            {item.tags.map((tag) => (
              <span key={tag} className={s.tag}>
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      <div className={s.tdPrice}>${item.price.toFixed(0)}</div>

      <div className={s.tdStatus}>
        {item.status === 'visible' && (
          <span className={`${s.statusChip} ${s.statusVisible}`}>
            <CircleDot size={10} />
            Visible
          </span>
        )}
        {item.status === 'soldout' && (
          <span className={`${s.statusChip} ${s.statusSoldout}`}>
            <CircleSlash2 size={10} />
            Agotado
          </span>
        )}
        {item.status === 'hidden' && (
          <span className={`${s.statusChip} ${s.statusHidden}`}>
            <EyeOff size={10} />
            Oculto
          </span>
        )}
      </div>

      <div className={s.tdActions}>
        <button
          type="button"
          className={s.actionBtn}
          onClick={onToggleSoldOut}
        >
          <CircleSlash2 size={14} />
          <span>{isSoldOut ? 'Quitar agotado' : 'Marcar agotado'}</span>
        </button>
        <button
          type="button"
          className={s.actionBtn}
          onClick={onToggleHidden}
        >
          {isHidden ? <Eye size={14} /> : <EyeOff size={14} />}
          <span>{isHidden ? 'Mostrar en carta' : 'Ocultar'}</span>
        </button>
      </div>
    </div>
  );
}
