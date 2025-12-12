import React from 'react';
import { SortKey } from '../../data/blog';

interface BlogSearchSortBarProps {
    searchQuery: string;
    onSearchChange: (query: string) => void;
    sortKey: SortKey;
    onSortChange: (key: SortKey) => void;
}

export const BlogSearchSortBar: React.FC<BlogSearchSortBarProps> = ({
    searchQuery,
    onSearchChange,
    sortKey,
    onSortChange,
}) => {
    return (
        <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center">
            {/* Search */}
            <div className="flex-1 relative">
                <input
                    type="text"
                    placeholder="Tìm kiếm bài viết..."
                    value={searchQuery}
                    onChange={(e) => onSearchChange(e.target.value)}
                    className="w-full px-4 py-3 pl-11 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none transition-all"
                />
                <svg
                    className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
            </div>

            {/* Sort */}
            <div className="flex items-center gap-2">
                <span className="text-sm text-slate-600 dark:text-slate-400 whitespace-nowrap">Sắp xếp:</span>
                <select
                    value={sortKey}
                    onChange={(e) => onSortChange(e.target.value as SortKey)}
                    className="px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none transition-all cursor-pointer"
                >
                    <option value="newest">Mới nhất</option>
                    <option value="views">Xem nhiều nhất</option>
                    <option value="trending">Trending</option>
                </select>
            </div>
        </div>
    );
};
