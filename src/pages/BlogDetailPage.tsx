import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getPostBySlug, getAllPosts } from '../data/blog';
import { BlogMarkdown } from '../components/blog/BlogMarkdown';
import { BlogMeta } from '../components/blog/BlogMeta';
import { RelatedPosts } from '../components/blog/RelatedPosts';
import { ReadingProgressBar } from '../components/blog/ReadingProgressBar';

export const BlogDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? getPostBySlug(slug) : undefined;
  const allPosts = getAllPosts();

  if (!post) {
    return (
      <div className="min-h-screen bg-white dark:bg-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">📄</div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
            Bài viết không tồn tại
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mb-8">
            Bài viết bạn đang tìm kiếm không tồn tại hoặc đã bị xóa.
          </p>
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold px-6 py-3 rounded-lg hover:shadow-xl transition-all"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Quay lại Blog
          </Link>
        </div>
      </div>
    );
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

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900">
      {/* Reading Progress Bar */}
      <ReadingProgressBar />

      {/* Breadcrumb */}
      <div className="bg-slate-50 dark:bg-slate-800 py-4 border-b border-slate-200 dark:border-slate-700">
        <div className="container mx-auto px-4">
          <nav className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
            <Link to="/" className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">
              Trang chủ
            </Link>
            <span>/</span>
            <Link to="/blog" className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">
              Blog
            </Link>
            <span>/</span>
            <span className="text-slate-900 dark:text-white font-medium line-clamp-1">
              {post.title}
            </span>
          </nav>
        </div>
      </div>

      <article className="container mx-auto px-4 py-12 max-w-4xl">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          {/* Category */}
          <div className="mb-4">
            <span className={`inline-block text-white text-sm font-semibold px-4 py-2 rounded-full ${getCategoryColor(post.category)}`}>
              {post.category}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6">
            {post.title}
          </h1>

          {/* Meta */}
          <BlogMeta post={post} />

          {/* Tags */}
          {post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-6">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-sm bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 px-3 py-1.5 rounded-full"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </motion.header>

        {/* Cover Image */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-12"
        >
          <img
            src={post.coverImage}
            alt={post.title}
            className="w-full h-auto rounded-2xl shadow-2xl"
          />
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-12"
        >
          <BlogMarkdown content={post.contentMd} />
        </motion.div>

        {/* End CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gradient-to-br from-cyan-50 to-blue-50 dark:from-slate-800 dark:to-slate-900 rounded-2xl p-8 md:p-12 text-center mb-16"
        >
          <h3 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-4">
            Bạn muốn triển khai nhanh?
          </h3>
          <p className="text-slate-600 dark:text-slate-300 mb-8 max-w-2xl mx-auto">
            K-WingX có sẵn hơn 50+ template chuyên nghiệp cho MMO, automation và e-commerce.
            Hỗ trợ tùy chỉnh theo yêu cầu của bạn.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/templates"
              className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold px-8 py-4 rounded-lg hover:shadow-xl hover:scale-105 transition-all"
            >
              Xem Templates
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-2 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-semibold px-8 py-4 rounded-lg border-2 border-slate-300 dark:border-slate-600 hover:border-cyan-500 dark:hover:border-cyan-500 hover:shadow-lg transition-all"
            >
              Liên hệ tư vấn
            </Link>
          </div>
        </motion.div>

        {/* Related Posts */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <RelatedPosts currentPost={post} allPosts={allPosts} />
        </motion.div>

        {/* Back to Blog */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-16 text-center"
        >
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-cyan-600 dark:text-cyan-400 font-semibold hover:underline"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Quay lại tất cả bài viết
          </Link>
        </motion.div>
      </article>
    </div>
  );
};
