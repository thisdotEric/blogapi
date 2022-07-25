import { Schema, model } from 'mongoose';

export interface IBlog {
  name: string;
  date: Date;
  content: string;
}

const blogSchema = new Schema<IBlog>(
  {
    name: { type: String, required: true },
    content: { type: String, required: true },
    date: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
  }
);

export default model<IBlog>('Blogs', blogSchema);
