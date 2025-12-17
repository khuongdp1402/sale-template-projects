import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  getAllPosts,
  getFeaturedPost,
  BLOG_CATEGORIES,
  searchPosts,
  sortPosts,
  SortKey,
} from '../data/blog';
import { BlogCard } from '../components/blog/BlogCard';
import { FeaturedPostCard } from '../components/blog/FeaturedPostCard';
import { CategoryChips } from '../components/blog/CategoryChips';
import { BlogSearchSortBar } from '../components/blog/BlogSearchSortBar';
import { GuidesHighlightSection } from '../components/blog/GuidesHighlightSection';
import { TrendingList } from '../components/blog/TrendingList';

const POSTS_PER_PAGE = 9;

export const BlogPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortKey, setSortKey] = useState<SortKey>('newest');
  const [visibleCount, setVisibleCount] = useState(POSTS_PER_PAGE);

  const featuredPost = getFeaturedPost();
  const allPosts = getAllPosts();

  // Filter and sort posts
  const filteredPosts = useMemo(() => {
    let posts = searchQuery ? searchPosts(searchQuery) : allPosts;

    if (selectedCategory) {
      posts = posts.filter((post) => post.category === selectedCategory);
    }

    // Exclude featured post from main list
    posts = posts.filter((post) => !post.isFeatured);

    return sortPosts(posts, sortKey);
  }, [allPosts, selectedCategory, searchQuery, sortKey]);

  const visiblePosts = filteredPosts.slice(0, visibleCount);
  const hasMore = visibleCount < filteredPosts.length;

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + POSTS_PER_PAGE);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900">
      {/* Hero */}
      <section className="bg-gradient-to-br from-slate-50 to-cyan-50 dark:from-slate-900 dark:to-slate-800 py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <div className="inline-block bg-gradient-to-r from-cyan-500 to-blue-500 text-white text-sm font-bold px-4 py-2 rounded-full mb-6">
              📚 K-WingX Blog
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6">
              Kiến thức MMO, Automation & Marketing
            </h1>
            <p className="text-lg text-slate-600 dark:text-slate-300">
              Chia sẻ kinh nghiệm, hướng dẫn chi tiết và xu hướng mới nhất về MMO, kiếm tiền online,
              automation và phát triển website
            </p>
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        {/* Featured Post + Trending */}
        {featuredPost && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-16"
          >
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Featured Post - 2/3 width */}
              <div className="lg:col-span-2">
                <FeaturedPostCard post={featuredPost} />
              </div>

              {/* Trending Sidebar - 1/3 width */}
              <div className="lg:col-span-1">
                <TrendingList />
              </div>
            </div>
          </motion.div>
        )}

        {/* Guides Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-16"
        >
          <GuidesHighlightSection />
        </motion.div>

        {/* Search & Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-8 space-y-6"
        >
          <BlogSearchSortBar
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            sortKey={sortKey}
            onSortChange={setSortKey}
          />

          <CategoryChips
            categories={BLOG_CATEGORIES}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />
        </motion.div>

        {/* Results count */}
        <div className="mb-6">
          <p className="text-slate-600 dark:text-slate-400">
            Tìm thấy <span className="font-semibold text-slate-900 dark:text-white">{filteredPosts.length}</span> bài viết
          </p>
        </div>

        {/* Posts Grid */}
        {filteredPosts.length > 0 ? (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
            >
              {visiblePosts.map((post, index) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * (index % 6) }}
                >
                  <BlogCard post={post} />
                </motion.div>
              ))}
            </motion.div>

            {/* Load More */}
            {hasMore && (
              <div className="text-center">
                <button
                  onClick={handleLoadMore}
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold px-8 py-4 rounded-lg hover:shadow-xl hover:scale-105 transition-all"
                >
                  Xem thêm bài viết
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
              Không tìm thấy bài viết
            </h3>
            <p className="text-slate-600 dark:text-slate-400 mb-6">
              Thử thay đổi từ khóa tìm kiếm hoặc bộ lọc
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory(null);
              }}
              className="text-cyan-600 dark:text-cyan-400 font-semibold hover:underline"
            >
              Xóa bộ lọc
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
