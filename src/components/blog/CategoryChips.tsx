import React from 'react';

interface CategoryChipsProps {
    categories: string[];
    selectedCategory: string | null;
    onSelectCategory: (category: string | null) => void;
}

export const CategoryChips: React.FC<CategoryChipsProps> = ({
    categories,
    selectedCategory,
    onSelectCategory,
}) => {
    return (
        <div className="flex flex-wrap gap-2">
            <button
                onClick={() => onSelectCategory(null)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${selectedCategory === null
                        ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg'
                        : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600'
                    }`}
            >
                Tất cả
            </button>
            {categories.map((category) => (
                <button
                    key={category}
                    onClick={() => onSelectCategory(category)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${selectedCategory === category
                            ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg'
                            : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600'
                        }`}
                >
                    {category}
                </button>
            ))}
        </div>
    );
};
