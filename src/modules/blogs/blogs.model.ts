import { Schema, model } from 'mongoose';

export interface IBlog {
  name: string;
  date: Date;
  content: string;
  images?: string[];
  tags?: string[];
}

const blogSchema = new Schema({
  name: { type: String, required: true },
  content: { type: String, required: true },
  date: { type: Date, default: Date.now },
  images: [{ type: String }],
  tags: [{ type: String }],
});

export default model<IBlog>('Blogs', blogSchema);
