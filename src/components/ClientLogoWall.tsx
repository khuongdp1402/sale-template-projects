import React from 'react';
import { motion } from 'framer-motion';

type ClientLogo = {
  name: string;
  src: string;
};

const clientLogos: ClientLogo[] = [
  { name: 'MMO Hub', src: '/clients/client-1.png' },
  { name: 'Ecom Fast', src: '/clients/client-2.png' },
  { name: 'Social Boost', src: '/clients/client-3.png' },
  { name: 'AdPlus Agency', src: '/clients/client-4.png' },
  { name: 'FlowAI', src: '/clients/client-5.png' },
  { name: 'PayLink', src: '/clients/client-6.png' },
  { name: 'NextShop', src: '/clients/client-7.png' },
  { name: 'Creator Lab', src: '/clients/client-8.png' },
  { name: 'Growth Bay', src: '/clients/client-9.png' },
  { name: 'DataPilot', src: '/clients/client-10.png' }
];

const ClientLogoWall: React.FC = () => {
  return (
    <section className="rounded-3xl bg-white px-4 py-16 shadow-sm ring-1 ring-slate-200/70 dark:bg-slate-900/70 dark:ring-slate-800">
      <div className="mx-auto max-w-6xl space-y-10">
        <div className="space-y-3 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-600 dark:text-sky-300">Partners</p>
          <h2 className="text-3xl font-bold leading-tight text-slate-900 dark:text-white sm:text-4xl">
            Khách hàng &amp; đối tác tiêu biểu
          </h2>
          <p className="mx-auto max-w-2xl text-base text-slate-600 dark:text-slate-300">
            Hệ sinh thái doanh nghiệp, nhà phát triển và nhà quảng cáo đang vận hành trên nền tảng K-WingX.
          </p>
        </div>

        <motion.div
          className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5 }}
        >
          {clientLogos.map((logo) => (
            <motion.div
              key={logo.name}
              whileHover={{ y: -4, scale: 1.02 }}
              className="flex items-center justify-center rounded-xl border border-slate-200/70 bg-slate-50 p-4 shadow-sm transition hover:border-slate-300 hover:bg-white dark:border-slate-800 dark:bg-slate-800/80 dark:hover:border-slate-700"
            >
              <img
                src={logo.src}
                alt={logo.name}
                className="h-12 w-full object-contain grayscale opacity-80 transition duration-300 hover:grayscale-0 hover:opacity-100"
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ClientLogoWall;




