import mongoose, { Schema, Document } from "mongoose";

export interface IPageSeoDoc extends Document {
  pageSlug: string;
  metaTitle: string;
  metaDescription: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  canonicalUrl?: string;
  keywords?: string[];
  structuredData?: string;
  updatedAt: Date;
}

const PageSeoSchema = new Schema<IPageSeoDoc>(
  {
    pageSlug: { type: String, required: true, unique: true, trim: true, lowercase: true },
    metaTitle: { type: String, required: true, trim: true },
    metaDescription: { type: String, required: true, trim: true },
    ogTitle: { type: String, default: "", trim: true },
    ogDescription: { type: String, default: "", trim: true },
    ogImage: { type: String, default: "" },
    canonicalUrl: { type: String, default: "", trim: true },
    keywords: { type: [String], default: [] },
    structuredData: { type: String, default: "" },
  },
  { timestamps: true }
);

export default mongoose.models.PageSeo || mongoose.model<IPageSeoDoc>("PageSeo", PageSeoSchema);
