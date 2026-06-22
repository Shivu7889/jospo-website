import mongoose, { Schema, Document } from "mongoose";

export interface ITestimonialDoc extends Document {
  name: string;
  location: string;
  role: string;
  rating: number;
  text: string;
  product?: string;
  isActive: boolean;
  sortOrder: number;
  createdAt: Date;
  updatedAt: Date;
}

const TestimonialSchema = new Schema<ITestimonialDoc>(
  {
    name: { type: String, required: true, trim: true },
    location: { type: String, required: true, trim: true },
    role: { type: String, required: true, trim: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    text: { type: String, required: true, trim: true },
    product: { type: String, default: "", trim: true },
    isActive: { type: Boolean, default: true },
    sortOrder: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.models.Testimonial || mongoose.model<ITestimonialDoc>("Testimonial", TestimonialSchema);
