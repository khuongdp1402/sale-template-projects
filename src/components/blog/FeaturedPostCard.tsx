import React from 'react';
import { Link } from 'react-router-dom';
import { BlogPost } from '../../data/blog';

interface FeaturedPostCardProps {
    post: BlogPost;
}

export const FeaturedPostCard: React.FC<FeaturedPostCardProps> = ({ post }) => {
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('vi-VN', { year: 'numeric', month: 'long', day: 'numeric' });
    };

    return (
        <Link
            to={`/blog/${post.slug}`}
            className="group block bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-300"
        >
            <div className="md:flex">
                {/* Image */}
                <div className="md:w-1/2 relative overflow-hidden">
                    <img
                        src={post.coverImage}
                        alt={post.title}
                        className="w-full h-64 md:h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4 bg-yellow-400 text-slate-900 text-xs font-bold px-3 py-1.5 rounded-full">
                        ⭐ Nổi bật
                    </div>
                </div>

                {/* Content */}
                <div className="md:w-1/2 p-8 text-white">
                    <div className="mb-4">
                        <span className="inline-block bg-white/20 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1 rounded-full">
                            {post.category}
                        </span>
                    </div>

                    <h2 className="text-3xl font-bold mb-4 group-hover:text-yellow-300 transition-colors">
                        {post.title}
                    </h2>

                    <p className="text-white/90 text-base mb-6 line-clamp-3">
                        {post.excerpt}
                    </p>

                    <div className="flex items-center gap-4 text-sm text-white/80 mb-6">
                        <span>{formatDate(post.publishedAt)}</span>
                        <span>•</span>
                        <span>{post.readTimeMinutes} phút đọc</span>
                        <span>•</span>
                        <span>{post.views.toLocaleString()} lượt xem</span>
                    </div>

                    <div className="inline-flex items-center gap-2 bg-white text-cyan-600 font-semibold px-6 py-3 rounded-lg group-hover:bg-yellow-300 group-hover:text-slate-900 transition-colors">
                        Đọc tiếp
                        <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </div>
                </div>
            </div>
        </Link>
    );
};
