import React from 'react';
import { BlogPost } from '../../data/blog';
import { BlogCard } from './BlogCard';

interface RelatedPostsProps {
    currentPost: BlogPost;
    allPosts: BlogPost[];
}

export const RelatedPosts: React.FC<RelatedPostsProps> = ({ currentPost, allPosts }) => {
    // Find related posts by category or tags
    const relatedPosts = allPosts
        .filter((post) => post.id !== currentPost.id)
        .filter((post) =>
            post.category === currentPost.category ||
            post.tags.some((tag) => currentPost.tags.includes(tag))
        )
        .slice(0, 3);

    if (relatedPosts.length === 0) return null;

    return (
        <section className="mt-16 pt-16 border-t border-slate-200 dark:border-slate-700">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-8">
                Bài viết liên quan
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedPosts.map((post) => (
                    <BlogCard key={post.id} post={post} />
                ))}
            </div>
        </section>
    );
};
