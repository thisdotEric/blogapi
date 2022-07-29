import { Schema, model } from 'mongoose';

export interface Image {
  id?: string;
  name: string;
  path: string;
}

export interface IBlog {
  user_id: string;
  name: string;
  date: Date;
  content: string;
  images?: Image[];
  tags?: string[];
}

const blogSchema = new Schema({
  user_id: { type: String, required: true },
  name: { type: String, required: true },
  content: { type: String, required: true },
  date: { type: Date, default: Date.now },
  images: [
    {
      name: String,
      path: String,
    },
  ],
  tags: [{ type: String }],
});

export default model<IBlog>('Blogs', blogSchema);
