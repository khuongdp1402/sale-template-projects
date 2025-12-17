import React from 'react';
import { TemplateItem } from '../../data/templates';

type Props = {
  template: TemplateItem;
};

const TemplateCustomersSection: React.FC<Props> = ({ template }) => {
  if (!template.usedByCustomers.length) return null;

  return (
    <section className="space-y-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div>
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Customers using this template</h3>
        <p className="text-sm text-slate-600 dark:text-slate-300">Các doanh nghiệp/creator đã triển khai.</p>
      </div>
      <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3">
        {template.usedByCustomers.map((customer) => (
          <div key={customer.name} className="rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-800/70">
            <div className="text-base font-semibold text-slate-900 dark:text-white">{customer.name}</div>
            <div className="text-sm text-slate-600 dark:text-slate-300">{customer.industry}</div>
            {customer.quote && <p className="mt-2 text-sm text-slate-700 dark:text-slate-200">“{customer.quote}”</p>}
          </div>
        ))}
      </div>
    </section>
  );
};

export default TemplateCustomersSection;





