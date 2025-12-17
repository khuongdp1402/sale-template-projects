import React from 'react';
import { Link } from 'react-router-dom';

export const MidArticleCTA: React.FC = () => {
    return (
        <div className="my-12 bg-gradient-to-br from-cyan-50 via-blue-50 to-purple-50 dark:from-slate-800 dark:via-slate-800 dark:to-slate-900 rounded-2xl p-8 md:p-10 border-2 border-cyan-200 dark:border-cyan-800 shadow-lg">
            <div className="text-center">
                <div className="inline-block bg-gradient-to-r from-cyan-500 to-blue-500 text-white text-sm font-bold px-4 py-2 rounded-full mb-4">
                    💡 Mẹo từ K-WingX
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-4">
                    Sẵn sàng áp dụng ngay?
                </h3>
                <p className="text-slate-600 dark:text-slate-300 mb-6 max-w-xl mx-auto">
                    K-WingX cung cấp templates chuyên nghiệp giúp bạn triển khai nhanh chóng mà không cần code từ đầu.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                        to="/templates"
                        className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold px-6 py-3 rounded-lg hover:shadow-xl hover:scale-105 transition-all"
                    >
                        Xem Templates
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </Link>
                    <Link
                        to="/contact"
                        className="inline-flex items-center justify-center gap-2 bg-white dark:bg-slate-700 text-slate-900 dark:text-white font-semibold px-6 py-3 rounded-lg border-2 border-slate-300 dark:border-slate-600 hover:border-cyan-500 dark:hover:border-cyan-500 hover:shadow-lg transition-all"
                    >
                        Tư vấn miễn phí
                    </Link>
                </div>
            </div>
        </div>
    );
};
