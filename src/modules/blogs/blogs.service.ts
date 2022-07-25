import { Service } from 'typedi';
import { BlogsRepository } from './blogs.repository';
import { IBlog } from './blogs.model';

@Service()
export class BlogService {
  constructor(private readonly blogRepo: BlogsRepository) {}

  async createNewBlog(newBlog: IBlog) {
    return this.blogRepo.addNewBlog(newBlog);
  }

  async getSingleBlog(id: string) {
    return this.blogRepo.getSingleBlog(id);
  }

  async getAllBlogs(): Promise<IBlog[]> {
    return this.blogRepo.getAllBlogs();
  }

  async deleteBlog(id: string) {
    return this.blogRepo.deleteBlog(id);
  }

  async updateBlog(id: string, updateBlog: IBlog) {
    return this.blogRepo.updateBlog(id, updateBlog);
  }
}
