import { Service } from 'typedi';
import Blog from './blogs.model';

@Service()
export class BlogsRepository {
  async getAllBlogs() {
    const newBlog = new Blog({
      name: 'Nodejs online',
      content: 'fksdbf',
    });

    await newBlog.save();

    try {
      const a = await Blog.find({}).exec();
      return a;
    } catch (error) {
      throw new Error(error);
    }
  }
}
