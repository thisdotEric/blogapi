import {
  Body,
  Get,
  HttpError,
  JsonController,
  OnUndefined,
  Post,
} from 'routing-controllers';
import { Service } from 'typedi';
import { BlogService } from './blogs.service';

@JsonController('blogs')
@Service()
export class BlogsController {
  constructor(private readonly blogService: BlogService) {}

  @Get('/')
  async getAllBlogs() {
    try {
      const s = await this.blogService.getAllBlogs();
      return [s];
    } catch (error) {
      return new HttpError(400, 'Error');
    }
  }

  @Post('/')
  @OnUndefined(201)
  async createBlog(@Body() body: any) {
    console.log(body);
  }
}
