import mongoose, { Schema, Document } from "mongoose";

export interface IProductDoc extends Document {
  name: string;
  slug: string;
  category: "personal" | "medium" | "large" | "industrial";
  image: string;
  fanSize: string;
  airFlow: string;
  tankCapacity: string;
  powerConsumption: string;
  coolingArea: string;
  coolingAreaSqM: number;
  dimensions: string;
  badge?: string;
  description?: string;
  features?: string[];
  isActive: boolean;
  sortOrder: number;
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

const ProductSchema = new Schema<IProductDoc>(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, trim: true, lowercase: true },
    category: {
      type: String,
      required: true,
      enum: ["personal", "medium", "large", "industrial"],
    },
    image: { type: String, required: true },
    fanSize: { type: String, required: true },
    airFlow: { type: String, required: true },
    tankCapacity: { type: String, required: true },
    powerConsumption: { type: String, required: true },
    coolingArea: { type: String, required: true },
    coolingAreaSqM: { type: Number, required: true },
    dimensions: { type: String, required: true },
    badge: { type: String, default: "" },
    description: { type: String, default: "" },
    features: { type: [String], default: [] },
    isActive: { type: Boolean, default: true },
    sortOrder: { type: Number, default: 0 },
    seo: {
      metaTitle: { type: String, default: "" },
      metaDescription: { type: String, default: "" },
    },
  },
  { timestamps: true }
);

ProductSchema.index({ category: 1, isActive: 1 });
ProductSchema.index({ sortOrder: 1 });

export default mongoose.models.Product || mongoose.model<IProductDoc>("Product", ProductSchema);
