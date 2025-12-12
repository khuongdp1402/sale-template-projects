import React, { useState } from 'react';
import DemoVideoModal from './DemoVideoModal';
import Modal from '../common/Modal';
import { TemplateItem } from '../../data/templates';

type Props = {
  template: TemplateItem;
  onScrollToSupport?: () => void;
};

const TemplateInfoPanel: React.FC<Props> = ({ template, onScrollToSupport }) => {
  const [openDemo, setOpenDemo] = useState(false);
  const [openUse, setOpenUse] = useState(false);
  const hasDiscount = !!template.originalPrice && template.originalPrice > template.price;
  const discountPercent = hasDiscount
    ? Math.round(((template.originalPrice! - template.price) / template.originalPrice!) * 100)
    : 0;

  const formatPrice = (price: number, currency: TemplateItem['currency']) =>
    currency === 'USD' ? `$${price.toLocaleString()}` : `${price.toLocaleString()} ₫`;

  return (
    <div className="space-y-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="flex flex-wrap gap-2">
        {template.isNew && <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[11px] font-semibold text-emerald-700">NEW</span>}
        {template.isHot && <span className="rounded-full bg-rose-100 px-2 py-0.5 text-[11px] font-semibold text-rose-700">HOT</span>}
        {template.isPopular && <span className="rounded-full bg-indigo-100 px-2 py-0.5 text-[11px] font-semibold text-indigo-700">POPULAR</span>}
        {hasDiscount && <span className="rounded-full bg-amber-100 px-2 py-0.5 text-[11px] font-semibold text-amber-700">DISCOUNT</span>}
      </div>

      <div className="space-y-2">
        <h1 className="text-2xl font-semibold text-slate-900 dark:text-white">{template.name}</h1>
        <p className="text-sm text-slate-600 dark:text-slate-300">{template.shortDescription}</p>
      </div>

      <div className="flex items-end gap-3">
        <div className="flex flex-col">
          <div className="text-3xl font-bold text-slate-900 dark:text-white">{formatPrice(template.price, template.currency)}</div>
          {hasDiscount && (
            <div className="flex items-center gap-2 text-sm text-slate-500">
              <span className="line-through">{formatPrice(template.originalPrice!, template.currency)}</span>
              <span className="rounded-md bg-amber-100 px-2 py-0.5 text-xs font-semibold text-amber-700">{discountPercent}%</span>
            </div>
          )}
        </div>
        <div className="ml-auto flex flex-wrap gap-2 text-[11px]">
          {template.categories.map((cat) => (
            <span key={cat} className="rounded-full bg-slate-100 px-2 py-0.5 text-slate-700 dark:bg-slate-800 dark:text-slate-200">
              {cat}
            </span>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        <button
          onClick={() => setOpenDemo(true)}
          className="inline-flex flex-1 items-center justify-center rounded-md bg-sky-600 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-sky-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
        >
          Xem demo
        </button>
        <button
          onClick={() => setOpenUse(true)}
          className="inline-flex flex-1 items-center justify-center rounded-md border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-800 transition hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 dark:border-slate-700 dark:text-slate-100 dark:hover:bg-slate-800"
        >
          Dùng template này
        </button>
        <button
          onClick={onScrollToSupport}
          className="inline-flex flex-1 items-center justify-center rounded-md border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 dark:border-slate-700 dark:text-slate-100 dark:hover:bg-slate-800"
        >
          Liên hệ hỗ trợ
        </button>
      </div>

      <DemoVideoModal
        isOpen={openDemo}
        onClose={() => setOpenDemo(false)}
        title={template.demoVideo.title}
        src={template.demoVideo.src}
        poster={template.demoVideo.poster}
      />

      <Modal isOpen={openUse} onClose={() => setOpenUse(false)} title="Dùng template này">
        <div className="space-y-4 text-sm text-slate-200">
          <p>Chức năng thanh toán sẽ được mở sớm. Liên hệ đội ngũ để kích hoạt template này cho dự án của bạn.</p>
          <div className="flex gap-3">
            {template.supportContacts.messenger && (
              <a href={template.supportContacts.messenger} className="rounded-md bg-blue-600 px-4 py-2 text-white" target="_blank" rel="noreferrer">
                Messenger
              </a>
            )}
            {template.supportContacts.zalo && (
              <a href={template.supportContacts.zalo} className="rounded-md bg-sky-500 px-4 py-2 text-white" target="_blank" rel="noreferrer">
                Zalo
              </a>
            )}
            {template.supportContacts.telegram && (
              <a href={template.supportContacts.telegram} className="rounded-md bg-cyan-600 px-4 py-2 text-white" target="_blank" rel="noreferrer">
                Telegram
              </a>
            )}
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default TemplateInfoPanel;

