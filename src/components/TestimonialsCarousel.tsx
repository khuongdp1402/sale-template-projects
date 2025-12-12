import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

type Testimonial = {
  id: number;
  name: string;
  role: string;
  text: string;
  avatar: string;
  rating: number;
};

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Nguyễn Minh Khang',
    role: 'Chủ dự án MMO',
    rating: 5,
    text: 'K-WingX giúp tôi tạo landing mới trong vài phút và tự động hoá toàn bộ quy trình nhận đơn, nuôi đơn. Hiệu quả tăng rõ rệt sau 2 tuần.',
    avatar: 'https://i.pravatar.cc/150?img=32'
  },
  {
    id: 2,
    name: 'Lê Phương Anh',
    role: 'Shop thương mại điện tử',
    rating: 5,
    text: 'Kho template sẵn có giúp tôi lên chiến dịch flash sale cực nhanh. Chatbot và workflow tự động giúp giảm 60% thời gian chăm khách.',
    avatar: 'https://i.pravatar.cc/150?img=47'
  },
  {
    id: 3,
    name: 'Trần Hoài Nam',
    role: 'Dịch vụ social media',
    rating: 4,
    text: 'Các tool marketing của K-WingX hỗ trợ boost like/view/follow ổn định, an toàn. Đội ngũ hỗ trợ phản hồi rất nhanh khi cần.',
    avatar: 'https://i.pravatar.cc/150?img=12'
  },
  {
    id: 4,
    name: 'Vũ Thảo Nguyên',
    role: 'Founder agency quảng cáo',
    rating: 5,
    text: 'K-WingX cho phép team tôi chạy nhiều chiến dịch song song, tích hợp thanh toán và báo cáo rõ ràng. Sự ổn định giúp chúng tôi tự tin scale.',
    avatar: 'https://i.pravatar.cc/150?img=5'
  }
];

const starIcons = (rating: number) =>
  Array.from({ length: 5 }).map((_, index) => (
    <svg
      key={index}
      className={`h-4 w-4 ${index < rating ? 'text-amber-400' : 'text-slate-300 dark:text-slate-600'}`}
      fill="currentColor"
      viewBox="0 0 20 20"
    >
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  ));

const cardVariants = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.35, ease: 'easeOut' } },
  exit: { opacity: 0, y: -12, transition: { duration: 0.25, ease: 'easeIn' } }
};

const TestimonialsCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [itemsPerView, setItemsPerView] = useState(1);
  const touchStartX = useRef<number | null>(null);

  useEffect(() => {
    const updateItemsPerView = () => {
      setItemsPerView(window.innerWidth >= 1024 ? 2 : 1);
    };

    updateItemsPerView();
    window.addEventListener('resize', updateItemsPerView);
    return () => window.removeEventListener('resize', updateItemsPerView);
  }, []);

  const next = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  }, []);

  const prev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  }, []);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(next, 4500);
    return () => clearInterval(timer);
  }, [isPaused, next]);

  const visibleTestimonials = useMemo(
    () =>
      Array.from({ length: itemsPerView }, (_, offset) => testimonials[(currentIndex + offset) % testimonials.length]),
    [currentIndex, itemsPerView]
  );

  const handleTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
    touchStartX.current = event.touches[0].clientX;
  };

  const handleTouchEnd = (event: React.TouchEvent<HTMLDivElement>) => {
    if (touchStartX.current === null) return;
    const delta = event.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(delta) > 50) {
      delta > 0 ? prev() : next();
    }
    touchStartX.current = null;
  };

  return (
    <section className="rounded-3xl bg-slate-50 px-4 py-16 shadow-sm ring-1 ring-slate-200/70 dark:bg-slate-900/60 dark:ring-slate-800">
      <div className="mx-auto max-w-6xl space-y-10">
        <div className="space-y-3 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-600 dark:text-sky-300">Testimonials</p>
          <h2 className="text-3xl font-bold leading-tight text-slate-900 dark:text-white sm:text-4xl">
            Khách hàng nói gì về K-WingX?
          </h2>
          <p className="mx-auto max-w-2xl text-base text-slate-600 dark:text-slate-300">
            Cảm nhận từ các dự án MMO, cửa hàng eCommerce và đội ngũ dịch vụ digital khi đồng hành cùng K-WingX.
          </p>
        </div>

        <div className="relative">
          <div
            className="overflow-hidden"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={`${currentIndex}-${itemsPerView}`}
                variants={cardVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="grid gap-6 md:grid-cols-2"
              >
                {visibleTestimonials.map((testimonial) => (
                  <div
                    key={testimonial.id}
                    className="flex flex-col rounded-2xl border border-slate-200/70 bg-white/90 p-6 text-left shadow-lg backdrop-blur dark:border-slate-800 dark:bg-slate-800/80"
                  >
                    <div className="mb-4 flex items-center gap-3">
                      <img
                        src={testimonial.avatar}
                        alt={testimonial.name}
                        className="h-12 w-12 rounded-full object-cover ring-2 ring-sky-200 dark:ring-sky-500/60"
                        onError={(event) => {
                          const target = event.target as HTMLImageElement;
                          target.src = `https://ui-avatars.com/api/?background=random&name=${encodeURIComponent(testimonial.name)}`;
                        }}
                      />
                      <div>
                        <p className="text-base font-semibold text-slate-900 dark:text-white">{testimonial.name}</p>
                        <p className="text-sm text-sky-700 dark:text-sky-300">{testimonial.role}</p>
                      </div>
                    </div>
                    <div className="mb-3 flex items-center gap-1">{starIcons(testimonial.rating)}</div>
                    <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-200">“{testimonial.text}”</p>
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          <button
            onClick={prev}
            aria-label="Xem đánh giá trước"
            className="absolute -left-3 top-1/2 -translate-y-1/2 rounded-full border border-slate-200 bg-white p-2 text-slate-700 shadow-md transition hover:-translate-y-1/2 hover:-translate-x-0.5 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-sky-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700"
          >
            <FiChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={next}
            aria-label="Xem đánh giá tiếp"
            className="absolute -right-3 top-1/2 -translate-y-1/2 rounded-full border border-slate-200 bg-white p-2 text-slate-700 shadow-md transition hover:-translate-y-1/2 hover:translate-x-0.5 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-sky-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700"
          >
            <FiChevronRight className="h-5 w-5" />
          </button>

          <div className="mt-6 flex justify-center gap-2">
            {testimonials.map((testimonial, index) => (
              <button
                key={testimonial.id}
                onClick={() => setCurrentIndex(index)}
                aria-label={`Đến đánh giá của ${testimonial.name}`}
                className={`h-2 rounded-full transition-all ${
                  index === currentIndex ? 'w-6 bg-sky-500' : 'w-2.5 bg-slate-300 dark:bg-slate-700'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsCarousel;
