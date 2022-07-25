import { Get, JsonController } from 'routing-controllers';
import { Service } from 'typedi';
import { BlogService } from './blogs.service';

@JsonController('blogs')
@Service()
export class BlogsController {
  constructor(private readonly blogService: BlogService) {}

  @Get('/')
  async getAllBlogs() {
    const res = await this.blogService.getAllBlogs();

    return { res };
  }
}
