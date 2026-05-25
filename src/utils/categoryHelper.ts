import {
  Egg,
  Fish,
  Apple,
  Beef,
  Milk,
  Croissant,
  Flame,
  Package,
  LucideIcon
} from 'lucide-react';

export interface CategoryConfig {
  id: string;
  label: string;
  icon: LucideIcon;
  colorClass: string;
}

export const PRODUCT_CATEGORIES: CategoryConfig[] = [
  { id: 'milk', label: 'Молочные продукты', icon: Milk, colorClass: 'bg-blue-50 text-blue-600 border-blue-100/50' },
  { id: 'meat', label: 'Мясо и птица', icon: Beef, colorClass: 'bg-rose-50 text-rose-600 border-rose-100/50' },
  { id: 'fish', label: 'Рыба и морепродукты', icon: Fish, colorClass: 'bg-sky-50 text-sky-600 border-sky-100/50' },
  { id: 'veg', label: 'Овощи и фрукты', icon: Apple, colorClass: 'bg-emerald-50 text-emerald-600 border-emerald-100/50' },
  { id: 'bakery', label: 'Выпечка и хлеб', icon: Croissant, colorClass: 'bg-amber-50 text-amber-600 border-amber-100/50' },
  { id: 'eggs', label: 'Яйца', icon: Egg, colorClass: 'bg-yellow-50 text-yellow-600 border-yellow-100/50' },
  { id: 'ready', label: 'Готовые блюда', icon: Flame, colorClass: 'bg-orange-50 text-orange-600 border-orange-100/50' },
  { id: 'other', label: 'Другое', icon: Package, colorClass: 'bg-slate-50 text-slate-600 border-slate-100/50' },
];

export const getCategoryConfig = (id: string): CategoryConfig => {
  return PRODUCT_CATEGORIES.find(category => category.id === id) || PRODUCT_CATEGORIES[PRODUCT_CATEGORIES.length - 1];
};