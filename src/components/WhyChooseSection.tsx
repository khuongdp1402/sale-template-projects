import React from 'react';
import { motion } from 'framer-motion';
import { FiZap, FiLayers, FiCpu, FiTrendingUp, FiCreditCard, FiShield } from 'react-icons/fi';

type Feature = {
  icon: JSX.Element;
  title: string;
  description: string;
};

const features: Feature[] = [
  {
    icon: <FiZap className="h-6 w-6 text-sky-400" />,
    title: 'Triển khai website tự động trong vài phút',
    description: 'Khởi tạo site, kết nối domain và sẵn sàng bán hàng chỉ với vài cú nhấp chuột.'
  },
  {
    icon: <FiLayers className="h-6 w-6 text-violet-400" />,
    title: 'Kho template đa dạng cho MMO & thương mại điện tử',
    description: 'Hàng chục giao diện tối ưu chuyển đổi, phù hợp nhiều mô hình kiếm tiền online.'
  },
  {
    icon: <FiCpu className="h-6 w-6 text-emerald-400" />,
    title: 'Hệ thống chatbot & workflow tự động hoá',
    description: 'Xử lý đơn, nhắn tin, chăm sóc khách hàng và tác vụ vận hành hoàn toàn tự động.'
  },
  {
    icon: <FiTrendingUp className="h-6 w-6 text-amber-400" />,
    title: 'Công cụ marketing tăng like/view/follow',
    description: 'Bộ công cụ social growth giúp đẩy reach, tăng tín nhiệm và thúc đẩy doanh số.'
  },
  {
    icon: <FiCreditCard className="h-6 w-6 text-rose-400" />,
    title: 'API thanh toán cho tool MMO',
    description: 'Kết nối cổng thanh toán linh hoạt, bảo mật cao, sẵn sàng tích hợp cho các tool.'
  },
  {
    icon: <FiShield className="h-6 w-6 text-indigo-400" />,
    title: 'Bảo mật – tốc độ – khả năng mở rộng cao',
    description: 'Hạ tầng tối ưu hiệu năng, sẵn sàng mở rộng và bảo vệ dữ liệu kinh doanh của bạn.'
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 }
  }
};

const itemVariants = {
  hidden: { y: 18, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] as const }
  }
};

const WhyChooseSection: React.FC = () => {
  return (
    <section className="rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 px-4 py-16 shadow-xl ring-1 ring-white/5 dark:from-slate-900 dark:via-slate-900 dark:to-slate-950">
      <div className="mx-auto max-w-6xl space-y-10">
        <div className="space-y-3 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-200/90">K-WingX Advantage</p>
          <h2 className="text-3xl font-bold leading-tight text-white sm:text-4xl">Vì sao nên chọn K-WingX?</h2>
          <p className="mx-auto max-w-2xl text-base text-slate-200/80">
            Bộ giải pháp toàn diện để bạn triển khai, vận hành và tăng trưởng kinh doanh online nhanh chóng.
          </p>
        </div>

        <motion.div
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          {features.map((feature) => (
            <motion.div
              key={feature.title}
              variants={itemVariants}
              whileHover={{ y: -6, scale: 1.01 }}
              transition={{ type: 'spring', stiffness: 260, damping: 20 }}
              className="group relative overflow-hidden rounded-2xl border border-white/5 bg-white/5 p-5 shadow-lg backdrop-blur"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-white/0 to-white/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <div className="relative flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 text-white ring-1 ring-white/10">
                {feature.icon}
              </div>
              <h3 className="relative mt-4 text-lg font-semibold text-white">{feature.title}</h3>
              <p className="relative mt-2 text-sm text-slate-200/80 leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default WhyChooseSection;
