import React from 'react';
import TemplateCard from './TemplateCard';
import { TemplateItem } from '../../data/templates';

type Props = {
  templates: TemplateItem[];
};

const SimilarTemplatesSection: React.FC<Props> = ({ templates }) => {
  if (!templates.length) return null;
  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Similar templates</h3>
          <p className="text-sm text-slate-600 dark:text-slate-300">Gợi ý khác phù hợp nhu cầu của bạn.</p>
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {templates.map((item) => (
          <TemplateCard key={item.id} template={item} variant="compact" />
        ))}
      </div>
    </section>
  );
};

export default SimilarTemplatesSection;




