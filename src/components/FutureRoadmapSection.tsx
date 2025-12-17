import React from 'react';
import { motion } from 'framer-motion';
import { FiCheckCircle, FiCpu, FiLayers, FiAperture, FiTrendingUp } from 'react-icons/fi';

type Milestone = {
  title: string;
  description: string;
  icon: JSX.Element;
};

const milestones: Milestone[] = [
  {
    title: 'Mở rộng 100+ template cho MMO & eCommerce',
    description: 'Liên tục bổ sung giao diện tối ưu chuyển đổi cho nhiều ngành hàng và mô hình kiếm tiền.',
    icon: <FiLayers className="h-5 w-5" />
  },
  {
    title: 'Tích hợp 50+ API thanh toán & tool tự động',
    description: 'Kết nối liền mạch với cổng thanh toán, dịch vụ vận chuyển và các tool MMO phổ biến.',
    icon: <FiCheckCircle className="h-5 w-5" />
  },
  {
    title: 'Nền tảng workflow AI hỗ trợ kinh doanh',
    description: 'Tự động gợi ý kịch bản chăm sóc, upsell và tối ưu quảng cáo dựa trên dữ liệu thực tế.',
    icon: <FiCpu className="h-5 w-5" />
  },
  {
    title: 'Trung tâm tool marketing tăng trưởng',
    description: 'Kho công cụ tăng like/view/follow an toàn, kết hợp báo cáo real-time để tối ưu hiệu quả.',
    icon: <FiTrendingUp className="h-5 w-5" />
  },
  {
    title: 'Marketplace tiện ích mở rộng',
    description: 'Cho phép cộng đồng phát triển và bán các addon, mở rộng hệ sinh thái K-WingX.',
    icon: <FiAperture className="h-5 w-5" />
  }
];

const FutureRoadmapSection: React.FC = () => {
  return (
    <section className="rounded-3xl bg-white px-4 py-16 shadow-sm ring-1 ring-slate-200/70 dark:bg-slate-900/70 dark:ring-slate-800">
      <div className="mx-auto max-w-6xl space-y-10">
        <div className="space-y-3 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-600 dark:text-sky-300">Roadmap</p>
          <h2 className="text-3xl font-bold leading-tight text-slate-900 dark:text-white sm:text-4xl">
            Định hướng tương lai của K-WingX
          </h2>
          <p className="mx-auto max-w-2xl text-base text-slate-600 dark:text-slate-300">
            Những cột mốc chúng tôi đang theo đuổi để mang lại trải nghiệm tốt hơn cho cộng đồng MMO và eCommerce.
          </p>
        </div>

        <div className="relative">
          <div className="pointer-events-none absolute left-4 top-12 h-[calc(100%-3rem)] w-px bg-slate-200 dark:bg-slate-800 md:left-0 md:top-14 md:h-px md:w-full" />
          <div className="flex flex-col gap-6 md:grid md:grid-cols-5">
            {milestones.map((milestone, index) => (
              <motion.div
                key={milestone.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.45, delay: index * 0.05 }}
                className="relative rounded-2xl border border-slate-200/70 bg-slate-50 p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg dark:border-slate-800 dark:bg-slate-800/70"
              >
                <div className="absolute -left-4 top-6 h-8 w-8 rounded-full border border-slate-200 bg-white text-slate-700 shadow-sm ring-4 ring-white dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:ring-slate-900 md:-top-4 md:left-1/2 md:-translate-x-1/2">
                  <div className="flex h-full items-center justify-center text-sm font-semibold">{index + 1}</div>
                </div>
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-sky-100 text-sky-700 ring-1 ring-sky-200 dark:bg-sky-900/40 dark:text-sky-200 dark:ring-sky-800">
                  {milestone.icon}
                </div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white">{milestone.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">{milestone.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FutureRoadmapSection;






