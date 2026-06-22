export type ProductCategory = "personal" | "medium" | "large" | "industrial";

export interface IProduct {
  _id: string;
  name: string;
  slug: string;
  category: ProductCategory;
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

export const categoryLabels: Record<ProductCategory, string> = {
  personal: "Personal",
  medium: "Medium",
  large: "Large",
  industrial: "Industrial",
};
