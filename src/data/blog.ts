import blogPostsData from './blogPosts.json';

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  tags: string[];
  coverImage: string;
  publishedAt: string;
  readTimeMinutes: number;
  isFeatured: boolean;
  isTrending: boolean;
  views: number;
  contentMd: string;
}

export const BLOG_CATEGORIES = [
  'Hướng dẫn hệ sinh thái K-WingX',
  'MMO & Kiếm tiền online',
  'Automation & Workflow',
  'Marketing & Growth',
  'Website & Templates',
  'E-commerce',
];

export const getAllPosts = (): BlogPost[] => {
  return blogPostsData as BlogPost[];
};

export const getPostBySlug = (slug: string): BlogPost | undefined => {
  return blogPostsData.find((post) => post.slug === slug) as BlogPost | undefined;
};

export const getFeaturedPost = (): BlogPost | undefined => {
  return blogPostsData.find((post) => post.isFeatured) as BlogPost | undefined;
};

export const getTrendingPosts = (limit: number = 3): BlogPost[] => {
  return blogPostsData
    .filter((post) => post.isTrending)
    .slice(0, limit) as BlogPost[];
};

export const getPostsByCategory = (category: string): BlogPost[] => {
  return blogPostsData.filter((post) => post.category === category) as BlogPost[];
};

export const searchPosts = (query: string): BlogPost[] => {
  const lowerQuery = query.toLowerCase();
  return blogPostsData.filter(
    (post) =>
      post.title.toLowerCase().includes(lowerQuery) ||
      post.excerpt.toLowerCase().includes(lowerQuery) ||
      post.tags.some((tag) => tag.toLowerCase().includes(lowerQuery))
  ) as BlogPost[];
};

export type SortKey = 'newest' | 'views' | 'trending';

export const sortPosts = (posts: BlogPost[], sortKey: SortKey): BlogPost[] => {
  const sorted = [...posts];
  
  switch (sortKey) {
    case 'newest':
      return sorted.sort((a, b) => 
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
      );
    case 'views':
      return sorted.sort((a, b) => b.views - a.views);
    case 'trending':
      return sorted.sort((a, b) => {
        if (a.isTrending && !b.isTrending) return -1;
        if (!a.isTrending && b.isTrending) return 1;
        return b.views - a.views;
      });
    default:
      return sorted;
  }
};
