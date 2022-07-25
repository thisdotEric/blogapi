import { Service } from 'typedi';
import { BlogsRepository } from './blogs.repository';
import { IBlog } from './blogs.types';

@Service()
export class BlogService {
  constructor(private readonly blogRepo: BlogsRepository) {}

  async createNewBlog(newBlog: IBlog) {
    return await this.blogRepo.addNewBlog(newBlog);
  }

  async getAllBlogs() {
    return await this.blogRepo.getAllBlogs();
  }
}
