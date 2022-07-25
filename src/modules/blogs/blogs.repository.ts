import { Service } from 'typedi';
import Blog from './blogs.model';
import { IBlog } from './blogs.model';

@Service()
export class BlogsRepository {
  async addNewBlog(newBlogDetails: IBlog) {
    const newBlog = await Blog.create(newBlogDetails);
    return newBlog;
  }

  async getSingleBlog(id: string) {
    const blog = await Blog.findOne({ _id: id });

    return blog;
  }

  async getAllBlogs() {
    try {
      const a = await Blog.find({}).exec();
      return a;
    } catch (error) {
      throw new Error(error);
    }
  }

  async deleteBlog(id: string) {
    await Blog.findOneAndRemove({ _id: id });
  }

  async updateBlog(id: string, updatedBlog: IBlog) {
    await Blog.updateOne({ _id: id, ...updatedBlog });
  }
}
