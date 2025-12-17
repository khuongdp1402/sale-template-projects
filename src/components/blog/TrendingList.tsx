import React from 'react';
import { Link } from 'react-router-dom';
import { getTrendingPosts } from '../../data/blog';

export const TrendingList: React.FC = () => {
    const trendingPosts = getTrendingPosts(5);

    if (trendingPosts.length === 0) return null;

    const formatReadTime = (minutes: number) => `${minutes} phút`;
    const formatViews = (views: number) => views.toLocaleString();

    return (
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg border border-slate-200 dark:border-slate-700">
            <div className="flex items-center gap-2 mb-6">
                <span className="text-2xl">🔥</span>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                    Trending Now
                </h3>
            </div>
            <div className="space-y-4">
                {trendingPosts.map((post, index) => (
                    <Link
                        key={post.id}
                        to={`/blog/${post.slug}`}
                        className="group block"
                    >
                        <div className="flex gap-3">
                            <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-gradient-to-br from-cyan-500 to-blue-500 text-white font-bold rounded-lg text-sm">
                                {index + 1}
                            </span>
                            <div className="flex-1 min-w-0">
                                <h4 className="font-semibold text-slate-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors line-clamp-2 mb-2">
                                    {post.title}
                                </h4>
                                <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400">
                                    <span className="flex items-center gap-1">
                                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        {formatReadTime(post.readTimeMinutes)}
                                    </span>
                                    <span>•</span>
                                    <span className="flex items-center gap-1">
                                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                        </svg>
                                        {formatViews(post.views)}
                                    </span>
                                </div>
                            </div>
                        </div>
                        {index < trendingPosts.length - 1 && (
                            <div className="mt-4 border-b border-slate-200 dark:border-slate-700" />
                        )}
                    </Link>
                ))}
            </div>
        </div>
    );
};
