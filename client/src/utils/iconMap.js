// Shared Font Awesome icon mapping for categories
// Use this instead of DB emoji icons everywhere

export const CATEGORY_ICON_MAP = {
  'Cleaning': 'fas fa-broom',
  'Plumbing': 'fas fa-wrench',
  'Electrical': 'fas fa-bolt',
  'Babysitting': 'fas fa-baby',
  'Painting': 'fas fa-paint-brush',
  'Moving': 'fas fa-truck',
  'Handyman': 'fas fa-hammer',
  'Cooking': 'fas fa-utensils',
  'Gardening': 'fas fa-leaf',
  'Tutoring': 'fas fa-book',
};

export const HIDDEN_CATEGORIES = ['Gardening', 'Tutoring'];

export function getCategoryIcon(categoryName) {
  return CATEGORY_ICON_MAP[categoryName] || 'fas fa-star';
}
