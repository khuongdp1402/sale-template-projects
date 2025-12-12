import React from 'react';
import { motion } from 'framer-motion';
import { FiTarget, FiEye, FiStar, FiFeather, FiZap, FiSmile, FiShield, FiHeart } from 'react-icons/fi';

const BrandMissionSection: React.FC = () => {
  return (
    <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-700 via-purple-700 to-sky-600 px-4 py-16 text-white shadow-xl">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.08),transparent_35%),radial-gradient(circle_at_80%_0%,rgba(255,255,255,0.08),transparent_35%)]" />
      <div className="relative mx-auto max-w-6xl grid gap-12 md:grid-cols-2 md:items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-100/90">Brand DNA</p>
          <h2 className="text-3xl font-bold leading-tight sm:text-4xl">K-WingX là ai?</h2>
          <div className="space-y-4 rounded-2xl bg-white/10 p-5 backdrop-blur">
            <div className="flex items-start gap-3">
              <FiTarget className="mt-1 h-5 w-5 text-amber-300" />
              <div>
                <p className="text-sm font-semibold uppercase text-amber-100">Sứ mệnh</p>
                <p className="text-base text-white/90">
                  Mang công nghệ tự động hoá đến mọi cá nhân và doanh nghiệp kinh doanh online.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <FiEye className="mt-1 h-5 w-5 text-sky-100" />
              <div>
                <p className="text-sm font-semibold uppercase text-sky-100">Tầm nhìn</p>
                <p className="text-base text-white/90">
                  Trở thành nền tảng tạo website &amp; workflow MMO hàng đầu Đông Nam Á.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <FiStar className="mt-1 h-5 w-5 text-emerald-200" />
              <div>
                <p className="text-sm font-semibold uppercase text-emerald-100">Giá trị cốt lõi</p>
                <ul className="mt-2 grid grid-cols-2 gap-2 text-sm text-white/90 sm:grid-cols-3">
                  <li className="flex items-center gap-1"><FiZap className="h-4 w-4" /> Tốc độ</li>
                  <li className="flex items-center gap-1"><FiFeather className="h-4 w-4" /> Đơn giản</li>
                  <li className="flex items-center gap-1"><FiSmile className="h-4 w-4" /> Hiệu quả</li>
                  <li className="flex items-center gap-1"><FiShield className="h-4 w-4" /> Tin cậy</li>
                  <li className="flex items-center gap-1"><FiHeart className="h-4 w-4" /> Hỗ trợ tận tâm</li>
                </ul>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="relative"
        >
          <div className="absolute -inset-6 rounded-3xl bg-white/5 blur-3xl" aria-hidden />
          <div className="relative overflow-hidden rounded-3xl border border-white/15 bg-white/10 p-8 backdrop-blur">
            <div className="flex flex-col gap-4">
              <div className="rounded-2xl bg-gradient-to-r from-white/20 to-white/5 p-4 text-center shadow-lg">
                <p className="text-sm uppercase tracking-[0.2em] text-white/80">Slogan</p>
                <p className="text-2xl font-semibold text-white sm:text-3xl">Build Fast. Earn Faster.</p>
                <p className="text-lg text-sky-50/90 sm:text-xl">Làm nhanh – Kiếm nhanh.</p>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl bg-white/10 p-4">
                  <p className="text-xs uppercase tracking-[0.15em] text-white/80">Cốt lõi</p>
                  <h3 className="mt-2 text-xl font-semibold text-white">Tăng trưởng bền vững</h3>
                  <p className="mt-1 text-sm text-white/80">
                    Hệ thống tối ưu hiệu năng, bảo mật, khả năng mở rộng cho mọi chiến dịch.
                  </p>
                </div>
                <div className="rounded-2xl bg-white/10 p-4">
                  <p className="text-xs uppercase tracking-[0.15em] text-white/80">Con người</p>
                  <h3 className="mt-2 text-xl font-semibold text-white">Đồng hành &amp; hỗ trợ</h3>
                  <p className="mt-1 text-sm text-white/80">
                    Đội ngũ tận tâm, chuyên nghiệp, luôn sẵn sàng hỗ trợ 24/7 trong vận hành.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default BrandMissionSection;

