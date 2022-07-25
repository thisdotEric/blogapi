import mongoose, { Document, Schema } from 'mongoose';

export interface BlogModel extends Document {
  name: string;
  date: Date;
  content: string;
}

const bookSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    content: { type: String, required: true },
    date: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<BlogModel>('Blogs', bookSchema);
