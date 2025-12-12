import React from 'react';
import { Link } from 'react-router-dom';
import { getPostsByCategory } from '../../data/blog';
import { BlogCard } from './BlogCard';

export const GuidesHighlightSection: React.FC = () => {
    const guidePosts = getPostsByCategory('Hướng dẫn hệ sinh thái K-WingX').slice(0, 6);

    if (guidePosts.length === 0) return null;

    return (
        <section className="py-16 bg-gradient-to-br from-cyan-50 to-blue-50 dark:from-slate-800 dark:to-slate-900 rounded-2xl">
            <div className="container mx-auto px-4">
                {/* Header */}
                <div className="text-center mb-12">
                    <div className="inline-block bg-gradient-to-r from-cyan-500 to-blue-500 text-white text-sm font-bold px-4 py-2 rounded-full mb-4">
                        📚 Hướng dẫn đặc biệt
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
                        Hướng dẫn hệ sinh thái K-WingX
                    </h2>
                    <p className="text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
                        Tận dụng tối đa các template và dịch vụ của K-WingX với hướng dẫn chi tiết từ chuyên gia
                    </p>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                    {guidePosts.map((post) => (
                        <BlogCard key={post.id} post={post} />
                    ))}
                </div>

                {/* CTA */}
                <div className="text-center">
                    <Link
                        to="/templates"
                        className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold px-8 py-4 rounded-lg hover:shadow-xl hover:scale-105 transition-all"
                    >
                        Khám phá Templates K-WingX
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </Link>
                </div>
            </div>
        </section>
    );
};
