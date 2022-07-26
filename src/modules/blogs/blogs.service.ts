import { Service } from 'typedi';
import { BlogsRepository } from './blogs.repository';
import { IBlog } from './blogs.model';

@Service()
export class BlogService {
  constructor(private readonly blogRepo: BlogsRepository) {}

  async createNewBlog(newBlog: IBlog) {
    return this.blogRepo.create(newBlog);
  }

  async getSingleBlog(id: string) {
    return this.blogRepo.get(id);
  }

  async getAllBlogs(): Promise<IBlog[]> {
    return this.blogRepo.getAll();
  }

  async deleteBlog(id: string) {
    return this.blogRepo.delete(id);
  }

  async updateBlog(id: string, updateBlog: IBlog) {
    return this.blogRepo.update(id, updateBlog);
  }
}
