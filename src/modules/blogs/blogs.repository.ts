import { Service } from 'typedi';
import Blog from './blogs.model';
import { IBlog } from './blogs.types';

@Service()
export class BlogsRepository {
  async addNewBlog(newBlogDetails: IBlog) {
    const newBlog = new Blog(newBlogDetails);
    await newBlog.save();
  }

  async getAllBlogs() {
    try {
      const a = await Blog.find({}).exec();
      return a;
    } catch (error) {
      throw new Error(error);
    }
  }
}
