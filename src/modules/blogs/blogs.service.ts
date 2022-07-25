import { Service } from 'typedi';
import { BlogsRepository } from './blogs.repository';

@Service()
export class BlogService {
  constructor(private readonly blogRepo: BlogsRepository) {}

  async getAllBlogs() {
    return await this.blogRepo.getAllBlogs();
  }
}
