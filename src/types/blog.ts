export interface IBlog {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  author: string;
  category?: string;
  tags?: string[];
  isPublished: boolean;
  publishedAt?: Date;
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    ogImage?: string;
    canonicalUrl?: string;
    keywords?: string[];
  };
  createdAt: Date;
  updatedAt: Date;
}
