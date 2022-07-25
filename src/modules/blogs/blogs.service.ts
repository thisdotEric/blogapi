import { Service } from 'typedi';

@Service()
export class BlogService {
  async getAllBlogs() {
    console.log('From service');

    return 100;
  }
}
