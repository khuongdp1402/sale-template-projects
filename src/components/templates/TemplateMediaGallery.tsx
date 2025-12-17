import React, { useMemo, useState } from 'react';
import { TemplateItem } from '../../data/templates';
import { FiPlay } from 'react-icons/fi';

type Props = {
  template: TemplateItem;
};

const TemplateMediaGallery: React.FC<Props> = ({ template }) => {
  const media = useMemo(() => template.gallery, [template.gallery]);
  const [activeIndex, setActiveIndex] = useState(0);
  const active = media[activeIndex];

  return (
    <div className="space-y-4">
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        {active.type === 'image' ? (
          <img src={active.src} alt={active.title ?? template.name} className="w-full rounded-2xl object-cover" />
        ) : (
          <video
            controls
            poster={active.thumb}
            className="w-full rounded-2xl"
            src={active.src}
            preload="metadata"
          >
            Your browser does not support the video tag.
          </video>
        )}
      </div>
      <div className="grid grid-cols-3 gap-3 md:grid-cols-5">
        {media.map((item, idx) => (
          <button
            key={item.src}
            onClick={() => setActiveIndex(idx)}
            className={`group relative overflow-hidden rounded-xl border ${
              idx === activeIndex ? 'border-sky-500 ring-2 ring-sky-200 dark:ring-sky-700' : 'border-slate-200 dark:border-slate-700'
            }`}
            aria-label={item.title ?? `${template.name} media ${idx + 1}`}
          >
            <img src={item.thumb} alt={item.title ?? template.name} className="h-20 w-full object-cover" />
            {item.type === 'video' && (
              <span className="absolute inset-0 flex items-center justify-center bg-black/30 text-white">
                <FiPlay className="h-6 w-6" />
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TemplateMediaGallery;





