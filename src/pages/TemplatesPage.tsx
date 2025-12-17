import React, { useMemo, useState, useEffect } from 'react';
import { FiFilter, FiSearch, FiX } from 'react-icons/fi';
import TemplateCard from '../components/templates/TemplateCard';
import Modal from '../components/common/Modal';
import { TemplateCategory, TemplateItem, getAllTemplates } from '../data/templates';

type SortKey = 'popular' | 'newest' | 'price-asc' | 'price-desc';
type AudienceFilter = 'All' | 'B2B' | 'B2C' | 'Both';

const categories: TemplateCategory[] = [
  'spa',
  'proxy',
  'game-accounts',
  'social-boost',
  'payment-api',
  'tools-marketplace',
  'cosmetics',
  'household',
  'fashion',
  'digital-products'
];

const templateTypes: TemplateItem['templateType'][] = ['Service', 'E-commerce', 'Landing'];

export const TemplatesPage: React.FC = () => {
  const allTemplates = getAllTemplates();

  const [search, setSearch] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<TemplateCategory[]>([]);
  const [audience, setAudience] = useState<AudienceFilter>('All');
  const [sort, setSort] = useState<SortKey>('popular');
  const [isTitleCollapsed, setIsTitleCollapsed] = useState(false);

  const [isAdvancedOpen, setAdvancedOpen] = useState(false);
  const [priceMin, setPriceMin] = useState<number | undefined>();
  const [priceMax, setPriceMax] = useState<number | undefined>();
  const [filterPopular, setFilterPopular] = useState(false);
  const [filterNew, setFilterNew] = useState(false);
  const [filterHot, setFilterHot] = useState(false);
  const [filterDiscount, setFilterDiscount] = useState(false);
  const [typeFilters, setTypeFilters] = useState<TemplateItem['templateType'][]>([]);
  const [industryFilters, setIndustryFilters] = useState<TemplateCategory[]>([]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsTitleCollapsed(scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleCategory = (cat: TemplateCategory) => {
    setSelectedCategories((prev) => (prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]));
  };

  const toggleType = (type: TemplateItem['templateType']) => {
    setTypeFilters((prev) => (prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]));
  };

  const toggleIndustry = (cat: TemplateCategory) => {
    setIndustryFilters((prev) => (prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]));
  };

  const resetAdvanced = () => {
    setPriceMin(undefined);
    setPriceMax(undefined);
    setFilterPopular(false);
    setFilterNew(false);
    setFilterHot(false);
    setFilterDiscount(false);
    setTypeFilters([]);
    setIndustryFilters([]);
  };

  const filteredTemplates = useMemo(() => {
    let list = [...allTemplates];

    if (search.trim()) {
      const term = search.toLowerCase();
      list = list.filter(
        (t) =>
          t.name.toLowerCase().includes(term) ||
          t.shortDescription.toLowerCase().includes(term) ||
          t.categories.some((c) => c.toLowerCase().includes(term))
      );
    }

    if (selectedCategories.length) {
      list = list.filter((t) => selectedCategories.some((cat) => t.categories.includes(cat)));
    }

    if (audience !== 'All') {
      list = list.filter((t) => t.audience === audience);
    }

    if (priceMin !== undefined) {
      list = list.filter((t) => t.price >= priceMin);
    }

    if (priceMax !== undefined) {
      list = list.filter((t) => t.price <= priceMax);
    }

    if (filterPopular) {
      list = list.filter((t) => t.isPopular || t.popularityScore >= 80);
    }

    if (filterNew) {
      list = list.filter((t) => t.isNew);
    }

    if (filterHot) {
      list = list.filter((t) => t.isHot);
    }

    if (filterDiscount) {
      list = list.filter((t) => t.originalPrice && t.originalPrice > t.price);
    }

    if (typeFilters.length) {
      list = list.filter((t) => typeFilters.includes(t.templateType));
    }

    if (industryFilters.length) {
      list = list.filter((t) => industryFilters.some((cat) => t.categories.includes(cat)));
    }

    switch (sort) {
      case 'newest':
        list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
      case 'price-asc':
        list.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        list.sort((a, b) => b.price - a.price);
        break;
      default:
        list.sort((a, b) => b.popularityScore - a.popularityScore);
    }

    return list;
  }, [
    allTemplates,
    audience,
    filterDiscount,
    filterHot,
    filterNew,
    filterPopular,
    industryFilters,
    priceMax,
    priceMin,
    search,
    selectedCategories,
    sort,
    typeFilters
  ]);

  const activeChips: Array<{ label: string; onRemove: () => void }> = [];
  selectedCategories.forEach((cat) => activeChips.push({ label: cat, onRemove: () => toggleCategory(cat) }));
  industryFilters.forEach((cat) => activeChips.push({ label: `Industry: ${cat}`, onRemove: () => toggleIndustry(cat) }));
  typeFilters.forEach((type) => activeChips.push({ label: `Type: ${type}`, onRemove: () => toggleType(type) }));
  if (audience !== 'All') activeChips.push({ label: `Audience: ${audience}`, onRemove: () => setAudience('All') });
  if (filterPopular) activeChips.push({ label: 'Most chosen', onRemove: () => setFilterPopular(false) });
  if (filterNew) activeChips.push({ label: 'New', onRemove: () => setFilterNew(false) });
  if (filterHot) activeChips.push({ label: 'Hot', onRemove: () => setFilterHot(false) });
  if (filterDiscount) activeChips.push({ label: 'Discount', onRemove: () => setFilterDiscount(false) });
  if (priceMin !== undefined) activeChips.push({ label: `Min: ${priceMin}`, onRemove: () => setPriceMin(undefined) });
  if (priceMax !== undefined) activeChips.push({ label: `Max: ${priceMax}`, onRemove: () => setPriceMax(undefined) });

  return (
    <section className="space-y-6">
      <header 
        className={`space-y-2 transition-all duration-300 ${
          isTitleCollapsed 
            ? 'opacity-0 max-h-0 overflow-hidden mb-0' 
            : 'opacity-100 max-h-40 mb-4'
        }`}
      >
        <h1 className="text-3xl font-semibold tracking-tight text-slate-900 dark:text-white">K-WingX Templates</h1>
        <p className="text-sm text-slate-600 dark:text-slate-300">
          Choose a template for MMO services, proxy, game account sales, or e-commerce.
        </p>
      </header>

      <div className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
          <div className="relative flex-1">
            <FiSearch className="absolute left-3 top-2.5 h-5 w-5 text-slate-400" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Tìm theo tên, mô tả, ngành..."
              className={`w-full rounded-md border border-slate-200 bg-white py-2 text-sm text-slate-800 placeholder:text-slate-400 focus:border-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:placeholder:text-slate-500 ${
                search ? 'px-10 pr-10' : 'px-10'
              }`}
            />
            {search && (
              <button
                onClick={() => setSearch('')}
                className="absolute right-3 top-2.5 h-5 w-5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
                aria-label="Clear search"
              >
                <FiX className="h-5 w-5" />
              </button>
            )}
          </div>
          <div className="flex flex-wrap gap-2">
            <select
              value={audience}
              onChange={(e) => setAudience(e.target.value as AudienceFilter)}
              className="rounded-md border border-slate-200 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
            >
              <option value="All">Audience: All</option>
              <option value="B2B">B2B</option>
              <option value="B2C">B2C</option>
              <option value="Both">Both</option>
            </select>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortKey)}
              className="rounded-md border border-slate-200 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
            >
              <option value="popular">Popular</option>
              <option value="newest">Newest</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
            <button
              type="button"
              onClick={() => setAdvancedOpen(true)}
              className="inline-flex items-center gap-2 rounded-md border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-100 dark:hover:bg-slate-800"
            >
              <FiFilter /> Advanced Filters
            </button>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedCategories([])}
            className={`rounded-full px-3 py-1 text-sm ${
              selectedCategories.length === 0
                ? 'bg-sky-600 text-white'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-100'
            }`}
          >
            All categories
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => toggleCategory(cat)}
              className={`rounded-full px-3 py-1 text-sm ${
                selectedCategories.includes(cat)
                  ? 'bg-sky-600 text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3 text-sm text-slate-600 dark:text-slate-300">
        <span className="font-medium text-slate-900 dark:text-white">Showing {filteredTemplates.length} templates</span>
        <div className="flex flex-wrap gap-2">
          {activeChips.map((chip) => (
            <button
              key={chip.label}
              onClick={chip.onRemove}
              className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-200"
            >
              {chip.label} ✕
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {filteredTemplates.map((template) => (
          <TemplateCard key={template.id} template={template} />
        ))}
      </div>

      <Modal isOpen={isAdvancedOpen} onClose={() => setAdvancedOpen(false)} title="Advanced Filters">
        <div className="space-y-4 text-slate-100">
          <div className="grid gap-3 md:grid-cols-2">
            <label className="text-sm">
              Price min
              <input
                type="number"
                value={priceMin ?? ''}
                onChange={(e) => setPriceMin(e.target.value ? Number(e.target.value) : undefined)}
                className="mt-1 w-full rounded-md border border-white/10 bg-slate-800 px-3 py-2 text-sm focus:border-sky-400 focus:outline-none"
              />
            </label>
            <label className="text-sm">
              Price max
              <input
                type="number"
                value={priceMax ?? ''}
                onChange={(e) => setPriceMax(e.target.value ? Number(e.target.value) : undefined)}
                className="mt-1 w-full rounded-md border border-white/10 bg-slate-800 px-3 py-2 text-sm focus:border-sky-400 focus:outline-none"
              />
            </label>
          </div>

          <div className="grid gap-3 md:grid-cols-2">
            <div className="space-y-2">
              <p className="text-sm font-semibold">Toggles</p>
              <div className="flex flex-wrap gap-2 text-xs">
                <label className="inline-flex items-center gap-2">
                  <input type="checkbox" checked={filterPopular} onChange={(e) => setFilterPopular(e.target.checked)} /> Most chosen
                </label>
                <label className="inline-flex items-center gap-2">
                  <input type="checkbox" checked={filterNew} onChange={(e) => setFilterNew(e.target.checked)} /> New templates
                </label>
                <label className="inline-flex items-center gap-2">
                  <input type="checkbox" checked={filterHot} onChange={(e) => setFilterHot(e.target.checked)} /> Hot templates
                </label>
                <label className="inline-flex items-center gap-2">
                  <input type="checkbox" checked={filterDiscount} onChange={(e) => setFilterDiscount(e.target.checked)} /> Discount only
                </label>
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-sm font-semibold">Template type</p>
              <div className="flex flex-wrap gap-2 text-xs">
                {templateTypes.map((type) => (
                  <button
                    key={type}
                    onClick={() => toggleType(type)}
                    className={`rounded-full px-3 py-1 ${typeFilters.includes(type) ? 'bg-sky-600 text-white' : 'bg-slate-800 text-slate-200'}`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <p className="text-sm font-semibold">Industries</p>
            <div className="flex flex-wrap gap-2 text-xs">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => toggleIndustry(cat)}
                  className={`rounded-full px-3 py-1 ${industryFilters.includes(cat) ? 'bg-sky-600 text-white' : 'bg-slate-800 text-slate-200'}`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="flex justify-end gap-3">
            <button
              onClick={resetAdvanced}
              className="rounded-md border border-white/20 px-4 py-2 text-sm font-semibold text-slate-200 hover:bg-white/10"
            >
              Reset
            </button>
            <button
              onClick={() => setAdvancedOpen(false)}
              className="rounded-md bg-sky-600 px-4 py-2 text-sm font-semibold text-white hover:bg-sky-700"
            >
              Apply
            </button>
          </div>
        </div>
      </Modal>
    </section>
  );
};
