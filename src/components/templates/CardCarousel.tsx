import React, { useEffect, useState } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

type CarouselItem = {
  type: 'image';
  src: string;
};

type Props = {
  items: CarouselItem[];
  autoPlay?: boolean;
  interval?: number;
};

const CardCarousel: React.FC<Props> = ({ items, autoPlay = true, interval = 4000 }) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!autoPlay || items.length <= 1) return;
    const timer = setInterval(() => setIndex((prev) => (prev + 1) % items.length), interval);
    return () => clearInterval(timer);
  }, [autoPlay, interval, items.length]);

  if (!items.length) return null;

  const prev = () => setIndex((prev) => (prev - 1 + items.length) % items.length);
  const next = () => setIndex((prev) => (prev + 1) % items.length);

  return (
    <div className="relative overflow-hidden rounded-xl border border-slate-200/70 bg-slate-50 dark:border-slate-800 dark:bg-slate-900">
      <div className="aspect-video w-full">
        <img src={items[index].src} alt="" className="h-full w-full object-cover" loading="lazy" />
      </div>

      {items.length > 1 && (
        <>
          <button
            onClick={prev}
            aria-label="Previous"
            className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-2 text-slate-700 shadow transition hover:bg-white dark:bg-slate-800/80 dark:text-white"
          >
            <FiChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={next}
            aria-label="Next"
            className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-2 text-slate-700 shadow transition hover:bg-white dark:bg-slate-800/80 dark:text-white"
          >
            <FiChevronRight className="h-5 w-5" />
          </button>
          <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1">
            {items.map((_, i) => (
              <span
                key={i}
                className={`h-1.5 rounded-full transition-all ${i === index ? 'w-4 bg-sky-500' : 'w-2 bg-white/70 dark:bg-slate-600'}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default CardCarousel;








