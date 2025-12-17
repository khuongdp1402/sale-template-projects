import React from 'react';
import ReactMarkdown from 'react-markdown';
import { MidArticleCTA } from './MidArticleCTA';

interface BlogMarkdownProps {
    content: string;
}

export const BlogMarkdown: React.FC<BlogMarkdownProps> = ({ content }) => {
    // Split content to inject CTA after ~2 sections (after 2nd ## heading)
    const injectCTA = (markdownContent: string): React.ReactNode[] => {
        const sections = markdownContent.split(/(?=^## )/m);
        const elements: React.ReactNode[] = [];

        sections.forEach((section, index) => {
            if (section.trim()) {
                elements.push(
                    <ReactMarkdown key={`section-${index}`}>{section}</ReactMarkdown>
                );

                // Inject CTA after 2nd section (index 1, since we start at 0)
                if (index === 1 && sections.length > 2) {
                    elements.push(<MidArticleCTA key="mid-cta" />);
                }
            }
        });

        return elements;
    };

    return (
        <div className="prose prose-slate dark:prose-invert max-w-none
      prose-headings:font-bold prose-headings:text-slate-900 dark:prose-headings:text-white
      prose-h1:text-4xl prose-h1:mb-6
      prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-4 prose-h2:pb-3 prose-h2:border-b prose-h2:border-slate-200 dark:prose-h2:border-slate-700
      prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-3
      prose-p:text-slate-700 dark:prose-p:text-slate-300 prose-p:leading-relaxed prose-p:mb-4 prose-p:text-lg
      prose-a:text-cyan-600 dark:prose-a:text-cyan-400 prose-a:no-underline hover:prose-a:underline prose-a:font-medium
      prose-strong:text-slate-900 dark:prose-strong:text-white prose-strong:font-bold
      prose-ul:my-6 prose-ol:my-6
      prose-li:text-slate-700 dark:prose-li:text-slate-300 prose-li:my-2 prose-li:text-lg
      prose-blockquote:border-l-4 prose-blockquote:border-cyan-500 prose-blockquote:bg-cyan-50 dark:prose-blockquote:bg-slate-800 prose-blockquote:py-4 prose-blockquote:px-6 prose-blockquote:rounded-r-lg prose-blockquote:not-italic prose-blockquote:my-6
      prose-code:text-pink-600 dark:prose-code:text-pink-400 prose-code:bg-slate-100 dark:prose-code:bg-slate-800 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-code:before:content-none prose-code:after:content-none
      prose-pre:bg-slate-900 prose-pre:text-slate-100 prose-pre:rounded-lg prose-pre:p-4 prose-pre:my-6
      prose-hr:border-slate-300 dark:prose-hr:border-slate-700 prose-hr:my-12
      prose-img:rounded-xl prose-img:shadow-lg
    ">
            {injectCTA(content)}
        </div>
    );
};
