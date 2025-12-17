import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import CardCarousel from './CardCarousel';
import DemoVideoModal from './DemoVideoModal';
import { TemplateItem } from '../../data/templates';

type Props = {
  template: TemplateItem;
  variant?: 'default' | 'compact';
};

const badgeStyles = {
  new: 'bg-emerald-100 text-emerald-700 border-emerald-200',
  hot: 'bg-rose-100 text-rose-700 border-rose-200',
  popular: 'bg-indigo-100 text-indigo-700 border-indigo-200',
  discount: 'bg-amber-100 text-amber-700 border-amber-200'
};

const formatPrice = (price: number, currency: TemplateItem['currency']) =>
  currency === 'USD' ? `$${price.toLocaleString()}` : `${price.toLocaleString()} ₫`;

const TemplateCard: React.FC<Props> = ({ template, variant = 'default' }) => {
  const [openDemo, setOpenDemo] = useState(false);
  const hasDiscount = !!template.originalPrice && template.originalPrice > template.price;
  const discountPercent = hasDiscount
    ? Math.round(((template.originalPrice! - template.price) / template.originalPrice!) * 100)
    : 0;

  const padding = variant === 'compact' ? 'p-4' : 'p-5';

  return (
    <div className={`flex h-full flex-col rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900 ${padding}`}>
      <CardCarousel items={template.cardMedia} />

      <div className="mt-4 flex flex-wrap gap-2">
        {template.isNew && <span className={`rounded-full border px-2 py-0.5 text-[11px] font-semibold ${badgeStyles.new}`}>NEW</span>}
        {template.isHot && <span className={`rounded-full border px-2 py-0.5 text-[11px] font-semibold ${badgeStyles.hot}`}>HOT</span>}
        {template.isPopular && <span className={`rounded-full border px-2 py-0.5 text-[11px] font-semibold ${badgeStyles.popular}`}>POPULAR</span>}
        {hasDiscount && <span className={`rounded-full border px-2 py-0.5 text-[11px] font-semibold ${badgeStyles.discount}`}>DISCOUNT</span>}
      </div>

      <div className="mt-3 space-y-1">
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white">{template.name}</h3>
        <p className="text-sm text-slate-600 dark:text-slate-300">{template.shortDescription}</p>
      </div>

      <div className="mt-3 flex items-end gap-3">
        <div className="flex flex-col">
          <div className="text-xl font-semibold text-slate-900 dark:text-white">
            {formatPrice(template.price, template.currency)}
          </div>
          {hasDiscount && (
            <div className="flex items-center gap-2 text-sm">
              <span className="text-slate-400 line-through">{formatPrice(template.originalPrice!, template.currency)}</span>
              <span className="rounded-md bg-amber-100 px-2 py-0.5 text-xs font-semibold text-amber-700">{discountPercent}%</span>
            </div>
          )}
        </div>
        <div className="ml-auto flex flex-wrap gap-2 text-[11px]">
          {template.categories.slice(0, 3).map((cat) => (
            <span key={cat} className="rounded-full bg-slate-100 px-2 py-0.5 text-slate-700 dark:bg-slate-800 dark:text-slate-200">
              {cat}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-3">
        <Link
          to={`/templates/${template.id}`}
          className="inline-flex flex-1 items-center justify-center rounded-md bg-sky-600 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-sky-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
        >
          Xem chi tiết
        </Link>
        <button
          type="button"
          onClick={() => setOpenDemo(true)}
          className="inline-flex flex-1 items-center justify-center rounded-md border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-800 transition hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 dark:border-slate-700 dark:text-slate-100 dark:hover:bg-slate-800"
        >
          Xem demo
        </button>
      </div>

      <DemoVideoModal
        isOpen={openDemo}
        onClose={() => setOpenDemo(false)}
        title={template.demoVideo.title}
        src={template.demoVideo.src}
        poster={template.demoVideo.poster}
      />
    </div>
  );
};

export default TemplateCard;




