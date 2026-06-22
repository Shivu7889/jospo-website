import mongoose, { Schema, Document } from "mongoose";

export interface IFaqDoc extends Document {
  question: string;
  answer: string;
  isActive: boolean;
  sortOrder: number;
  createdAt: Date;
  updatedAt: Date;
}

const FaqSchema = new Schema<IFaqDoc>(
  {
    question: { type: String, required: true, trim: true },
    answer: { type: String, required: true, trim: true },
    isActive: { type: Boolean, default: true },
    sortOrder: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.models.Faq || mongoose.model<IFaqDoc>("Faq", FaqSchema);
