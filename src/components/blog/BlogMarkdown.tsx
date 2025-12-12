import React from 'react';
import ReactMarkdown from 'react-markdown';

interface BlogMarkdownProps {
    content: string;
}

export const BlogMarkdown: React.FC<BlogMarkdownProps> = ({ content }) => {
    return (
        <div className="prose prose-slate dark:prose-invert max-w-none
      prose-headings:font-bold prose-headings:text-slate-900 dark:prose-headings:text-white
      prose-h1:text-4xl prose-h1:mb-6
      prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-4
      prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-3
      prose-p:text-slate-700 dark:prose-p:text-slate-300 prose-p:leading-relaxed prose-p:mb-4
      prose-a:text-cyan-600 dark:prose-a:text-cyan-400 prose-a:no-underline hover:prose-a:underline
      prose-strong:text-slate-900 dark:prose-strong:text-white prose-strong:font-bold
      prose-ul:my-6 prose-ol:my-6
      prose-li:text-slate-700 dark:prose-li:text-slate-300 prose-li:my-2
      prose-blockquote:border-l-4 prose-blockquote:border-cyan-500 prose-blockquote:bg-cyan-50 dark:prose-blockquote:bg-slate-800 prose-blockquote:py-2 prose-blockquote:px-6 prose-blockquote:rounded-r-lg prose-blockquote:not-italic
      prose-code:text-pink-600 dark:prose-code:text-pink-400 prose-code:bg-slate-100 dark:prose-code:bg-slate-800 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:before:content-none prose-code:after:content-none
      prose-pre:bg-slate-900 prose-pre:text-slate-100 prose-pre:rounded-lg prose-pre:p-4
      prose-hr:border-slate-300 dark:prose-hr:border-slate-700 prose-hr:my-12
    ">
            <ReactMarkdown>{content}</ReactMarkdown>
        </div>
    );
};
