export const DISH_TYPES = ['Chicken', 'Beef', 'Pork', 'Seafood', 'Vegetarian', 'Dessert', 'Appetizer'];

export const SEED_RECIPES = [
  {
    id: 1,
    title: 'Charred Corn & Heirloom Tomato Salad',
    tags: ['Vegetarian'],
    seasons: ['Summer'],
    sourceSite: 'gardentable.com',
    url: 'https://gardentable.com/charred-corn-tomato-salad',
    ingredients: ['Sweet corn', 'Heirloom tomatoes', 'Fresh basil', 'Feta cheese', 'Olive oil', 'Red wine vinegar'],
    rating: 5,
    notes: '',
    imageUrl: null,
  },
  {
    id: 2,
    title: 'Roasted Butternut Squash Soup',
    tags: ['Vegetarian', 'Appetizer'],
    seasons: ['Fall'],
    sourceSite: 'thewarmkitchen.com',
    url: 'https://thewarmkitchen.com/butternut-squash-soup',
    ingredients: ['Butternut squash', 'Yellow onion', 'Vegetable stock', 'Nutmeg', 'Heavy cream', 'Sage'],
    rating: 4,
    notes: '',
    imageUrl: null,
  },
  {
    id: 3,
    title: 'Braised Short Rib Ragu with Pappardelle',
    tags: ['Beef'],
    seasons: ['Winter'],
    sourceSite: 'slowsimmer.co',
    url: 'https://slowsimmer.co/short-rib-ragu',
    ingredients: ['Beef short rib', 'Pappardelle pasta', 'Crushed tomatoes', 'Red wine', 'Carrot', 'Celery', 'Parmesan'],
    rating: 5,
    notes: '',
    imageUrl: null,
  },
  {
    id: 4,
    title: 'Spring Pea & Mint Risotto',
    tags: ['Vegetarian'],
    seasons: ['Spring'],
    sourceSite: 'farmfreshjournal.com',
    url: 'https://farmfreshjournal.com/pea-mint-risotto',
    ingredients: ['Arborio rice', 'English peas', 'Fresh mint', 'Vegetable stock', 'Parmesan', 'White wine'],
    rating: 0,
    notes: '',
    imageUrl: null,
  },
  {
    id: 5,
    title: 'Peach & Basil Galette',
    tags: ['Dessert'],
    seasons: ['Summer'],
    sourceSite: 'ruralbaker.com',
    url: 'https://ruralbaker.com/peach-basil-galette',
    ingredients: ['Ripe peaches', 'Pie dough', 'Fresh basil', 'Turbinado sugar', 'Butter', 'Lemon zest'],
    rating: 4,
    notes: '',
    imageUrl: null,
  },
];

export const SAMPLE_EXTRACTION = {
  title: 'Grilled Zucchini Ribbons with Lemon & Pecorino',
  tags: ['Vegetarian'],
  seasons: ['Summer'],
  sourceSite: 'cooksjournal.com',
  url: 'https://cooksjournal.com/grilled-zucchini-ribbons',
  ingredients: ['Zucchini', 'Lemon', 'Pecorino cheese', 'Fresh mint', 'Olive oil', 'Chili flakes'],
  imageUrl: null,
};

export const SAMPLE_URL = 'https://cooksjournal.com/grilled-zucchini-ribbons';

const IMG_PALETTES = [
  ['oklch(88% 0.05 40)', 'oklch(78% 0.08 40)'],
  ['oklch(85% 0.05 120)', 'oklch(74% 0.07 120)'],
  ['oklch(87% 0.04 70)', 'oklch(76% 0.06 70)'],
  ['oklch(86% 0.05 30)', 'oklch(75% 0.08 30)'],
  ['oklch(88% 0.04 100)', 'oklch(77% 0.06 100)'],
];

export function mediaStyle(seed, height = 140, imageUrl, radius) {
  const style = {
    height,
    borderRadius: radius || undefined,
  };
  if (imageUrl) {
    return {
      ...style,
      backgroundImage: `url("${imageUrl}")`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    };
  }
  const [a, b] = IMG_PALETTES[((seed % IMG_PALETTES.length) + IMG_PALETTES.length) % IMG_PALETTES.length];
  return {
    ...style,
    background: `repeating-linear-gradient(135deg, ${a}, ${a} 14px, ${b} 14px, ${b} 28px)`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };
}

export function starColor(filled) {
  return filled ? 'var(--star-filled)' : 'var(--star-empty)';
}

// Meteorological seasons, Northern Hemisphere.
export function getCurrentSeason(date = new Date()) {
  const month = date.getMonth();
  if (month === 11 || month <= 1) return 'Winter';
  if (month <= 4) return 'Spring';
  if (month <= 7) return 'Summer';
  return 'Fall';
}

export function guessDishType(category, title) {
  const s = `${category || ''} ${title || ''}`.toLowerCase();
  if (s.includes('chicken')) return 'Chicken';
  if (s.includes('beef') || s.includes('steak')) return 'Beef';
  if (s.includes('pork') || s.includes('bacon') || s.includes('ham')) return 'Pork';
  if (s.includes('shrimp') || s.includes('fish') || s.includes('seafood') || s.includes('salmon')) return 'Seafood';
  if (s.includes('dessert') || s.includes('cake') || s.includes('cookie') || s.includes('galette')) return 'Dessert';
  if (s.includes('appetizer') || s.includes('starter') || s.includes('dip')) return 'Appetizer';
  return 'Vegetarian';
}
