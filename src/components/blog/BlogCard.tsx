import React from 'react';
import { Link } from 'react-router-dom';
import { BlogPost } from '../../data/blog';

interface BlogCardProps {
    post: BlogPost;
    compact?: boolean;
}

const getCategoryColor = (category: string): string => {
    const colors: Record<string, string> = {
        'Hướng dẫn hệ sinh thái K-WingX': 'bg-gradient-to-r from-cyan-500 to-blue-500',
        'MMO & Kiếm tiền online': 'bg-gradient-to-r from-purple-500 to-pink-500',
        'Automation & Workflow': 'bg-gradient-to-r from-green-500 to-teal-500',
        'Marketing & Growth': 'bg-gradient-to-r from-orange-500 to-red-500',
        'Website & Templates': 'bg-gradient-to-r from-indigo-500 to-purple-500',
        'E-commerce': 'bg-gradient-to-r from-blue-500 to-cyan-500',
    };
    return colors[category] || 'bg-gradient-to-r from-gray-500 to-gray-600';
};

export const BlogCard: React.FC<BlogCardProps> = ({ post, compact = false }) => {
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('vi-VN', { year: 'numeric', month: 'long', day: 'numeric' });
    };

    return (
        <Link
            to={`/blog/${post.slug}`}
            className={`group block bg-white dark:bg-slate-800 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 ${compact ? 'flex flex-row' : ''
                }`}
        >
            {/* Cover Image */}
            <div className={`relative overflow-hidden ${compact ? 'w-40 flex-shrink-0' : 'aspect-video'}`}>
                <img
                    src={post.coverImage}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                {post.isTrending && (
                    <div className="absolute top-3 right-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                        🔥 Trending
                    </div>
                )}
            </div>

            {/* Content */}
            <div className={`p-5 ${compact ? 'flex-1' : ''}`}>
                {/* Category */}
                <div className="mb-3">
                    <span className={`inline-block text-white text-xs font-semibold px-3 py-1 rounded-full ${getCategoryColor(post.category)}`}>
                        {post.category}
                    </span>
                </div>

                {/* Title */}
                <h3 className={`font-bold text-slate-900 dark:text-white mb-2 line-clamp-2 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors ${compact ? 'text-base' : 'text-xl'
                    }`}>
                    {post.title}
                </h3>

                {/* Excerpt */}
                {!compact && (
                    <p className="text-slate-600 dark:text-slate-300 text-sm mb-4 line-clamp-2">
                        {post.excerpt}
                    </p>
                )}

                {/* Meta */}
                <div className="flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400">
                    <span>{formatDate(post.publishedAt)}</span>
                    <span>•</span>
                    <span>{post.readTimeMinutes} phút đọc</span>
                    <span>•</span>
                    <span>{post.views.toLocaleString()} lượt xem</span>
                </div>

                {/* Tags */}
                {!compact && post.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-3">
                        {post.tags.slice(0, 3).map((tag) => (
                            <span
                                key={tag}
                                className="text-xs bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 px-2 py-1 rounded"
                            >
                                #{tag}
                            </span>
                        ))}
                    </div>
                )}
            </div>
        </Link>
    );
};
