import mongoose, { Schema, Document } from "mongoose";

export interface IBlogDoc extends Document {
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

const BlogSchema = new Schema<IBlogDoc>(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, trim: true, lowercase: true },
    excerpt: { type: String, required: true, trim: true },
    content: { type: String, required: true },
    coverImage: { type: String, required: true },
    author: { type: String, required: true, trim: true },
    category: { type: String, default: "", trim: true },
    tags: { type: [String], default: [] },
    isPublished: { type: Boolean, default: false },
    publishedAt: { type: Date, default: null },
    seo: {
      metaTitle: { type: String, default: "" },
      metaDescription: { type: String, default: "" },
      ogImage: { type: String, default: "" },
      canonicalUrl: { type: String, default: "" },
      keywords: { type: [String], default: [] },
    },
  },
  { timestamps: true }
);

BlogSchema.index({ isPublished: 1, publishedAt: -1 });
BlogSchema.index({ slug: 1 });
BlogSchema.index({ category: 1 });

export default mongoose.models.Blog || mongoose.model<IBlogDoc>("Blog", BlogSchema);
