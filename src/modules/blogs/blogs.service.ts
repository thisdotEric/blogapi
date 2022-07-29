import { Service } from 'typedi';
import { BlogsRepository } from './blogs.repository';
import { IBlog, Image } from './blogs.model';

@Service()
export class BlogService {
  constructor(private readonly blogRepo: BlogsRepository) {}

  async createNewBlog(newBlog: IBlog) {
    return this.blogRepo.create(newBlog);
  }

  async getSingleBlog(id: string) {
    return this.blogRepo.get(id);
  }

  async getAllBlogs(user_id: string): Promise<IBlog[]> {
    return this.blogRepo.getAll(user_id);
  }

  async deleteBlog(id: string) {
    return this.blogRepo.delete(id);
  }

  async updateBlog(id: string, updateBlog: IBlog) {
    return this.blogRepo.update(id, updateBlog);
  }

  async addBlogImage(id: string, imageDetails: Image) {
    return this.blogRepo.addBlogImage(id, imageDetails);
  }

  async updateBlogImage(image_id: string, imageDetails: Image) {
    /**
     * TODO: Delete the old image
     */

    // Delete the image to be updated
    // const filePath = await this.blogRepo.getPastImageFilePath(image_id);
    // console.log(filePath);

    // unlink(join(__dirname, '../../..', filePath), () => {});

    // Update to new image
    return this.blogRepo.updateBlogImage(image_id, imageDetails);
  }

  async getBlogByName(name: string) {
    return this.blogRepo.getBlogByName(name);
  }
}
